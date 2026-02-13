import { NextRequest, NextResponse } from 'next/server';
import { incrementDownloadCount } from '@/lib/db';

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

        incrementDownloadCount(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Download count error:', error);
        return NextResponse.json(
            { error: 'Failed to update download count' },
            { status: 500 }
        );
    }
}
