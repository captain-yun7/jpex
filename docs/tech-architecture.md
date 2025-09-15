# 기술 아키텍처 문서

## 📋 프로젝트 기본 정보
- **프로젝트명**: JPEX (프리랜싱 웹사이트)
- **버전**: v1.0.0
- **작성일**: 2025-09-15
- **업데이트**: -

---

## 🎯 기술 스택 개요

### Frontend
- **Framework**: Next.js 14+ (App Router)
  - React 18+ 기반 풀스택 프레임워크
  - SSR/SSG/ISR 지원으로 SEO 최적화
  - 빠른 개발과 배포 가능

- **언어**: TypeScript
  - 타입 안정성 확보
  - 개발 생산성 향상
  - 런타임 오류 사전 방지

- **스타일링**: Tailwind CSS + Custom CSS
  - 유틸리티 퍼스트 CSS 프레임워크
  - 빠른 UI 개발
  - 카카오 개발자 스타일 기반 커스텀 컴포넌트

- **상태 관리**: Zustand (필요시)
  - 간단하고 직관적인 전역 상태 관리
  - 타입스크립트 친화적

### Backend
- **API**: Next.js API Routes
  - 서버리스 함수로 구현
  - 백엔드와 프론트엔드 통합 개발
  - Vercel 최적화

- **인증**: NextAuth.js (관리자용)
  - 관리자 로그인 기능
  - 다양한 인증 제공자 지원

### Database
- **Primary DB**: Supabase (PostgreSQL)
  - 관리형 PostgreSQL 서비스
  - 실시간 기능 지원
  - Row Level Security (RLS)
  - 자동 API 생성

- **파일 저장소**: Supabase Storage
  - 이미지 및 첨부파일 저장
  - CDN 기능 내장

### 배포 및 호스팅
- **플랫폼**: Vercel
  - Next.js 최적화 플랫폼
  - 자동 배포 및 프리뷰
  - 글로벌 CDN

- **도메인**: 커스텀 도메인 연결
- **SSL**: 자동 HTTPS 인증서

---

## 🏗️ 시스템 아키텍처

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (Supabase)    │
│                 │    │                 │    │                 │
│ • React Pages   │    │ • REST API      │    │ • PostgreSQL    │
│ • Components    │    │ • Form Handler  │    │ • File Storage  │
│ • Tailwind CSS  │    │ • Email Service │    │ • Auth System   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│     Vercel      │◄─────────────┘
                        │   (Hosting)     │
                        │ • CDN           │
                        │ • SSL           │
                        │ • Auto Deploy   │
                        └─────────────────┘
```

---

## 📂 프로젝트 구조

```
jpex/
├── src/
│   ├── app/                      # App Router (Next.js 14+)
│   │   ├── (pages)/             # 페이지 그룹
│   │   │   ├── page.tsx         # 홈페이지
│   │   │   ├── about/           # 회사 소개
│   │   │   ├── services/        # 서비스
│   │   │   ├── portfolio/       # 포트폴리오
│   │   │   ├── contact/         # 연락처
│   │   │   ├── quote/           # 견적 요청
│   │   │   └── blog/            # 블로그 (선택)
│   │   ├── api/                 # API Routes
│   │   │   ├── contact/         # 문의 폼 API
│   │   │   ├── quote/           # 견적 요청 API
│   │   │   ├── projects/        # 포트폴리오 API
│   │   │   └── admin/           # 관리자 API
│   │   ├── globals.css          # 글로벌 스타일
│   │   ├── layout.tsx           # 루트 레이아웃
│   │   └── loading.tsx          # 로딩 컴포넌트
│   ├── components/              # 재사용 컴포넌트
│   │   ├── layout/              # 레이아웃 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── ui/                  # UI 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Form.tsx
│   │   ├── sections/            # 페이지 섹션
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   └── Contact.tsx
│   │   └── common/              # 공통 컴포넌트
│   │       ├── Loading.tsx
│   │       ├── Error.tsx
│   │       └── SEO.tsx
│   ├── lib/                     # 유틸리티 및 설정
│   │   ├── supabase.ts          # Supabase 클라이언트
│   │   ├── validation.ts        # 폼 검증
│   │   ├── email.ts             # 이메일 서비스
│   │   └── utils.ts             # 공통 유틸리티
│   ├── types/                   # TypeScript 타입 정의
│   │   ├── index.ts
│   │   ├── database.ts
│   │   └── api.ts
│   └── styles/                  # 스타일 파일
│       ├── globals.css
│       └── components.css
├── public/                      # 정적 파일
│   ├── images/
│   ├── icons/
│   └── documents/
├── docs/                        # 문서화
├── plan/                        # 기획 문서
└── config files                 # 설정 파일
    ├── next.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    └── package.json
