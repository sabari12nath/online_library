import { NextRequest, NextResponse } from 'next/server';
import { createMaterial } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const department = formData.get('department') as string;
        const semester = formData.get('semester') as string;
        const scheme = formData.get('scheme') as string;
        const subject = formData.get('subject') as string;
        const materialType = formData.get('material_type') as string;
        const contributorName = formData.get('contributor_name') as string;
        const contributorBatch = formData.get('contributor_batch') as string;
        const contributorYear = formData.get('contributor_year') as string;
        const videoLink = formData.get('video_link') as string;
        const file = formData.get('file') as File | null;

        // Validate required fields
        if (!title || !department || !semester || !scheme || !subject || !materialType || !contributorName || !contributorBatch || !contributorYear) {
            return NextResponse.json(
                { error: 'All required fields must be filled' },
                { status: 400 }
            );
        }

        let fileLink = '';

        // Handle file upload or video link
        if (materialType === 'Video') {
            if (!videoLink) {
                return NextResponse.json(
                    { error: 'Video link is required for video materials' },
                    { status: 400 }
                );
            }
            fileLink = videoLink;
        } else {
            if (!file) {
                return NextResponse.json(
                    { error: 'File is required for non-video materials' },
                    { status: 400 }
                );
            }

            // Create uploads directory if it doesn't exist
            const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
            await mkdir(uploadsDir, { recursive: true });

            // Generate unique filename
            const timestamp = Date.now();
            const filename = `${timestamp}-${file.name}`;
            const filepath = path.join(uploadsDir, filename);

            // Save file
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            await writeFile(filepath, buffer);

            fileLink = `/uploads/${filename}`;
        }

        // Create material in database
        const result = createMaterial({
            title,
            description,
            department,
            semester,
            scheme,
            subject,
            material_type: materialType,
            file_link: fileLink,
            contributor_name: contributorName,
            contributor_batch: contributorBatch,
            contributor_year: contributorYear,
        });

        return NextResponse.json({
            success: true,
            message: 'Material uploaded successfully',
            id: result.lastInsertRowid,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload material' },
            { status: 500 }
        );
    }
}
