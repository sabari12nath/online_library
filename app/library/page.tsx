'use client';

import { useEffect, useState } from 'react';
import SearchFilters from '@/components/search-filters';
import MaterialCard from '@/components/material-card';
import { BookOpen, ArrowLeft, Shield, Sparkles, Filter, X, Search, FileText, FileQuestion, Video } from 'lucide-react';
import Link from 'next/link';

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
    const [activeFilters, setActiveFilters] = useState({
        department: '',
        semester: '',
        scheme: '',
        subject: ''
    });

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
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Gradient Background Effect */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            </div>

            {/* Navigation */}
            <nav className="border-b border-white/10 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-105">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </button>
                            </Link>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold">Student Library</h1>
                                    <p className="text-xs text-slate-400">Browse academic materials</p>
                                </div>
                            </div>
                        </div>
                        <Link href="/admin">
                            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/30">
                                <Shield className="w-4 h-4 inline mr-2" />
                                Admin Portal
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-12 relative z-10">
                {/* Enhanced Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-400">Discover Knowledge</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                            Explore Our Library
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Search through thousands of academic materials with smart filters
                    </p>
                </div>

                {/* Search Filters Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
                            <Filter className="w-5 h-5 text-cyan-400" />
                            Filter Materials
                        </h2>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                            >
                                <X className="w-4 h-4" />
                                Clear All
                            </button>
                        )}
                    </div>
                    <SearchFilters onFilterChange={handleFilterChange} />
                </div>

                {/* Results Section */}
                {loading ? (
                    <div className="text-center py-32">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500 mb-4"></div>
                        <p className="text-slate-400 text-lg">Searching materials...</p>
                        <p className="text-slate-500 text-sm mt-2">Please wait while we find the best resources for you</p>
                    </div>
                ) : materials.length > 0 ? (
                    <div className="space-y-6">
                        {/* Results Header */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/20 rounded-lg">
                                    <BookOpen className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Search Results</p>
                                    <p className="text-lg font-semibold">
                                        Found <span className="text-cyan-400">{materials.length}</span> {materials.length === 1 ? 'material' : 'materials'}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right text-sm text-slate-400">
                                {hasActiveFilters && (
                                    <div className="flex flex-wrap gap-2 justify-end">
                                        {activeFilters.department && (
                                            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                                                {activeFilters.department}
                                            </span>
                                        )}
                                        {activeFilters.semester && (
                                            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                                {activeFilters.semester}
                                            </span>
                                        )}
                                        {activeFilters.scheme && (
                                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                                Scheme {activeFilters.scheme}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Materials Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto">
                            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center backdrop-blur-xl border border-white/10">
                                <Search className="w-16 h-16 text-cyan-400" />
                            </div>
                            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                {hasActiveFilters ? 'No materials found' : 'Start Your Search'}
                            </h3>
                            <p className="text-slate-400 text-lg mb-8">
                                {hasActiveFilters
                                    ? 'Try adjusting your filters to find more materials'
                                    : 'Select filters above to discover academic materials'
                                }
                            </p>
                            <div className="flex gap-3 justify-center flex-wrap">
                                <div className="group px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                                    <FileText className="w-5 h-5 text-cyan-400 inline mr-2" />
                                    <span className="text-cyan-400 font-medium">Notes</span>
                                </div>
                                <div className="group px-6 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                                    <FileQuestion className="w-5 h-5 text-blue-400 inline mr-2" />
                                    <span className="text-blue-400 font-medium">Question Papers</span>
                                </div>
                                <div className="group px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                                    <Video className="w-5 h-5 text-emerald-400 inline mr-2" />
                                    <span className="text-emerald-400 font-medium">Video Lectures</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
