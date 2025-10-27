/**
 * Neon Postgres Database Connection
 */

import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL 환경 변수가 설정되지 않았습니다.');
}

export const sql = neon(process.env.DATABASE_URL);

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
