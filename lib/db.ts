import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'materials.db');
const db = new Database(dbPath);

// Initialize database schema
export function initializeDatabase() {
    // Create materials table
    db.exec(`
    CREATE TABLE IF NOT EXISTS materials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      department TEXT NOT NULL,
      semester TEXT NOT NULL,
      scheme TEXT NOT NULL,
      subject TEXT NOT NULL,
      material_type TEXT NOT NULL,
      file_link TEXT NOT NULL,
      contributor_name TEXT NOT NULL,
      contributor_batch TEXT NOT NULL,
      contributor_year TEXT NOT NULL,
      view_count INTEGER DEFAULT 0,
      download_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Create analytics table
    db.exec(`
    CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total_visits INTEGER DEFAULT 0,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Create admins table
    db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    )
  `);

    // Initialize analytics if not exists
    const analyticsCount = db.prepare('SELECT COUNT(*) as count FROM analytics').get() as { count: number };
    if (analyticsCount.count === 0) {
        db.prepare('INSERT INTO analytics (total_visits) VALUES (0)').run();
    }

    // Create default admin if not exists
    const adminCount = db.prepare('SELECT COUNT(*) as count FROM admins').get() as { count: number };
    if (adminCount.count === 0) {
        const hashedPassword = bcrypt.hashSync('admin123', 10);
        db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run('admin', hashedPassword);
    }
}

// Initialize on import
initializeDatabase();

// Material operations
export interface Material {
    id?: number;
    title: string;
    description?: string;
    department: string;
    semester: string;
    scheme: string;
    subject: string;
    material_type: string;
    file_link: string;
    contributor_name: string;
    contributor_batch: string;
    contributor_year: string;
    view_count?: number;
    download_count?: number;
    created_at?: string;
}

export function createMaterial(material: Material) {
    const stmt = db.prepare(`
    INSERT INTO materials (
      title, description, department, semester, scheme, subject,
      material_type, file_link, contributor_name, contributor_batch, contributor_year
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

    return stmt.run(
        material.title,
        material.description || '',
        material.department,
        material.semester,
        material.scheme,
        material.subject,
        material.material_type,
        material.file_link,
        material.contributor_name,
        material.contributor_batch,
        material.contributor_year
    );
}

export function searchMaterials(filters: {
    department?: string;
    semester?: string;
    scheme?: string;
    subject?: string;
}) {
    let query = 'SELECT * FROM materials WHERE 1=1';
    const params: string[] = [];

    if (filters.department) {
        query += ' AND department = ?';
        params.push(filters.department);
    }
    if (filters.semester) {
        query += ' AND semester = ?';
        params.push(filters.semester);
    }
    if (filters.scheme) {
        query += ' AND scheme = ?';
        params.push(filters.scheme);
    }
    if (filters.subject) {
        query += ' AND subject = ?';
        params.push(filters.subject);
    }

    query += ' ORDER BY created_at DESC';

    return db.prepare(query).all(...params);
}

export function incrementViewCount(id: number) {
    return db.prepare('UPDATE materials SET view_count = view_count + 1 WHERE id = ?').run(id);
}

export function incrementDownloadCount(id: number) {
    return db.prepare('UPDATE materials SET download_count = download_count + 1 WHERE id = ?').run(id);
}

// Analytics operations
export function incrementVisitCount() {
    return db.prepare('UPDATE analytics SET total_visits = total_visits + 1, last_updated = CURRENT_TIMESTAMP WHERE id = 1').run();
}

export function getAnalytics() {
    const analytics = db.prepare('SELECT * FROM analytics WHERE id = 1').get() ?? {};
    const totalMaterials = db.prepare('SELECT COUNT(*) as count FROM materials').get() as { count: number };

    return {
        ...analytics,
        total_uploads: totalMaterials.count
    };
}

// Admin operations
export function verifyAdmin(username: string, password: string) {
    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username) as { password_hash: string } | undefined;

    if (!admin) {
        return false;
    }

    return bcrypt.compareSync(password, admin.password_hash);
}

export default db;
