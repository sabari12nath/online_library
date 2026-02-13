'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface SearchFiltersProps {
    onFilterChange: (filters: {
        department: string;
        semester: string;
        scheme: string;
        subject: string;
    }) => void;
}

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

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [scheme, setScheme] = useState('');
    const [subject, setSubject] = useState('');

    const handleFilterChange = (
        type: 'department' | 'semester' | 'scheme' | 'subject',
        value: string
    ) => {
        const newFilters = { department, semester, scheme, subject };
        newFilters[type] = value;

        if (type === 'department') setDepartment(value);
        if (type === 'semester') setSemester(value);
        if (type === 'scheme') setScheme(value);
        if (type === 'subject') setSubject(value);

        onFilterChange(newFilters);
    };

    return (
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="department" className="text-white font-medium">
                            Department
                        </Label>
                        <Select onValueChange={(value) => handleFilterChange('department', value)}>
                            <SelectTrigger id="department" className="bg-white/10 border-white/30 text-white">
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
                        <Label htmlFor="semester" className="text-white font-medium">
                            Semester
                        </Label>
                        <Select onValueChange={(value) => handleFilterChange('semester', value)}>
                            <SelectTrigger id="semester" className="bg-white/10 border-white/30 text-white">
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
                        <Label htmlFor="scheme" className="text-white font-medium">
                            Scheme
                        </Label>
                        <Select onValueChange={(value) => handleFilterChange('scheme', value)}>
                            <SelectTrigger id="scheme" className="bg-white/10 border-white/30 text-white">
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
                        <Label htmlFor="subject" className="text-white font-medium">
                            Subject
                        </Label>
                        <Select onValueChange={(value) => handleFilterChange('subject', value)}>
                            <SelectTrigger id="subject" className="bg-white/10 border-white/30 text-white">
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
                </div>
            </CardContent>
        </Card>
    );
}