```

---

## 🔧 개발 환경 설정

### 필수 도구
- **Node.js**: v18.0.0 이상
- **npm/yarn**: 최신 버전
- **Git**: 버전 관리
- **VS Code**: 권장 에디터

### 환경 변수
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth (관리자용)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# 이메일 서비스
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# 기타
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 의존성 패키지
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "next-auth": "^4.0.0",
    "tailwindcss": "^3.0.0",
    "framer-motion": "^10.0.0",
    "react-hook-form": "^7.0.0",
    "zod": "^3.0.0",
    "nodemailer": "^6.0.0",
    "sharp": "^0.32.0"
  }
}
```

---

## 🚀 성능 최적화 전략

### 이미지 최적화
- Next.js Image 컴포넌트 사용
- WebP 포맷 우선 지원
- 지연 로딩 (Lazy Loading)
- 반응형 이미지 제공

### 코드 분할
- 페이지별 자동 코드 분할
- 동적 import 사용
- 컴포넌트 지연 로딩

### 캐싱 전략
- Vercel Edge Cache 활용
- SWR/React Query로 클라이언트 캐싱
- 정적 파일 캐싱

### SEO 최적화
- 서버 사이드 렌더링 (SSR)
- 정적 생성 (SSG) for 블로그
- 메타 태그 최적화
- 구조화된 데이터 (Schema.org)

---

## 🔒 보안 고려사항

### 데이터 보안
- Row Level Security (RLS) 적용
- SQL 인젝션 방지
- XSS 공격 방지
- CSRF 토큰 사용

### 인증 및 권한
- 관리자 전용 페이지 보호
- API 라우트 권한 검증
- 민감한 정보 환경변수 분리

### HTTPS 및 통신 보안
- 모든 통신 HTTPS 암호화
- 보안 헤더 설정
- CORS 정책 적용

---

## 📊 모니터링 및 분석

### 성능 모니터링
- Vercel Analytics
- Core Web Vitals 추적
- Error Boundary 구현

### 비즈니스 분석
- Google Analytics 4
- 문의 폼 전환율 추적
- 사용자 행동 분석

### 로깅
- Vercel Functions 로그
- 에러 추적 및 알림
- 성능 지표 모니터링

---

## 🔄 CI/CD 파이프라인

### 자동 배포
1. GitHub 저장소에 코드 푸시
2. Vercel 자동 빌드 및 배포
3. 프리뷰 URL 생성 (PR용)
4. 프로덕션 배포 (main 브랜치)

### 품질 관리
- TypeScript 타입 체크
- ESLint 코드 품질 검사
- Prettier 코드 포맷팅
- 자동 테스트 실행

### 백업 및 복구
- Supabase 자동 백업
- 환경 변수 백업
- 코드 버전 관리

---

## 📝 향후 확장 계획

### 기술적 개선
- PWA 변환
- 다국어 지원 (i18n)
- 다크 모드 구현
- 검색 기능 추가

### 새로운 기능
- 실시간 채팅 (Socket.io)
- 파일 업로드 시스템
- 결제 시스템 연동
- 모바일 앱 개발

### 성능 향상
- Edge 함수 활용
- CDN 최적화
- 데이터베이스 쿼리 최적화
- 캐싱 전략 고도화