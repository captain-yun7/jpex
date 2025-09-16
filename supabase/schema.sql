-- JPEX 프리랜싱 웹사이트 데이터베이스 스키마

-- 문의사항 테이블
CREATE TABLE inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    project_type TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 견적 요청 테이블
CREATE TABLE quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    project_type TEXT NOT NULL,
    project_scope TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    timeline TEXT NOT NULL,
    requirements TEXT NOT NULL,
    estimated_cost DECIMAL(10,2),
    complexity_score INTEGER DEFAULT 1,
    urgency_multiplier DECIMAL(3,2) DEFAULT 1.0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'sent', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 포트폴리오 프로젝트 테이블 (향후 동적 관리용)
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT, -- Markdown 형태의 상세 내용
    category TEXT NOT NULL CHECK (category IN ('web', 'ai', 'consulting')),
    technologies TEXT[] NOT NULL,
    image_url TEXT,
    gallery_urls TEXT[],
    project_url TEXT,
    github_url TEXT,
    metrics JSONB, -- 성과 지표 (매출증가율, 사용자수 등)
    client_name TEXT,
    client_company TEXT,
    client_testimonial TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 고객 후기 테이블
CREATE TABLE testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name TEXT NOT NULL,
    company TEXT,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(is_featured);

-- RLS (Row Level Security) 정책
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (프로젝트와 후기는 모든 사용자가 볼 수 있음)
CREATE POLICY "Projects are viewable by everyone" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Testimonials are viewable by everyone" ON testimonials
    FOR SELECT USING (true);

-- 문의와 견적은 관리자만 볼 수 있음 (나중에 인증 시스템 구현 시 수정)
CREATE POLICY "Inquiries are insertable by everyone" ON inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Quotes are insertable by everyone" ON quotes
    FOR INSERT WITH CHECK (true);

-- 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 업데이트 트리거 생성
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();