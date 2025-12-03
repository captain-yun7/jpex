import { NextRequest, NextResponse } from 'next/server';
import { getContractDocumentById, updateContractDocument, deleteContractDocument, ContractDocument } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * 계약서 문서 상세 조회
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const document = await getContractDocumentById(id);

    if (!document) {
      return NextResponse.json(
        { error: '계약서를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: document });
  } catch (error) {
    console.error('계약서 조회 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * 계약서 문서 수정
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body: Partial<ContractDocument> = await request.json();

    const document = await updateContractDocument(id, body);

    if (!document) {
      return NextResponse.json(
        { error: '계약서를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: document });
  } catch (error) {
    console.error('계약서 수정 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * 계약서 문서 삭제
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const document = await deleteContractDocument(id);

    if (!document) {
      return NextResponse.json(
        { error: '계약서를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: '계약서가 삭제되었습니다.' });
  } catch (error) {
    console.error('계약서 삭제 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
