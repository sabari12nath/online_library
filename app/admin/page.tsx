'use client';

import { useEffect, useState } from 'react';
import StatsDisplay from '@/components/stats-display';
import UploadForm from '@/components/upload-form';
import { Shield, Home, BookOpen, Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/lib/theme-context';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ total_visits: 0, total_uploads: 0 });
    const [loading, setLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

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
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
            {/* Navigation */}
            <nav className="border-b border-slate-300 dark:border-white/10 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg">
                                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-2xl font-bold">Admin Dashboard</h1>
                                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm hidden sm:block">Manage materials and view analytics</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex gap-3">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all duration-300"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
                            </button>
                            <Link href="/library">
                                <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all duration-300">
                                    <BookOpen className="w-4 h-4 inline mr-2" />
                                    Library
                                </button>
                            </Link>
                            <Link href="/">
                                <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all duration-300">
                                    <Home className="w-4 h-4 inline mr-2" />
                                    Home
                                </button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Drawer */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-4 p-4 rounded-2xl bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-slate-300 dark:border-white/10 shadow-2xl">
                            <div className="flex flex-col gap-3">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all text-left">
                                        <Home className="w-5 h-5 text-cyan-500" />
                                        <span>Home</span>
                                    </button>
                                </Link>
                                <Link href="/library" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all text-left">
                                        <BookOpen className="w-5 h-5 text-blue-500" />
                                        <span>Library</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-cyan-500"></div>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">Loading dashboard...</p>
                    </div>
                ) : (
                    <div className="space-y-6 sm:space-y-8">
                        <StatsDisplay stats={stats} />
                        <UploadForm onUploadSuccess={handleUploadSuccess} />
                    </div>
                )}
            </div>
        </div>
    );
}
