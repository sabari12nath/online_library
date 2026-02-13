'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Upload, Loader2 } from 'lucide-react';

const DEPARTMENTS = ['CSE', 'ECE', 'ME', 'CE', 'EEE'];
const SEMESTERS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];
const SCHEMES = ['2015', '2019', '2025'];
const SUBJECTS = [
    'Data Structures',
    'Algorithms',
    'Database Management',
    'Computer Networks',
    'Operating Systems',
    'Software Engineering',
    'Web Development',
    'Machine Learning',
    'Artificial Intelligence',
    'Computer Architecture',
];
const MATERIAL_TYPES = ['Question Paper', 'Note', 'Video'];

export default function UploadForm({ onSuccess }: { onSuccess: () => void }) {
    const [loading, setLoading] = useState(false);
    const [materialType, setMaterialType] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Material uploaded successfully!');
                e.currentTarget.reset();
                setMaterialType('');
                onSuccess();
            } else {
                setMessage(data.error || 'Upload failed');
            }
        } catch (error) {
            setMessage('An error occurred during upload');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
                <CardTitle className="text-white text-2xl">Upload Material</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-white">
                                Title *
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                required
                                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                                placeholder="Enter material title"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="department" className="text-white">
                                Department *
                            </Label>
                            <Select name="department" required>
                                <SelectTrigger className="bg-white/10 border-white/30 text-white">
                                    <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {DEPARTMENTS.map((dept) => (
                                        <SelectItem key={dept} value={dept}>
                                            {dept}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="semester" className="text-white">
                                Semester *
                            </Label>
                            <Select name="semester" required>
                                <SelectTrigger className="bg-white/10 border-white/30 text-white">
                                    <SelectValue placeholder="Select Semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SEMESTERS.map((sem) => (
                                        <SelectItem key={sem} value={sem}>
                                            {sem}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="scheme" className="text-white">
                                Scheme *
                            </Label>
                            <Select name="scheme" required>
                                <SelectTrigger className="bg-white/10 border-white/30 text-white">
                                    <SelectValue placeholder="Select Scheme" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SCHEMES.map((sch) => (
                                        <SelectItem key={sch} value={sch}>
                                            {sch}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subject" className="text-white">
                                Subject *
                            </Label>
                            <Select name="subject" required>
                                <SelectTrigger className="bg-white/10 border-white/30 text-white">
                                    <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SUBJECTS.map((subj) => (
                                        <SelectItem key={subj} value={subj}>
                                            {subj}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="material_type" className="text-white">
                                Material Type *
                            </Label>
                            <Select
                                name="material_type"
                                required
                                onValueChange={(value) => setMaterialType(value)}
                            >
                                <SelectTrigger className="bg-white/10 border-white/30 text-white">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {MATERIAL_TYPES.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-white">
                            Description
                        </Label>
                        <Input
                            id="description"
                            name="description"
                            className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                            placeholder="Brief description (optional)"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="contributor_name" className="text-white">
                                Contributor Name *
                            </Label>
                            <Input
                                id="contributor_name"
                                name="contributor_name"
                                required
                                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contributor_batch" className="text-white">
                                Batch *
                            </Label>
                            <Input
                                id="contributor_batch"
                                name="contributor_batch"
                                required
                                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                                placeholder="2021-25"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contributor_year" className="text-white">
                                Year *
                            </Label>
                            <Input
                                id="contributor_year"
                                name="contributor_year"
                                required
                                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                                placeholder="2024"
                            />
                        </div>
                    </div>

                    {materialType === 'Video' ? (
                        <div className="space-y-2">
                            <Label htmlFor="video_link" className="text-white">
                                Video Link *
                            </Label>
                            <Input
                                id="video_link"
                                name="video_link"
                                type="url"
                                required
                                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                                placeholder="https://youtube.com/..."
                            />
                        </div>
                    ) : materialType ? (
                        <div className="space-y-2">
                            <Label htmlFor="file" className="text-white">
                                Upload File (PDF) *
                            </Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept=".pdf"
                                required
                                className="bg-white/10 border-white/30 text-white file:text-white file:bg-white/20 file:border-0 file:mr-4"
                            />
                        </div>
                    ) : null}

                    {message && (
                        <div
                            className={`p-3 rounded-lg ${message.includes('success')
                                    ? 'bg-green-500/20 text-green-100'
                                    : 'bg-red-500/20 text-red-100'
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-6"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5 mr-2" />
                                Upload Material
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
