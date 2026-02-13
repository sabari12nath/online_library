import { NextRequest, NextResponse } from 'next/server';
import { incrementViewCount } from '@/lib/db';

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid material ID' },
                { status: 400 }
            );
        }

        incrementViewCount(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('View count error:', error);
        return NextResponse.json(
            { error: 'Failed to update view count' },
            { status: 500 }
        );
    }
}
