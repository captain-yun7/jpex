# 프리랜싱 웹사이트 설계 문서

## 프로젝트 개요
개인 프리랜서를 위한 회사 소개 및 포트폴리오 웹사이트 개발

### 주요 비즈니스
- 웹/앱 서비스 주문 제작
- AI 서비스 (챗봇 등) 주문 제작
- 포트폴리오 및 실적 소개

### 기술 스택
- **Frontend**: Next.js (React 기반)
- **Backend**: Next.js API Routes
- **Database**: Supabase (필요시)
- **배포**: Vercel (권장)

## 1. 요구사항 분석

### 1.1 기본 요구사항
- [x] 반응형 웹 디자인 (모바일, 태블릿, 데스크톱)
- [x] SEO 최적화 (검색 엔진 노출을 위한)
- [x] 빠른 로딩 속도
- [x] 전문적이고 신뢰할 수 있는 디자인

### 1.2 기능 요구사항
- [x] 회사/개인 소개
- [x] 서비스 소개 (웹/앱, AI 서비스)
- [x] 포트폴리오 갤러리
- [x] 연락처 및 문의 기능
- [x] 블로그/뉴스 (선택사항)
- [x] 고객 후기/추천서
- [x] 서비스 견적 요청 기능

## 2. 사이트 구조 설계

### 2.1 페이지 구조
```
/
├── / (홈페이지)
├── /about (회사/개인 소개)
├── /services (서비스 소개)
│   ├── /services/web-development
│   └── /services/ai-solutions
├── /portfolio (포트폴리오)
│   └── /portfolio/[id] (개별 프로젝트 상세)
├── /contact (연락처/문의)
├── /quote (견적 요청)
├── /blog (블로그 - 선택사항)
│   └── /blog/[slug]
└── /admin (관리자 페이지 - 선택사항)
```

### 2.2 네비게이션 구조
```
- Home
- About
- Services
  - Web & App Development
  - AI Solutions
- Portfolio
- Contact
- Get Quote
```

## 3. 주요 페이지별 상세 설계

### 3.1 홈페이지 (/)
- **Hero Section**: 임팩트 있는 메인 메시지
- **서비스 요약**: 웹/앱, AI 서비스 간단 소개
- **포트폴리오 미리보기**: 주요 프로젝트 3-4개
- **고객 후기**: 신뢰도 향상
- **CTA (Call to Action)**: 연락하기, 견적 요청

### 3.2 회사 소개 (/about)
- **개인/회사 스토리**
- **전문 분야 및 경험**
- **미션 & 비전**
- **핵심 역량**
- **팀 소개** (현재는 개인이지만 확장 고려)

### 3.3 서비스 페이지 (/services)
#### 웹/앱 개발 서비스
- 서비스 상세 설명
- 개발 프로세스
- 기술 스택
- 가격 범위 (선택사항)
- 관련 포트폴리오

#### AI 솔루션
- AI 서비스 종류 (챗봇, 자동화 등)
- 구현 방식
- 성공 사례
- 기대 효과

### 3.4 포트폴리오 (/portfolio)
- **필터링 기능**: 웹/앱, AI 서비스별
- **프로젝트 카드**: 썸네일, 제목, 간단 설명, 기술 스택
- **프로젝트 상세**: 배경, 해결 과정, 결과, 사용 기술

### 3.5 연락처 (/contact)
- **연락 정보**: 이메일, 전화, 위치 (필요시)
- **문의 폼**: 이름, 이메일, 프로젝트 유형, 메시지
- **소셜 미디어 링크**
- **응답 시간 안내**

### 3.6 견적 요청 (/quote)
- **프로젝트 유형 선택**: 웹/앱, AI 서비스
- **상세 요구사항 입력**: 규모, 기능, 예산, 일정
- **첨부 파일 업로드**: 기획서, 참고 자료
- **연락처 정보**

## 4. 데이터베이스 설계 (Supabase)

