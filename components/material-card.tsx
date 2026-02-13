'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye, User } from 'lucide-react';

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

    return (
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/15">
            <CardHeader>
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-white text-xl">{material.title}</CardTitle>
                    <Badge
                        variant="secondary"
                        className={`
              ${material.material_type === 'Question Paper' ? 'bg-purple-500/80' : ''}
              ${material.material_type === 'Note' ? 'bg-blue-500/80' : ''}
              ${material.material_type === 'Video' ? 'bg-pink-500/80' : ''}
              text-white border-0
            `}
                    >
                        {material.material_type}
                    </Badge>
                </div>
                {material.description && (
                    <CardDescription className="text-white/70 mt-2">
                        {material.description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-white/5 text-white border-white/30">
                        {material.department}
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 text-white border-white/30">
                        {material.semester}
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 text-white border-white/30">
                        Scheme {material.scheme}
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 text-white border-white/30">
                        {material.subject}
                    </Badge>
                </div>

                <div className="flex items-center gap-2 text-white/80 text-sm">
                    <User className="w-4 h-4" />
                    <span>
                        {material.contributor_name} • {material.contributor_batch}
                    </span>
                </div>

                <div className="flex items-center gap-4 text-white/60 text-sm">
                    <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{material.view_count} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{material.download_count} downloads</span>
                    </div>
                </div>

                <div className="flex gap-2 pt-2">
                    <Button
                        onClick={handleView}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                    </Button>
                    {!isVideo && (
                        <Button
                            onClick={handleDownload}
                            variant="outline"
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/30"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
