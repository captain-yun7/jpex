# 🚀 Supabase 설정 가이드

## ✅ 완료된 사항
- ✅ Supabase 프로젝트 생성
- ✅ 환경변수 설정 (.env.local)
- ✅ Next.js 클라이언트 연동

## 📝 필요한 작업: 테이블 생성

### 1. Supabase 대시보드 접속
1. https://supabase.com/dashboard 접속
2. 프로젝트 선택

### 2. SQL Editor에서 테이블 생성
1. 왼쪽 메뉴에서 **SQL Editor** 클릭
2. **New query** 클릭
3. 아래 SQL 전체를 복사하여 붙여넣기
4. **Run** 버튼 클릭

```sql
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
    content TEXT,
    category TEXT NOT NULL CHECK (category IN ('web', 'ai', 'consulting')),
    technologies TEXT[] NOT NULL,
    image_url TEXT,
    gallery_urls TEXT[],
    project_url TEXT,
    github_url TEXT,
    metrics JSONB,
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

-- 공개 읽기 정책
CREATE POLICY "Projects are viewable by everyone" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Testimonials are viewable by everyone" ON testimonials
    FOR SELECT USING (true);

-- 문의와 견적은 누구나 생성 가능
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
```

### 3. RLS(Row Level Security) 비활성화 (중요!)
1. **Table Editor**로 이동
2. `inquiries` 테이블 클릭
3. 우측 상단의 **RLS disabled** 토글 확인 (비활성화 상태여야 함)
4. 만약 **RLS enabled**라면 클릭하여 비활성화
5. `quotes` 테이블도 동일하게 RLS 비활성화

또는 SQL Editor에서 다음 실행:
```sql
-- RLS 비활성화 (개발 단계에서만)
ALTER TABLE inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE quotes DISABLE ROW LEVEL SECURITY;
```

### 4. 테이블 생성 확인
1. 왼쪽 메뉴에서 **Table Editor** 클릭
2. 다음 테이블들이 생성되었는지 확인:
   - inquiries
   - quotes
   - projects
   - testimonials

## 🧪 테스트 순서

### 1. 연결 테스트
```bash
curl http://localhost:3000/api/test-connection
```
성공 시: `{"success":true,"message":"Supabase 연결 성공!",...}`

### 2. Contact 폼 테스트
1. http://localhost:3000/contact 접속
2. 폼 작성 후 제출
3. Supabase 대시보드 > Table Editor > inquiries 테이블 확인

### 3. Quote 폼 테스트
1. http://localhost:3000/quote 접속
2. 6단계 폼 완료 후 제출
3. Supabase 대시보드 > Table Editor > quotes 테이블 확인

### 4. 관리자 페이지 테스트
1. http://localhost:3000/admin 접속
2. 제출된 문의사항과 견적 요청 확인

## 🔍 디버깅 팁

### 에러: "Could not find the table"
→ SQL Editor에서 테이블 생성 스크립트 실행

### 에러: "permission denied"
→ RLS 정책 확인, 위 스크립트의 POLICY 부분 재실행

### 에러: "Invalid API key"
→ .env.local의 SUPABASE_ANON_KEY 확인

## 📊 Supabase 대시보드 주요 기능

- **Table Editor**: 데이터 직접 조회/편집
- **SQL Editor**: SQL 쿼리 실행
- **Authentication**: 사용자 관리 (Phase 3)
- **Storage**: 파일 업로드 (Phase 3)
- **Realtime**: 실시간 구독 (Phase 3)

## ✅ 체크리스트

- [ ] Supabase 프로젝트 생성
- [ ] 환경변수 설정
- [ ] 테이블 생성 (SQL 실행)
- [ ] 연결 테스트 성공
- [ ] Contact 폼 제출 테스트
- [ ] Quote 폼 제출 테스트
- [ ] 관리자 페이지 데이터 조회

모든 항목을 완료하면 백엔드 연동이 완성됩니다!