# API 설계 문서

## 📋 API 개요
- **API 타입**: RESTful API
- **프레임워크**: Next.js API Routes
- **인증 방식**: JWT (관리자), API Key (외부 연동)
- **응답 형식**: JSON
- **버전**: v1

---

## 🏗️ API 아키텍처

### 베이스 URL
```
개발 환경: http://localhost:3000/api
스테이징: https://staging.jpex.kr/api
프로덕션: https://jpex.kr/api
```

### 응답 형식 표준
```typescript
// 성공 응답
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
}

// 오류 응답
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

// 페이지네이션 응답
interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  timestamp: string;
}
```

---

## 📚 API 엔드포인트

### 1. 프로젝트 (Projects) API

#### GET /api/projects
공개된 프로젝트 목록 조회

**Parameters:**
```typescript
interface ProjectsQuery {
  page?: number;        // 페이지 번호 (기본값: 1)
  limit?: number;       // 페이지당 항목 수 (기본값: 10, 최대: 50)
  category?: 'web' | 'mobile' | 'ai' | 'consulting';
  featured?: boolean;   // 추천 프로젝트만 조회
  search?: string;      // 제목, 설명에서 검색
  sort?: 'newest' | 'oldest' | 'popular' | 'rating';
}
```

**Response:**
```typescript
interface ProjectListItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
  image_url: string;
  client_name?: string;
  client_rating?: number;
  metrics?: Record<string, any>;
  is_featured: boolean;
  view_count: number;
  created_at: string;
}
```

**Example Request:**
```bash
GET /api/projects?category=web&featured=true&limit=6
```

#### GET /api/projects/[slug]
특정 프로젝트 상세 정보 조회

**Response:**
```typescript
interface ProjectDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;          // Markdown 형식
  category: string;
  technologies: string[];
  image_url: string;
  gallery_urls: string[];
  project_url?: string;
  github_url?: string;
  demo_url?: string;
  metrics?: Record<string, any>;
  client_name?: string;
  client_company?: string;
  client_testimonial?: string;
  client_rating?: number;
  project_duration?: string;
  team_size: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}
```

#### POST /api/projects/[id]/view
프로젝트 조회수 증가 (분석용)

**Request Body:**
```typescript
interface ViewRequest {
  user_agent?: string;
  referrer?: string;
  session_id?: string;
}
```

---

### 2. 문의 (Inquiries) API

#### POST /api/contact
일반 문의 제출

**Request Body:**
```typescript
interface ContactRequest {
  name: string;           // 필수
  email: string;          // 필수, 이메일 형식 검증
  phone?: string;
  company?: string;
  project_type?: 'web' | 'mobile' | 'ai' | 'consulting' | 'other';
  subject: string;        // 필수
  message: string;        // 필수, 최소 10자
  budget_range?: string;
  timeline?: string;
  
  // 스팸 방지
  honeypot?: string;      // 비어있어야 함
  captcha_token?: string; // reCAPTCHA 토큰
}
```

**Response:**
```typescript
interface ContactResponse {
  id: string;
  message: string;
  estimated_response_time: string; // "24시간 이내"
}
```

**Validation Rules:**
```typescript
const contactValidation = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    format: 'email'
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 100
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  }
};
```

---

### 3. 견적 요청 (Quotes) API

#### POST /api/quotes
견적 요청 제출

**Request Body:**
```typescript
interface QuoteRequest {
  // 연락처 정보
  name: string;
  email: string;
  phone?: string;
  company?: string;
  
  // 프로젝트 정보
  project_type: 'web' | 'mobile' | 'ai' | 'consulting';
  project_title: string;
  project_description: string;
  project_scope?: 'small' | 'medium' | 'large' | 'enterprise';
  
  // 요구사항
  features: string[];
  integrations?: string[];
  design_preference?: 'minimal' | 'modern' | 'corporate' | 'creative';
  
  // 예산 및 일정
  budget_range?: string;
  timeline?: string;
  start_date?: string;
  deadline?: string;
  
  // 첨부 파일 (업로드된 파일 ID들)
  attachment_ids?: string[];
  
  // 추가 정보
  additional_requirements?: string;
  reference_urls?: string[];
}
```

**Response:**
```typescript
interface QuoteResponse {
  id: string;
  quote_number: string;    // QUO-2024-001
  estimated_response: string;
  next_steps: string[];
  estimated_cost_range?: {
    min: number;
    max: number;
    currency: string;
  };
}
```

#### GET /api/quotes/calculator
실시간 견적 계산기

**Parameters:**
```typescript
interface CalculatorQuery {
  project_type: 'web' | 'mobile' | 'ai' | 'consulting';
  scope: 'small' | 'medium' | 'large' | 'enterprise';
  features: string[];      // 콤마로 구분된 기능 목록
  timeline?: string;       // 'rush', 'normal', 'flexible'
}
```

