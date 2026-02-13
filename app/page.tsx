'use client';

import { useEffect, useState } from 'react';
import SearchFilters from '@/components/search-filters';
import MaterialCard from '@/components/material-card';
import { BookOpen } from 'lucide-react';

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

export default function HomePage() {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">
              Material Library
            </h1>
          </div>
          <p className="text-xl text-white/80">
            Access academic materials with ease
          </p>
        </div>

        <div className="mb-8">
          <SearchFilters onFilterChange={handleFilterChange} />
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
            <p className="text-white mt-4 text-lg">Searching materials...</p>
          </div>
        ) : materials.length > 0 ? (
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
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-24 h-24 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-lg">
              Select filters to search for materials
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
