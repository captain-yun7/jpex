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

// ============================================
// 계약서 문서 관리 (ContractDocument)
// ============================================

/**
 * 용역 범위 타입 정의
 */
export interface ScopeOfWork {
  category?: string;
  name: string;
  description?: string;
}

/**
 * 대금 지급 일정 타입 정의
 */
export interface PaymentSchedule {
  name: string;
  rate?: number;
  amount: number;
  due_date?: string;
  condition?: string;
}

/**
 * 계약서 문서 타입 정의
 */
export interface ContractDocument {
  id?: string;
  title: string;
  client_name?: string | null;
  client_address?: string | null;
  client_contact?: string | null;
  client_email?: string | null;
  project_name?: string | null;
  doc_number?: string | null;
  contract_date?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  total_amount?: number;
  scope_of_work?: ScopeOfWork[];
  payment_schedule?: PaymentSchedule[];
  special_terms?: string | null;
  notes?: string | null;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * 계약서 문서 생성
 */
export async function createContractDocument(data: ContractDocument) {
  const result = await sql`
    INSERT INTO contract_documents (
      title,
      client_name,
      client_address,
      client_contact,
      client_email,
      project_name,
      doc_number,
      contract_date,
      start_date,
      end_date,
      total_amount,
      scope_of_work,
      payment_schedule,
      special_terms,
      notes,
      status
    ) VALUES (
      ${data.title},
      ${data.client_name || null},
      ${data.client_address || null},
      ${data.client_contact || null},
      ${data.client_email || null},
      ${data.project_name || null},
      ${data.doc_number || null},
      ${data.contract_date || null},
      ${data.start_date || null},
      ${data.end_date || null},
      ${data.total_amount || 0},
      ${JSON.stringify(data.scope_of_work || [])},
      ${JSON.stringify(data.payment_schedule || [])},
      ${data.special_terms || null},
      ${data.notes || null},
      ${data.status || 'draft'}
    )
    RETURNING *
  `;

  return result[0];
}

/**
 * 계약서 문서 조회
 */
export async function getContractDocumentById(id: string) {
  const result = await sql`
    SELECT * FROM contract_documents
    WHERE id = ${id}
    LIMIT 1
  `;

  return result[0] || null;
}

/**
 * 모든 계약서 문서 조회
 */
export async function getAllContractDocuments() {
  const result = await sql`
    SELECT * FROM contract_documents
    ORDER BY created_at DESC
  `;

  return result;
}

/**
 * 계약서 문서 업데이트
 */
export async function updateContractDocument(id: string, data: Partial<ContractDocument>) {
  const result = await sql`
    UPDATE contract_documents
    SET
      title = COALESCE(${data.title}, title),
      client_name = COALESCE(${data.client_name}, client_name),
      client_address = COALESCE(${data.client_address}, client_address),
      client_contact = COALESCE(${data.client_contact}, client_contact),
      client_email = COALESCE(${data.client_email}, client_email),
      project_name = COALESCE(${data.project_name}, project_name),
      doc_number = COALESCE(${data.doc_number}, doc_number),
      contract_date = COALESCE(${data.contract_date}, contract_date),
      start_date = COALESCE(${data.start_date}, start_date),
      end_date = COALESCE(${data.end_date}, end_date),
      total_amount = COALESCE(${data.total_amount}, total_amount),
      scope_of_work = COALESCE(${data.scope_of_work ? JSON.stringify(data.scope_of_work) : null}, scope_of_work),
      payment_schedule = COALESCE(${data.payment_schedule ? JSON.stringify(data.payment_schedule) : null}, payment_schedule),
      special_terms = COALESCE(${data.special_terms}, special_terms),
      notes = COALESCE(${data.notes}, notes),
      status = COALESCE(${data.status}, status),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return result[0] || null;
}

/**
 * 계약서 문서 삭제
 */
export async function deleteContractDocument(id: string) {
  const result = await sql`
    DELETE FROM contract_documents
    WHERE id = ${id}
    RETURNING *
  `;

  return result[0] || null;
}
