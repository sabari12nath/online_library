'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye, User, Calendar, TrendingUp } from 'lucide-react';

interface MaterialCardProps {
    material: {
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
    };
    onView: (id: number) => void;
    onDownload: (id: number, link: string, isVideo: boolean) => void;
}

export default function MaterialCard({ material, onView, onDownload }: MaterialCardProps) {
    const isVideo = material.material_type === 'Video';

    const handleView = () => {
        onView(material.id);
        if (isVideo) {
            window.open(material.file_link, '_blank');
        } else {
            window.open(material.file_link, '_blank');
        }
    };

    const handleDownload = () => {
        onDownload(material.id, material.file_link, isVideo);
    };

    // Determine badge colors based on material type
    const getBadgeStyle = () => {
        switch (material.material_type) {
            case 'Question Paper':
                return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
            case 'Note':
                return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
            case 'Video':
                return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
            default:
                return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
        }
    };

    return (
        <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02] backdrop-blur-xl">
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300 pointer-events-none"></div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white leading-tight flex-1 group-hover:text-cyan-300 transition-colors">
                        {material.title}
                    </h3>
                    <Badge className={`${getBadgeStyle()} border shrink-0`}>
                        {material.material_type}
                    </Badge>
                </div>

                {/* Description */}
                {material.description && (
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {material.description}
                    </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                        {material.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                        {material.semester}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                        Scheme {material.scheme}
                    </span>
                </div>

                {/* Subject */}
                <div className="mb-4 pb-4 border-b border-white/10">
                    <p className="text-slate-300 text-sm font-medium">{material.subject}</p>
                </div>

                {/* Contributor Info */}
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span className="text-slate-300">{material.contributor_name}</span>
                    <span className="text-slate-500">•</span>
                    <Calendar className="w-3 h-3" />
                    <span>{material.contributor_batch}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                    <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-300 font-medium">{material.view_count}</span>
                        <span className="text-xs">views</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Download className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-300 font-medium">{material.download_count}</span>
                        <span className="text-xs">downloads</span>
                    </div>
                    {material.view_count > 50 && (
                        <div className="ml-auto">
                            <TrendingUp className="w-4 h-4 text-cyan-400" />
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button
                        onClick={handleView}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                    </Button>
                    {!isVideo && (
                        <Button
                            onClick={handleDownload}
                            className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-500/30 transition-all"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
