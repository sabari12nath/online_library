'use client';

import { useEffect, useState } from 'react';
import StatsDisplay from '@/components/stats-display';
import UploadForm from '@/components/upload-form';
import { Shield, Home, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ total_visits: 0, total_uploads: 0 });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleUploadSuccess = () => {
        fetchStats(); // Refresh stats after successful upload
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                                <p className="text-slate-400 text-sm">Manage materials and view analytics</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/library">
                                <Button
                                    variant="outline"
                                    className="bg-white/5 hover:bg-white/10 text-white border-white/10"
                                >
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Library
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button
                                    variant="outline"
                                    className="bg-white/5 hover:bg-white/10 text-white border-white/10"
                                >
                                    <Home className="w-4 h-4 mr-2" />
                                    Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-12">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
                        <p className="text-slate-400 mt-4 text-lg">Loading dashboard...</p>
                    </div>
                ) : (
                    <>
                        <StatsDisplay stats={stats} />
                        <UploadForm onSuccess={handleUploadSuccess} />
                    </>
                )}
            </div>
        </div>
    );
}
