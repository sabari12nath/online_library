import { Upload, Eye } from 'lucide-react';

interface StatsDisplayProps {
    stats: {
        total_visits: number;
        total_uploads: number;
    };
}

export default function StatsDisplay({ stats }: StatsDisplayProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-slate-300">Total Uploads</h3>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                        <Upload className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    {stats.total_uploads}
                </div>
                <p className="text-slate-400 text-sm">Materials in library</p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-slate-300">Total Visits</h3>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600">
                        <Eye className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                    {stats.total_visits}
                </div>
                <p className="text-slate-400 text-sm">Website visits</p>
            </div>
        </div>
    );
}
