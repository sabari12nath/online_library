import { NextResponse } from 'next/server';
import { incrementVisitCount } from '@/lib/db';

export async function POST() {
    try {
        incrementVisitCount();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Visit tracking error:', error);
        return NextResponse.json(
            { error: 'Failed to track visit' },
            { status: 500 }
        );
    }
}
