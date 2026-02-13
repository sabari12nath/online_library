'use client';

import { useState, useEffect } from 'react';
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

// Department-specific subjects
const SUBJECTS_BY_DEPARTMENT: Record<string, string[]> = {
    'CSE': [
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
        'Compiler Design',
        'Theory of Computation',
    ],
    'ECE': [
        'Digital Electronics',
        'Analog Electronics',
        'Signals and Systems',
        'Communication Systems',
        'Microprocessors',
        'VLSI Design',
        'Control Systems',
        'Electromagnetic Theory',
        'Digital Signal Processing',
        'Antenna and Wave Propagation',
    ],
    'ME': [
        'Thermodynamics',
        'Fluid Mechanics',
        'Strength of Materials',
        'Manufacturing Technology',
        'Heat Transfer',
        'Machine Design',
        'Dynamics of Machinery',
        'CAD/CAM',
        'Automobile Engineering',
        'Industrial Engineering',
    ],
    'CE': [
        'Structural Analysis',
        'Concrete Technology',
        'Surveying',
        'Soil Mechanics',
        'Hydraulics',
        'Transportation Engineering',
        'Environmental Engineering',
        'Construction Management',
        'Geotechnical Engineering',
        'Water Resources Engineering',
    ],
    'EEE': [
        'Electric Circuits',
        'Power Systems',
        'Electrical Machines',
        'Control Systems',
        'Power Electronics',
        'Microcontrollers',
        'Digital Electronics',
        'Renewable Energy',
        'High Voltage Engineering',
        'Electrical Measurements',
    ],
};

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [scheme, setScheme] = useState('');
    const [subject, setSubject] = useState('');
    const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);

    // Update available subjects when department changes
    useEffect(() => {
        if (department) {
            setAvailableSubjects(SUBJECTS_BY_DEPARTMENT[department] || []);
            // Reset subject when department changes
            setSubject('');
        } else {
            setAvailableSubjects([]);
            setSubject('');
        }
    }, [department]);

    const handleFilterChange = (
        type: 'department' | 'semester' | 'scheme' | 'subject',
        value: string
    ) => {
        let newFilters = { department, semester, scheme, subject };

        if (type === 'department') {
            setDepartment(value);
            newFilters.department = value;
            // Reset subject when department changes
            newFilters.subject = '';
        } else if (type === 'semester') {
            setSemester(value);
            newFilters.semester = value;
        } else if (type === 'scheme') {
            setScheme(value);
            newFilters.scheme = value;
        } else if (type === 'subject') {
            setSubject(value);
            newFilters.subject = value;
        }

        onFilterChange(newFilters);
    };

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/10 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="department" className="text-white font-medium">
                        Department
                    </Label>
                    <Select value={department} onValueChange={(value) => handleFilterChange('department', value)}>
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
                    <Select value={semester} onValueChange={(value) => handleFilterChange('semester', value)}>
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
                    <Select value={scheme} onValueChange={(value) => handleFilterChange('scheme', value)}>
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
                        Subject {department && <span className="text-cyan-400 text-xs">({department})</span>}
                    </Label>
                    <Select
                        value={subject}
                        onValueChange={(value) => handleFilterChange('subject', value)}
                        disabled={!department}
                    >
                        <SelectTrigger
                            id="subject"
                            className={`bg-white/10 border-white/30 text-white ${!department ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <SelectValue placeholder={department ? "Select Subject" : "Select Department First"} />
                        </SelectTrigger>
                        <SelectContent>
                            {availableSubjects.map((subj) => (
                                <SelectItem key={subj} value={subj}>
                                    {subj}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