### 4.1 필요한 테이블
```sql
-- 포트폴리오 프로젝트
projects (
  id: uuid PRIMARY KEY,
  title: text,
  description: text,
  content: text, -- 상세 내용 (Markdown)
  category: text, -- 'web' | 'ai'
  technologies: text[], -- 사용 기술 배열
  image_url: text,
  project_url: text,
  github_url: text,
  created_at: timestamp,
  updated_at: timestamp,
  is_featured: boolean -- 홈페이지 노출 여부
)

-- 문의사항
inquiries (
  id: uuid PRIMARY KEY,
  name: text,
  email: text,
  phone: text,
  project_type: text,
  message: text,
  status: text, -- 'new' | 'in_progress' | 'completed'
  created_at: timestamp
)

-- 견적 요청
quotes (
  id: uuid PRIMARY KEY,
  name: text,
  email: text,
  company: text,
  project_type: text,
  project_scope: text,
  budget_range: text,
  timeline: text,
  requirements: text,
  attachments: text[], -- 파일 URL 배열
  status: text,
  created_at: timestamp
)

-- 블로그 포스트 (선택사항)
blog_posts (
  id: uuid PRIMARY KEY,
  title: text,
  slug: text UNIQUE,
  content: text,
  excerpt: text,
  published: boolean,
  created_at: timestamp,
  updated_at: timestamp
)
```

## 5. 기술적 구현 방향

### 5.1 Next.js 프로젝트 구조
```
src/
├── components/
│   ├── ui/ (재사용 가능한 UI 컴포넌트)
│   ├── sections/ (페이지별 섹션 컴포넌트)
│   └── layout/ (헤더, 푸터, 네비게이션)
├── pages/ 또는 app/ (Next.js 13+ App Router)
├── styles/
├── lib/
│   ├── supabase.js (DB 연결)
│   └── utils.js
├── hooks/ (커스텀 React 훅)
└── types/ (TypeScript 타입 정의)
```

### 5.2 주요 라이브러리 고려사항
- **UI 프레임워크**: Tailwind CSS + Headless UI
- **폼 처리**: React Hook Form + Zod (유효성 검사)
- **이미지 최적화**: Next.js Image 컴포넌트
- **애니메이션**: Framer Motion
- **아이콘**: Lucide React 또는 Heroicons
- **메타데이터**: Next.js Metadata API (SEO)

### 5.3 성능 최적화
- 이미지 최적화 및 lazy loading
- 코드 스플리팅
- CDN 활용 (Vercel 기본 제공)
- 캐싱 전략

## 6. UI/UX 설계 방향

### 6.1 디자인 철학
- **미니멀하고 전문적인** 디자인
- **신뢰감을 주는** 색상 및 레이아웃
- **명확한 정보 전달**
- **직관적인 네비게이션**

### 6.2 색상 팔레트 (제안)
- **Primary**: Blue (#3B82F6) - 신뢰감, 전문성
- **Secondary**: Gray (#6B7280) - 중성적, 깔끔함
- **Accent**: Green (#10B981) - 성공, 성장
- **Background**: White/Light Gray

### 6.3 타이포그래피
- **헤딩**: 굵고 임팩트 있는 폰트 (Inter, Poppins)
- **본문**: 가독성 좋은 폰트 (Inter, Open Sans)
- **코드**: Monospace 폰트 (Fira Code, JetBrains Mono)

### 6.4 레이아웃 패턴
- **카드 기반** 디자인 (포트폴리오, 서비스)
- **그리드 시스템** 활용
- **적절한 화이트스페이스**

## 7. 개발 단계별 계획

### Phase 1: 기본 구조 및 정적 페이지
1. Next.js 프로젝트 설정
2. 기본 레이아웃 및 네비게이션
3. 홈페이지 구현
4. About, Services 페이지 구현

### Phase 2: 동적 기능 구현
1. Supabase 설정 및 연동
2. 포트폴리오 시스템 구현
3. 문의 폼 구현
4. 견적 요청 시스템

### Phase 3: 고급 기능 및 최적화
1. 관리자 페이지 (포트폴리오 관리)
2. 블로그 시스템 (선택사항)
3. SEO 최적화
4. 성능 최적화

### Phase 4: 배포 및 운영
1. Vercel 배포
2. 도메인 연결
3. 분석 도구 연동 (Google Analytics)
4. 모니터링 설정

## 8. 추후 확장 고려사항

- **다국어 지원** (i18n)
- **고객 포털** (프로젝트 진행 상황 확인)
- **온라인 결제** 시스템
- **실시간 채팅** 지원
- **고객 관리 시스템** (CRM)

---

이 설계 문서를 바탕으로 단계별로 개발을 진행할 수 있습니다. 어떤 부분부터 시작하고 싶으시거나 수정하고 싶은 부분이 있으시면 알려주세요.