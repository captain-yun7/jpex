import { NextRequest, NextResponse } from 'next/server';
import { getAllContractDocuments, createContractDocument, ContractDocument } from '@/lib/db';

/**
 * 계약서 문서 목록 조회
 */
export async function GET() {
  try {
    const documents = await getAllContractDocuments();
    return NextResponse.json({ data: documents });
  } catch (error) {
    console.error('계약서 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * 계약서 문서 생성
 */
export async function POST(request: NextRequest) {
  try {
    const body: ContractDocument = await request.json();

    // 필수 필드 검증
    if (!body.title) {
      return NextResponse.json(
        { error: '계약서 제목은 필수입니다.' },
        { status: 400 }
      );
    }

    const document = await createContractDocument(body);
    return NextResponse.json({ data: document }, { status: 201 });
  } catch (error) {
    console.error('계약서 생성 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
