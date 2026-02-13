import { NextRequest, NextResponse } from 'next/server';
import { searchMaterials } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const filters = {
            department: searchParams.get('department') || undefined,
            semester: searchParams.get('semester') || undefined,
            scheme: searchParams.get('scheme') || undefined,
            subject: searchParams.get('subject') || undefined,
        };

        const materials = searchMaterials(filters);

        return NextResponse.json(materials);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: 'Failed to search materials' },
            { status: 500 }
        );
    }
}