**Response:**
```typescript
interface EstimateResponse {
  cost_range: {
    min: number;
    max: number;
    currency: string;
  };
  timeline_range: {
    min_weeks: number;
    max_weeks: number;
  };
  breakdown: {
    category: string;
    description: string;
    cost_percentage: number;
  }[];
  disclaimers: string[];
}
```

---

### 4. 블로그 (Blog) API

#### GET /api/blog
블로그 포스트 목록 조회

**Parameters:**
```typescript
interface BlogQuery {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  sort?: 'newest' | 'oldest' | 'popular';
}
```

**Response:**
```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  featured_image?: string;
  read_time: number;       // 예상 읽기 시간 (분)
  view_count: number;
  published_at: string;
}
```

#### GET /api/blog/[slug]
특정 블로그 포스트 조회

**Response:**
```typescript
interface BlogPostDetail {
  id: string;
  title: string;
  slug: string;
  content: string;         // Markdown 형식
  excerpt: string;
  category: string;
  tags: string[];
  featured_image?: string;
  seo_title?: string;
  seo_description?: string;
  read_time: number;
  view_count: number;
  published_at: string;
  updated_at: string;
  
  // 관련 포스트
  related_posts?: BlogPost[];
}
```

---

### 5. 분석 (Analytics) API

#### POST /api/analytics
사용자 행동 분석 데이터 수집

**Request Body:**
```typescript
interface AnalyticsEvent {
  event_type: 'page_view' | 'form_submit' | 'project_view' | 'download' | 'click';
  page_url?: string;
  event_data?: {
    element_id?: string;
    element_text?: string;
    project_id?: string;
    form_type?: string;
    [key: string]: any;
  };
  
  // 자동 수집 데이터
  user_agent?: string;
  referrer?: string;
  session_id?: string;
  timestamp?: string;
}
```

**Response:**
```typescript
interface AnalyticsResponse {
  success: true;
  event_id: string;
}
```

---

### 6. 사이트 설정 (Site Settings) API

#### GET /api/settings
공개 사이트 설정 조회

**Response:**
```typescript
interface SiteSettings {
  site_title: string;
  site_description: string;
  contact_email: string;
  business_hours: Record<string, string>;
  availability_status: 'available' | 'busy' | 'unavailable';
  current_projects: number;
  max_projects: number;
  response_time: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}
```

---

### 7. 파일 업로드 API

#### POST /api/upload
파일 업로드 (견적 요청용 첨부파일)

**Request:**
- Content-Type: multipart/form-data
- 최대 파일 크기: 10MB
- 허용 형식: PDF, DOC, DOCX, JPG, PNG, ZIP

**Response:**
```typescript
interface UploadResponse {
  file_id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  upload_url: string;
  expires_at: string;      // 24시간 후 만료
}
```

---

## 🔐 인증 및 권한

### 관리자 인증 (Admin)
```typescript
// JWT 토큰 기반 인증
interface AdminAuthHeader {
  Authorization: `Bearer ${jwt_token}`;
}

// 보호된 엔드포인트 예시
// GET /api/admin/inquiries    - 문의 목록 관리
// PUT /api/admin/projects     - 프로젝트 수정
// DELETE /api/admin/spam      - 스팸 삭제
```

### API Rate Limiting
```typescript
// 일반 사용자 제한
const rateLimits = {
  '/api/contact': {
    max: 5,           // 5회
    window: 3600,     // 1시간
  },
  '/api/quotes': {
    max: 3,           // 3회
    window: 3600,     // 1시간
  },
  '/api/analytics': {
    max: 100,         // 100회
    window: 3600,     // 1시간
  },
  default: {
    max: 60,          // 60회
    window: 3600,     // 1시간
  }
};
```

---

## 🛡️ 보안 및 검증

### 입력값 검증
```typescript
import { z } from 'zod';

// 문의 폼 스키마
const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().max(100).optional(),
  project_type: z.enum(['web', 'mobile', 'ai', 'consulting', 'other']).optional(),
  subject: z.string().min(5).max(100),
  message: z.string().min(10).max(1000),
  budget_range: z.string().optional(),
  timeline: z.string().optional(),
  honeypot: z.string().max(0), // 스팸 방지
});
```

### CORS 설정
```typescript
const corsOptions = {
  origin: [
    'https://jpex.kr',
    'https://www.jpex.kr',
    'https://staging.jpex.kr',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
```

### 스팸 방지
```typescript
// Honeypot 필드
// reCAPTCHA v3 통합
// IP 기반 속도 제한
// 이메일 도메인 검증
// 욕설/스팸 단어 필터링
```

---

## 📧 이메일 알림 시스템

