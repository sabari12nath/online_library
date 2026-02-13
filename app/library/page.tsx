'use client';

import { useEffect, useState } from 'react';
import SearchFilters from '@/components/search-filters';
import MaterialCard from '@/components/material-card';
import { BookOpen, Home, ArrowLeft } from 'lucide-react';
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

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Home
                                </button>
                            </Link>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold">Student Library</span>
                            </div>
                        </div>
                        <Link href="/admin">
                            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
                                Admin Portal
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Explore Our Library
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400">
                        Search and access academic materials with smart filters
                    </p>
                </div>

                {/* Search Filters */}
                <div className="mb-8">
                    <SearchFilters onFilterChange={handleFilterChange} />
                </div>

                {/* Results */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
                        <p className="text-slate-400 mt-4 text-lg">Searching materials...</p>
                    </div>
                ) : materials.length > 0 ? (
                    <>
                        <div className="mb-6 text-slate-400">
                            Found <span className="text-cyan-400 font-semibold">{materials.length}</span> materials
                        </div>
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
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-cyan-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No materials yet</h3>
                        <p className="text-slate-400 text-lg mb-6">
                            Select filters above to search for materials
                        </p>
                        <div className="flex gap-2 justify-center flex-wrap max-w-2xl mx-auto">
                            <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
                                Notes
                            </span>
                            <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
                                Question Papers
                            </span>
                            <span className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                                Video Lectures
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
