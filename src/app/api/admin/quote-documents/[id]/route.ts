import { NextRequest, NextResponse } from 'next/server';
import { getQuoteDocumentById, updateQuoteDocument, deleteQuoteDocument, QuoteDocument } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * 견적서 문서 상세 조회
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const document = await getQuoteDocumentById(id);

    if (!document) {
      return NextResponse.json(
        { error: '견적서를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: document });
  } catch (error) {
    console.error('견적서 조회 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * 견적서 문서 수정
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body: Partial<QuoteDocument> = await request.json();

    const document = await updateQuoteDocument(id, body);

    if (!document) {
      return NextResponse.json(
        { error: '견적서를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: document });
  } catch (error) {
    console.error('견적서 수정 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * 견적서 문서 삭제
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const document = await deleteQuoteDocument(id);

    if (!document) {
      return NextResponse.json(
        { error: '견적서를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: '견적서가 삭제되었습니다.' });
  } catch (error) {
    console.error('견적서 삭제 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
