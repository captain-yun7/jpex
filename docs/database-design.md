# 데이터베이스 설계 문서

## 📋 개요
- **데이터베이스**: Supabase (PostgreSQL)
- **ORM**: Supabase 클라이언트
- **보안**: Row Level Security (RLS) 적용
- **백업**: 자동 백업 설정

---

## 🗂️ 테이블 구조

### 1. projects (포트폴리오 프로젝트)
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT, -- Markdown 형식의 상세 내용
  category TEXT NOT NULL CHECK (category IN ('web', 'mobile', 'ai', 'consulting')),
  technologies TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  demo_url TEXT,
  
  -- 성과 지표
  metrics JSONB DEFAULT '{}', -- {"revenue_increase": 30, "user_growth": 150, "performance_improvement": 40}
  
  -- 클라이언트 정보
  client_name TEXT,
  client_company TEXT,
  client_testimonial TEXT,
  client_rating INTEGER CHECK (client_rating >= 1 AND client_rating <= 5),
  
  -- 프로젝트 세부 정보
  project_duration TEXT, -- "3 months", "6 weeks" 등
  team_size INTEGER DEFAULT 1,
  project_budget_range TEXT,
  
  -- 메타 데이터
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 슬러그 자동 생성 트리거
CREATE OR REPLACE FUNCTION generate_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := LOWER(REPLACE(REPLACE(NEW.title, ' ', '-'), '--', '-'));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_project_slug
  BEFORE INSERT OR UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION generate_slug();
```

### 2. inquiries (일반 문의)
```sql
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  project_type TEXT CHECK (project_type IN ('web', 'mobile', 'ai', 'consulting', 'other')),
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- 추가 정보
  budget_range TEXT,
  timeline TEXT,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- 상태 관리
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'in_progress', 'replied', 'completed', 'archived')),
  admin_notes TEXT,
  replied_at TIMESTAMP WITH TIME ZONE,
  
  -- 메타 데이터
  source TEXT DEFAULT 'website', -- 문의 출처
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. quotes (견적 요청)
```sql
CREATE TABLE quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_number TEXT UNIQUE NOT NULL, -- QUO-2024-001 형식
  
  -- 연락처 정보
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  
  -- 프로젝트 정보
  project_type TEXT NOT NULL CHECK (project_type IN ('web', 'mobile', 'ai', 'consulting')),
  project_title TEXT NOT NULL,
  project_description TEXT NOT NULL,
  project_scope TEXT, -- 'small', 'medium', 'large', 'enterprise'
  
  -- 요구사항
  features TEXT[] DEFAULT '{}', -- 필요한 기능들
  integrations TEXT[] DEFAULT '{}', -- 필요한 연동 서비스
  design_preference TEXT, -- 'minimal', 'modern', 'corporate', 'creative'
  
  -- 예산 및 일정
  budget_range TEXT,
  timeline TEXT,
  start_date DATE,
  deadline DATE,
  
  -- 첨부 파일
  attachments JSONB DEFAULT '[]', -- [{"name": "file.pdf", "url": "...", "size": 1024}]
  
  -- 견적 정보
  estimated_cost DECIMAL(10,2),
  estimated_hours INTEGER,
  proposal_sent BOOLEAN DEFAULT FALSE,
  proposal_url TEXT,
  
  -- 상태 관리
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'quoted', 'accepted', 'rejected', 'expired')),
  admin_notes TEXT,
  
  -- 메타 데이터
  source TEXT DEFAULT 'website',
  conversion_source TEXT, -- 어떤 페이지에서 견적 요청했는지
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days')
);

-- 견적 번호 자동 생성
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.quote_number := 'QUO-' || EXTRACT(YEAR FROM NOW()) || '-' || 
                     LPAD((SELECT COUNT(*) + 1 FROM quotes WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW()))::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_quote_number_trigger
  BEFORE INSERT ON quotes
  FOR EACH ROW EXECUTE FUNCTION generate_quote_number();
```

