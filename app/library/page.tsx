'use client';

import { useEffect, useState } from 'react';
import SearchFilters from '@/components/search-filters';
import MaterialCard from '@/components/material-card';
import { BookOpen, Home, ArrowLeft, Shield, Menu, X, Sun, Moon, Sparkles, Filter, Search, FileText, FileQuestion, Video } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/lib/theme-context';

interface Material {
    id: number;
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
    view_count: number;
    download_count: number;
}

export default function LibraryPage() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        department: '',
        semester: '',
        scheme: '',
        subject: ''
    });
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        // Track visit on page load
        fetch('/api/analytics/visit', { method: 'POST' });
    }, []);

    const handleFilterChange = async (filters: {
        department: string;
        semester: string;
        scheme: string;
        subject: string;
    }) => {
        setActiveFilters(filters);

        // Only search if at least one filter is selected
        if (!filters.department && !filters.semester && !filters.scheme && !filters.subject) {
            setMaterials([]);
            return;
        }

        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.department) params.append('department', filters.department);
            if (filters.semester) params.append('semester', filters.semester);
            if (filters.scheme) params.append('scheme', filters.scheme);
            if (filters.subject) params.append('subject', filters.subject);

            const response = await fetch(`/api/materials/search?${params}`);
            const data = await response.json();
            setMaterials(data);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleView = async (id: number) => {
        try {
            await fetch(`/api/materials/${id}/view`, { method: 'POST' });
        } catch (error) {
            console.error('View tracking error:', error);
        }
    };

    const handleDownload = async (id: number, link: string, isVideo: boolean) => {
        try {
            await fetch(`/api/materials/${id}/download`, { method: 'POST' });
            if (!isVideo) {
                const a = document.createElement('a');
                a.href = link;
                a.download = link.split('/').pop() || 'download';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        } catch (error) {
            console.error('Download tracking error:', error);
        }
    };

    const clearFilters = () => {
        setActiveFilters({ department: '', semester: '', scheme: '', subject: '' });
        setMaterials([]);
    };

    const hasActiveFilters = activeFilters.department || activeFilters.semester || activeFilters.scheme || activeFilters.subject;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
            {/* Gradient Background Effect */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10"></div>
                <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10"></div>
            </div>

            {/* Navigation */}
            <nav className="border-b border-slate-300 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <Link href="/" className="hidden sm:block">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all duration-300 hover:scale-105">
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="hidden sm:inline">Back</span>
                                </button>
                            </Link>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg">
                                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-base sm:text-xl font-bold">Student Library</h1>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 hidden sm:block">Browse academic materials</p>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 transition-all duration-300"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
                            </button>
                            <Link href="/admin">
                                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/30 text-white">
                                    <Shield className="w-4 h-4 inline mr-2" />
                                    Admin Portal
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
                                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all text-left text-white">
                                        <Shield className="w-5 h-5" />
                                        <span>Admin Portal</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
                {/* Enhanced Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 sm:mb-4">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                        <span className="text-xs sm:text-sm text-cyan-400">Discover Knowledge</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                            Explore Our Library
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
                        Search through thousands of academic materials with smart filters
                    </p>
                </div>

                {/* Search Filters Section */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h2 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                            <span className="hidden sm:inline">Filter Materials</span>
                            <span className="sm:hidden">Filters</span>
                        </h2>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-xs sm:text-sm text-cyan-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
                            >
                                <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                Clear All
                            </button>
                        )}
                    </div>
                    <SearchFilters onFilterChange={handleFilterChange} />
                </div>

                {/* Results Section */}
                {loading ? (
                    <div className="text-center py-20 sm:py-32">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-cyan-500 mb-4"></div>
                        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">Searching materials...</p>
                        <p className="text-slate-500 dark:text-slate-500 text-xs sm:text-sm mt-2">Please wait while we find the best resources for you</p>
                    </div>
                ) : materials.length > 0 ? (
                    <div className="space-y-4 sm:space-y-6">
                        {/* Results Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 gap-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/20 rounded-lg">
                                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Search Results</p>
                                    <p className="text-base sm:text-lg font-semibold">
                                        Found <span className="text-cyan-500">{materials.length}</span> {materials.length === 1 ? 'material' : 'materials'}
                                    </p>
                                </div>
                            </div>
                            {hasActiveFilters && (
                                <div className="flex flex-wrap gap-2">
                                    {activeFilters.department && (
                                        <span className="px-2 sm:px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm">
                                            {activeFilters.department}
                                        </span>
                                    )}
                                    {activeFilters.semester && (
                                        <span className="px-2 sm:px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm">
                                            {activeFilters.semester}
                                        </span>
                                    )}
                                    {activeFilters.scheme && (
                                        <span className="px-2 sm:px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm">
                                            Scheme {activeFilters.scheme}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Materials Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {materials.map((material) => (
                                <MaterialCard
                                    key={material.id}
                                    material={material}
                                    onView={handleView}
                                    onDownload={handleDownload}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 sm:py-20">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center backdrop-blur-xl border border-slate-300 dark:border-white/10">
                                <Search className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                {hasActiveFilters ? 'No materials found' : 'Start Your Search'}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg mb-6 sm:mb-8 px-4">
                                {hasActiveFilters
                                    ? 'Try adjusting your filters to find more materials'
                                    : 'Select filters above to discover academic materials'
                                }
                            </p>
                            <div className="flex gap-2 sm:gap-3 justify-center flex-wrap px-4">
                                <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 inline mr-2" />
                                    <span className="text-cyan-400 font-medium text-sm sm:text-base">Notes</span>
                                </div>
                                <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                                    <FileQuestion className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 inline mr-2" />
                                    <span className="text-blue-400 font-medium text-sm sm:text-base">Question Papers</span>
                                </div>
                                <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                                    <Video className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 inline mr-2" />
                                    <span className="text-emerald-400 font-medium text-sm sm:text-base">Video Lectures</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
