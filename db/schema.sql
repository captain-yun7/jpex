-- JPEX 견적 문의 테이블
-- Neon Postgres Database Schema

-- 견적 문의 테이블
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  project_type VARCHAR(100) NOT NULL,
  budget_range VARCHAR(100),
  timeline VARCHAR(100),
  requirements TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes(email);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);

-- 업데이트 시간 자동 갱신 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 코멘트 추가
COMMENT ON TABLE quotes IS 'JPEX 견적 문의 데이터';
COMMENT ON COLUMN quotes.id IS '견적 문의 고유 ID';
COMMENT ON COLUMN quotes.name IS '고객 이름';
COMMENT ON COLUMN quotes.email IS '고객 이메일';
COMMENT ON COLUMN quotes.phone IS '고객 전화번호';
COMMENT ON COLUMN quotes.company IS '회사명';
COMMENT ON COLUMN quotes.project_type IS '프로젝트 유형 (web, mobile, ai, cloud, consulting, education)';
COMMENT ON COLUMN quotes.budget_range IS '예산 범위';
COMMENT ON COLUMN quotes.timeline IS '희망 일정';
COMMENT ON COLUMN quotes.requirements IS '프로젝트 설명 및 요구사항';
COMMENT ON COLUMN quotes.status IS '상태 (pending, in_progress, completed, cancelled)';
COMMENT ON COLUMN quotes.created_at IS '생성 일시';
COMMENT ON COLUMN quotes.updated_at IS '수정 일시';

-- ============================================
-- 견적서 문서 테이블 (관리자용)
-- ============================================

CREATE TABLE IF NOT EXISTS quote_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  client_name VARCHAR(255),
  project_name VARCHAR(255),
  doc_number VARCHAR(100),
  doc_date DATE DEFAULT CURRENT_DATE,
  valid_days INTEGER DEFAULT 30,
  total_amount BIGINT DEFAULT 0,
  items JSONB DEFAULT '[]'::jsonb,
  payment_terms JSONB DEFAULT '{}'::jsonb,
  extra_costs JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_quote_documents_status ON quote_documents(status);
CREATE INDEX IF NOT EXISTS idx_quote_documents_created_at ON quote_documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_documents_doc_number ON quote_documents(doc_number);

-- 트리거 생성
DROP TRIGGER IF EXISTS update_quote_documents_updated_at ON quote_documents;
CREATE TRIGGER update_quote_documents_updated_at
  BEFORE UPDATE ON quote_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 코멘트 추가
COMMENT ON TABLE quote_documents IS 'JPEX 견적서 문서 관리';
COMMENT ON COLUMN quote_documents.id IS '견적서 고유 ID';
COMMENT ON COLUMN quote_documents.title IS '견적서 제목';
COMMENT ON COLUMN quote_documents.client_name IS '수신처 (고객명)';
COMMENT ON COLUMN quote_documents.project_name IS '프로젝트명';
COMMENT ON COLUMN quote_documents.doc_number IS '문서번호';
COMMENT ON COLUMN quote_documents.doc_date IS '견적서 작성일';
COMMENT ON COLUMN quote_documents.valid_days IS '유효기간 (일)';
COMMENT ON COLUMN quote_documents.total_amount IS '총 금액';
COMMENT ON COLUMN quote_documents.items IS '견적 항목 (JSON 배열)';
COMMENT ON COLUMN quote_documents.payment_terms IS '결제 조건 (JSON)';
COMMENT ON COLUMN quote_documents.extra_costs IS '별도 비용 항목 (JSON 배열)';
COMMENT ON COLUMN quote_documents.notes IS '기타 사항';
COMMENT ON COLUMN quote_documents.status IS '상태 (draft, sent, accepted, rejected)';
COMMENT ON COLUMN quote_documents.created_at IS '생성 일시';
COMMENT ON COLUMN quote_documents.updated_at IS '수정 일시';