### 문의 접수 알림
```typescript
interface ContactNotification {
  to: 'admin@jpex.kr';
  subject: `새로운 문의: ${subject}`;
  template: 'contact-notification';
  data: {
    name: string;
    email: string;
    company?: string;
    project_type?: string;
    subject: string;
    message: string;
    submitted_at: string;
    admin_url: string;
  };
}
```

### 견적 요청 알림
```typescript
interface QuoteNotification {
  to: 'admin@jpex.kr';
  subject: `견적 요청: ${project_title}`;
  template: 'quote-notification';
  data: {
    quote_number: string;
    name: string;
    email: string;
    project_type: string;
    project_title: string;
    budget_range?: string;
    timeline?: string;
    admin_url: string;
  };
}
```

### 자동 응답 이메일
```typescript
interface AutoReplyEmail {
  to: string; // 문의자 이메일
  subject: '문의 접수 확인 - JPEX';
  template: 'contact-auto-reply';
  data: {
    name: string;
    inquiry_id: string;
    expected_response_time: string;
    contact_info: {
      email: string;
      phone?: string;
    };
  };
}
```

---

## 📊 에러 코드 정의

### 표준 에러 코드
```typescript
enum ApiErrorCode {
  // 일반 오류 (1000-1999)
  INVALID_REQUEST = 'E1001',
  MISSING_REQUIRED_FIELD = 'E1002',
  INVALID_FIELD_FORMAT = 'E1003',
  REQUEST_TOO_LARGE = 'E1004',
  
  // 인증/권한 오류 (2000-2999)
  UNAUTHORIZED = 'E2001',
  FORBIDDEN = 'E2002',
  TOKEN_EXPIRED = 'E2003',
  INVALID_TOKEN = 'E2004',
  
  // 속도 제한 (3000-3999)
  RATE_LIMIT_EXCEEDED = 'E3001',
  TOO_MANY_REQUESTS = 'E3002',
  
  // 리소스 오류 (4000-4999)
  RESOURCE_NOT_FOUND = 'E4001',
  RESOURCE_ALREADY_EXISTS = 'E4002',
  
  // 파일 업로드 오류 (5000-5999)
  FILE_TOO_LARGE = 'E5001',
  INVALID_FILE_TYPE = 'E5002',
  UPLOAD_FAILED = 'E5003',
  
  // 외부 서비스 오류 (6000-6999)
  EMAIL_SEND_FAILED = 'E6001',
  CAPTCHA_VERIFICATION_FAILED = 'E6002',
  
  // 서버 오류 (9000-9999)
  INTERNAL_SERVER_ERROR = 'E9001',
  DATABASE_ERROR = 'E9002',
  SERVICE_UNAVAILABLE = 'E9003',
}
```

### 에러 응답 예시
```typescript
// 400 Bad Request
{
  "success": false,
  "error": {
    "code": "E1002",
    "message": "필수 필드가 누락되었습니다.",
    "details": {
      "missing_fields": ["name", "email"]
    }
  },
  "timestamp": "2024-03-15T10:30:00Z"
}

// 429 Too Many Requests
{
  "success": false,
  "error": {
    "code": "E3001",
    "message": "요청 한도를 초과했습니다. 1시간 후 다시 시도해주세요.",
    "details": {
      "retry_after": 3600,
      "limit": 5,
      "window": 3600
    }
  },
  "timestamp": "2024-03-15T10:30:00Z"
}
```

---

## 🧪 API 테스트

### 단위 테스트 예시
```typescript
// __tests__/api/contact.test.ts
import { createMocks } from 'node-mocks-http';
import contactHandler from '@/pages/api/contact';

describe('/api/contact', () => {
  it('should create a new contact inquiry', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Website Development',
        message: 'I need help with my website.'
      }
    });

    await contactHandler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data.id).toBeDefined();
  });
  
  it('should reject invalid email', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test',
        message: 'Test message'
      }
    });

    await contactHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(false);
    expect(data.error.code).toBe('E1003');
  });
});
```

---

## 📚 API 문서화

### OpenAPI/Swagger 스펙
```yaml
openapi: 3.0.0
info:
  title: JPEX API
  version: 1.0.0
  description: 프리랜싱 웹사이트 API

paths:
  /api/projects:
    get:
      summary: 프로젝트 목록 조회
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 10
            maximum: 50
      responses:
        '200':
          description: 성공
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProjectListResponse'
```

### Postman Collection
```json
{
  "info": {
    "name": "JPEX API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Projects",
      "item": [
        {
          "name": "Get Projects",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/projects?limit=10&category=web",
              "host": ["{{baseUrl}}"],
              "path": ["api", "projects"],
              "query": [
                {"key": "limit", "value": "10"},
                {"key": "category", "value": "web"}
              ]
            }
          }
        }
      ]
    }
  ]
}
```

이 API 설계는 RESTful 원칙을 따르며, 확장 가능하고 안전한 구조로 설계되어 JPEX 웹사이트의 모든 기능을 지원합니다.