/**
 * Neon Postgres Database Connection
 */

import { neon, NeonQueryFunction } from '@neondatabase/serverless';

// 빌드 시에는 더미 함수 반환, 런타임에만 실제 연결
const createSqlClient = (): NeonQueryFunction<false, false> => {
  if (!process.env.DATABASE_URL) {
    // 빌드 시에는 더미 함수 반환
    if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
      console.warn('DATABASE_URL이 설정되지 않았습니다. DB 기능이 작동하지 않습니다.');
    }
    return (async () => []) as unknown as NeonQueryFunction<false, false>;
  }
  return neon(process.env.DATABASE_URL);
};

export const sql = createSqlClient();

/**
 * 견적 문의 타입 정의
 */
export interface Quote {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  project_type: string;
  budget_range?: string | null;
  timeline?: string | null;
  requirements?: string | null;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * 견적 문의 생성
 */
export async function createQuote(data: Quote) {
  const result = await sql`
    INSERT INTO quotes (
      name,
      email,
      phone,
      company,
      project_type,
      budget_range,
      timeline,
      requirements,
      status
    ) VALUES (
      ${data.name},
      ${data.email},
      ${data.phone || null},
      ${data.company || null},
      ${data.project_type},
      ${data.budget_range || null},
      ${data.timeline || null},
      ${data.requirements || null},
      ${data.status || 'pending'}
    )
    RETURNING *
  `;

  return result[0];
}

/**
 * 견적 문의 조회
 */
export async function getQuoteById(id: string) {
  const result = await sql`
    SELECT * FROM quotes
    WHERE id = ${id}
    LIMIT 1
  `;

  return result[0] || null;
}

/**
 * 모든 견적 문의 조회
 */
export async function getAllQuotes() {
  const result = await sql`
    SELECT * FROM quotes
    ORDER BY created_at DESC
  `;

  return result;
}

/**
 * 견적 문의 상태 업데이트
 */
export async function updateQuoteStatus(id: string, status: string) {
  const result = await sql`
    UPDATE quotes
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return result[0] || null;
}

// ============================================
// 견적서 문서 관리 (QuoteDocument)
// ============================================

/**
 * 견적서 문서 타입 정의
 */
export interface QuoteItem {
  category?: string;
  name: string;
  description?: string;
  quantity?: number;
  unit_price?: number;
  amount: number;
}

export interface PaymentTerms {
  deposit_rate?: number;
  deposit_amount?: number;
  mid_rate?: number;
  mid_amount?: number;
  final_rate?: number;
  final_amount?: number;
  description?: string;
}

export interface ExtraCost {
  name: string;
  amount: string;
  note?: string;
}

export interface QuoteDocument {
  id?: string;
  title: string;
  client_name?: string | null;
  project_name?: string | null;
  doc_number?: string | null;
  doc_date?: string | null;
  valid_days?: number;
  total_amount?: number;
  items?: QuoteItem[];
  payment_terms?: PaymentTerms;
  extra_costs?: ExtraCost[];
  notes?: string | null;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * 견적서 문서 생성
 */
export async function createQuoteDocument(data: QuoteDocument) {
  const result = await sql`
    INSERT INTO quote_documents (
      title,
      client_name,
      project_name,
      doc_number,
      doc_date,
      valid_days,
      total_amount,
      items,
      payment_terms,
      extra_costs,
      notes,
      status
    ) VALUES (
      ${data.title},
      ${data.client_name || null},
      ${data.project_name || null},
      ${data.doc_number || null},
      ${data.doc_date || null},
      ${data.valid_days || 30},
      ${data.total_amount || 0},
      ${JSON.stringify(data.items || [])},
      ${JSON.stringify(data.payment_terms || {})},
      ${JSON.stringify(data.extra_costs || [])},
      ${data.notes || null},
      ${data.status || 'draft'}
    )
    RETURNING *
  `;

  return result[0];
}

/**
 * 견적서 문서 조회
 */
export async function getQuoteDocumentById(id: string) {
  const result = await sql`
    SELECT * FROM quote_documents
    WHERE id = ${id}
    LIMIT 1
  `;

  return result[0] || null;
}

/**
 * 모든 견적서 문서 조회
 */
export async function getAllQuoteDocuments() {
  const result = await sql`
    SELECT * FROM quote_documents
    ORDER BY created_at DESC
  `;

  return result;
}

/**
 * 견적서 문서 업데이트
 */
export async function updateQuoteDocument(id: string, data: Partial<QuoteDocument>) {
  const result = await sql`
    UPDATE quote_documents
    SET
      title = COALESCE(${data.title}, title),
      client_name = COALESCE(${data.client_name}, client_name),
      project_name = COALESCE(${data.project_name}, project_name),
      doc_number = COALESCE(${data.doc_number}, doc_number),
      doc_date = COALESCE(${data.doc_date}, doc_date),
      valid_days = COALESCE(${data.valid_days}, valid_days),
      total_amount = COALESCE(${data.total_amount}, total_amount),
      items = COALESCE(${data.items ? JSON.stringify(data.items) : null}, items),
      payment_terms = COALESCE(${data.payment_terms ? JSON.stringify(data.payment_terms) : null}, payment_terms),
      extra_costs = COALESCE(${data.extra_costs ? JSON.stringify(data.extra_costs) : null}, extra_costs),
      notes = COALESCE(${data.notes}, notes),
      status = COALESCE(${data.status}, status),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return result[0] || null;
}

/**
 * 견적서 문서 삭제
 */
export async function deleteQuoteDocument(id: string) {
  const result = await sql`
    DELETE FROM quote_documents
    WHERE id = ${id}
    RETURNING *
  `;

  return result[0] || null;
}