### 4. blog_posts (블로그 포스트)
```sql
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL, -- Markdown 형식
  
  -- 분류
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  
  -- 메타 데이터
  featured_image TEXT,
  seo_title TEXT,
  seo_description TEXT,
  
  -- 상태
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  
  -- 통계
  view_count INTEGER DEFAULT 0,
  read_time INTEGER, -- 예상 읽기 시간 (분)
  
  -- 일정
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. testimonials (고객 후기)
```sql
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_position TEXT,
  company TEXT,
  company_logo TEXT,
  
  -- 후기 내용
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  
  -- 연관 프로젝트
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  
  -- 메타 데이터
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  source TEXT DEFAULT 'direct', -- 'direct', 'email', 'form'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6. site_settings (사이트 설정)
```sql
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 기본 설정 값들
INSERT INTO site_settings (key, value, description, category) VALUES
('site_title', '"JPEX - 프리랜서 웹 개발"', '사이트 제목', 'seo'),
('site_description', '"전문적인 웹/앱 개발 및 AI 솔루션 서비스"', '사이트 설명', 'seo'),
('contact_email', '"contact@jpex.kr"', '연락처 이메일', 'contact'),
('business_hours', '{"monday": "09:00-18:00", "friday": "09:00-18:00", "weekend": "closed"}', '영업시간', 'contact'),
('availability_status', '"available"', '현재 가용성 상태 (available/busy/unavailable)', 'status'),
('current_projects', '3', '현재 진행 중인 프로젝트 수', 'status'),
('max_projects', '5', '최대 동시 진행 가능 프로젝트 수', 'status'),
('response_time', '"24시간 이내"', '평균 응답 시간', 'contact');
```

### 7. analytics (분석 데이터)
```sql
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'page_view', 'form_submit', 'project_view', 'download'
  page_url TEXT,
  event_data JSONB DEFAULT '{}',
  
  -- 사용자 정보
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  
  -- 세션 정보  
  session_id TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 파티션 테이블 생성 (월별)
CREATE TABLE analytics_y2024m01 PARTITION OF analytics
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

---

## 🔐 보안 설정 (Row Level Security)

### RLS 정책 설정
```sql
-- 모든 테이블에 RLS 활성화
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (Published 항목만)
CREATE POLICY "Public projects are viewable by everyone"
ON projects FOR SELECT
USING (is_published = true);

CREATE POLICY "Published blog posts are viewable by everyone"
ON blog_posts FOR SELECT
USING (published = true);

CREATE POLICY "Approved testimonials are viewable by everyone"
ON testimonials FOR SELECT
USING (is_approved = true);

CREATE POLICY "Site settings are viewable by everyone"
ON site_settings FOR SELECT
USING (true);

-- 관리자만 수정 가능
CREATE POLICY "Only admin can modify projects"
ON projects FOR ALL
USING (auth.role() = 'service_role');

-- 문의/견적은 생성만 허용 (읽기는 관리자만)
CREATE POLICY "Anyone can create inquiries"
ON inquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can create quotes"
ON quotes FOR INSERT
WITH CHECK (true);

-- 분석 데이터는 생성만 허용
CREATE POLICY "Anyone can create analytics"
ON analytics FOR INSERT
WITH CHECK (true);
```

---

## 📊 인덱스 최적화

### 성능 인덱스
```sql
-- 프로젝트 검색 최적화
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(is_featured) WHERE is_featured = true;
CREATE INDEX idx_projects_published ON projects(is_published) WHERE is_published = true;
CREATE INDEX idx_projects_slug ON projects(slug);

-- 블로그 검색 최적화
CREATE INDEX idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- 문의 관리 최적화
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_email ON inquiries(email);

-- 견적 관리 최적화
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_created ON quotes(created_at DESC);
CREATE INDEX idx_quotes_number ON quotes(quote_number);

-- 분석 데이터 최적화
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_created ON analytics(created_at DESC);
CREATE INDEX idx_analytics_page_url ON analytics(page_url);

-- 복합 인덱스
CREATE INDEX idx_projects_category_featured ON projects(category, is_featured) WHERE is_published = true;
CREATE INDEX idx_blog_category_published ON blog_posts(category, published_at DESC) WHERE published = true;
```

---

## 🔧 뷰 (Views) 생성

### 자주 사용되는 데이터 뷰
```sql
-- 공개 프로젝트 뷰
CREATE VIEW public_projects AS
SELECT 
  id, title, slug, description, category, technologies,
  image_url, gallery_urls, project_url, github_url,
  client_name, client_testimonial, client_rating,
  metrics, is_featured, view_count, created_at
FROM projects 
WHERE is_published = true
ORDER BY is_featured DESC, created_at DESC;

-- 최신 블로그 포스트 뷰
CREATE VIEW latest_blog_posts AS
SELECT 
  id, title, slug, excerpt, category, tags,
  featured_image, view_count, read_time, published_at
FROM blog_posts 
WHERE published = true
ORDER BY published_at DESC;

