import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Upload, Eye } from 'lucide-react';

interface StatsDisplayProps {
    stats: {
        total_visits: number;
        total_uploads: number;
    };
}

export default function StatsDisplay({ stats }: StatsDisplayProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-white/20 shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-white text-lg font-medium">
                        Total Uploads
                    </CardTitle>
                    <Upload className="w-8 h-8 text-blue-300" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-white">
                        {stats.total_uploads}
                    </div>
                    <p className="text-white/70 text-sm mt-1">Materials in library</p>
                </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-gradient-to-br from-pink-500/20 to-orange-600/20 border-white/20 shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-white text-lg font-medium">
                        Total Visits
                    </CardTitle>
                    <Eye className="w-8 h-8 text-pink-300" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-white">
                        {stats.total_visits}
                    </div>
                    <p className="text-white/70 text-sm mt-1">Website visits</p>
                </CardContent>
            </Card>
        </div>
    );
}
