import { NextResponse } from 'next/server';
import { getAllInquiries } from '@/lib/db';

export async function GET() {
  try {
    const inquiries = await getAllInquiries();
    return NextResponse.json({ data: inquiries });
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}