-- 대시보드 통계 뷰
CREATE VIEW dashboard_stats AS
SELECT 
  (SELECT COUNT(*) FROM projects WHERE is_published = true) as total_projects,
  (SELECT COUNT(*) FROM inquiries WHERE status = 'new') as new_inquiries,
  (SELECT COUNT(*) FROM quotes WHERE status = 'pending') as pending_quotes,
  (SELECT COUNT(*) FROM blog_posts WHERE published = true) as published_posts,
  (SELECT AVG(client_rating) FROM testimonials WHERE is_approved = true) as avg_rating;
```

---

## 📈 함수 및 트리거

### 업데이트 시간 자동 관리
```sql
-- 업데이트 시간 자동 설정 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 모든 테이블에 트리거 적용
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 조회수 증가 함수
```sql
-- 프로젝트 조회수 증가
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE projects 
  SET view_count = view_count + 1 
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 블로그 조회수 증가
CREATE OR REPLACE FUNCTION increment_blog_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts 
  SET view_count = view_count + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 🗃️ 샘플 데이터

### 기본 프로젝트 데이터
```sql
-- 샘플 프로젝트
INSERT INTO projects (title, description, category, technologies, image_url, project_url, client_name, client_testimonial, client_rating, metrics, is_featured) VALUES
('E-커머스 웹사이트 개발', '반응형 온라인 쇼핑몰 구축 프로젝트', 'web', ARRAY['Next.js', 'React', 'Node.js', 'PostgreSQL'], '/images/projects/ecommerce.jpg', 'https://example-store.com', '김상호', '매출이 300% 증가했습니다. 정말 만족스러운 결과입니다.', 5, '{"revenue_increase": 300, "user_growth": 450, "performance_improvement": 60}', true),
('AI 챗봇 시스템', '고객 응대 자동화를 위한 AI 챗봇 개발', 'ai', ARRAY['Python', 'TensorFlow', 'OpenAI API', 'FastAPI'], '/images/projects/chatbot.jpg', null, '이영희', '고객 응대 시간이 70% 단축되었어요.', 5, '{"response_time_reduction": 70, "customer_satisfaction": 95}', true),
('모바일 앱 개발', '크로스 플랫폼 모바일 애플리케이션', 'mobile', ARRAY['React Native', 'Firebase', 'TypeScript'], '/images/projects/mobile.jpg', 'https://app-store-link.com', '박지민', '사용자 친화적인 인터페이스가 인상적이었습니다.', 4, '{"download_count": 10000, "user_rating": 4.7}', false);

-- 샘플 블로그 포스트
INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, published, featured) VALUES
('Next.js 14의 새로운 기능들', 'nextjs-14-new-features', 'Next.js 14에서 추가된 주요 기능들을 살펴봅니다.', '# Next.js 14의 새로운 기능들\n\n이번 글에서는...', 'web-development', ARRAY['Next.js', 'React', 'Web Development'], true, true),
('AI 프로젝트 성공 사례', 'ai-project-success-stories', '실제 AI 프로젝트 구현 사례와 노하우를 공유합니다.', '# AI 프로젝트 성공 사례\n\n최근 완료한...', 'ai', ARRAY['AI', 'Machine Learning', 'Case Study'], true, false);
```

---

## 🔄 백업 및 복구 전략

### 자동 백업 설정
- **일일 백업**: 매일 자정 자동 백업
- **주간 백업**: 매주 일요일 전체 백업
- **월간 백업**: 매월 첫째 주 장기 보관용 백업

### 복구 시나리오
1. **데이터 손실**: Point-in-time 복구
2. **테이블 손상**: 테이블별 개별 복구
3. **전체 시스템**: 최신 백업으로 전체 복구

---

## 📊 모니터링 및 최적화

### 성능 모니터링
- **쿼리 성능**: 느린 쿼리 자동 탐지
- **인덱스 사용률**: 인덱스 효율성 모니터링
- **연결 풀**: 동시 접속자 수 추적

### 정기 유지보수
- **통계 정보 업데이트**: 주간
- **인덱스 재구성**: 월간
- **불필요 데이터 정리**: 분기별

---

## 🔒 데이터 보안

### 암호화
- **전송 중 암호화**: SSL/TLS
- **저장 시 암호화**: AES-256
- **개인정보**: 추가 암호화 레이어

### 접근 제어
- **관리자**: 모든 테이블 읽기/쓰기
- **API**: 제한된 읽기/쓰기
- **공개**: 게시된 콘텐츠만 읽기

### 감사 로그
- **데이터 변경**: 모든 CUD 작업 로깅
- **접근 기록**: 민감한 데이터 접근 추적
- **보안 이벤트**: 비정상적인 접근 알림