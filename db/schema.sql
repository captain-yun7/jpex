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

-- 문의사항 테이블
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  project_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- 트리거 생성
DROP TRIGGER IF EXISTS update_inquiries_updated_at ON inquiries;
CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 코멘트 추가
COMMENT ON TABLE inquiries IS 'JPEX 문의사항 데이터';
COMMENT ON COLUMN inquiries.id IS '문의사항 고유 ID';
COMMENT ON COLUMN inquiries.name IS '고객 이름';
COMMENT ON COLUMN inquiries.email IS '고객 이메일';
COMMENT ON COLUMN inquiries.phone IS '고객 전화번호';
COMMENT ON COLUMN inquiries.company IS '회사명';
COMMENT ON COLUMN inquiries.project_type IS '프로젝트 유형';
COMMENT ON COLUMN inquiries.message IS '문의 내용';
COMMENT ON COLUMN inquiries.status IS '상태 (new, in_progress, completed, cancelled)';
COMMENT ON COLUMN inquiries.created_at IS '생성 일시';
COMMENT ON COLUMN inquiries.updated_at IS '수정 일시';
