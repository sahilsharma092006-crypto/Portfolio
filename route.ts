import { NextResponse } from 'next/server';

export async function GET() { return NextResponse.json({ status: 'External Root Route Ignored' }); }
