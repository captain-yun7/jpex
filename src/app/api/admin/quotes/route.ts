import { NextResponse } from 'next/server';
import { getAllQuotes } from '@/lib/db';

export async function GET() {
  try {
    const quotes = await getAllQuotes();
    return NextResponse.json({ data: quotes });
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}