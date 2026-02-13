'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StatsDisplay from '@/components/stats-display';
import UploadForm from '@/components/upload-form';
import { Button } from '@/components/ui/button';
import { LogOut, Shield } from 'lucide-react';

export default function AdminDashboard() {
    const router = useRouter();
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

    const handleLogout = () => {
        router.push('/admin');
    };

    const handleUploadSuccess = () => {
        fetchStats(); // Refresh stats after successful upload
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-white/70">Manage materials and view analytics</p>
                        </div>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                        <p className="text-white mt-4 text-lg">Loading dashboard...</p>
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
