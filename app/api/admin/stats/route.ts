import { NextResponse } from 'next/server';
import { getAnalytics } from '@/lib/db';

export async function GET() {
    try {
        const stats = getAnalytics();
        return NextResponse.json(stats);
    } catch (error) {
        console.error('Stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
}
