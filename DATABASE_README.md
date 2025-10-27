# 데이터베이스 설정 완료

Neon Postgres 데이터베이스 연동이 완료되었습니다!

## 설치된 패키지

- `@neondatabase/serverless`: Neon Postgres 서버리스 드라이버

## 생성된 파일

### 1. 데이터베이스 연결
- [src/lib/db.ts](src/lib/db.ts): Neon 연결 및 CRUD 함수

### 2. 데이터베이스 스키마
- [db/schema.sql](db/schema.sql): 테이블 생성 SQL

### 3. API 라우트
- [src/app/api/quote/route.ts](src/app/api/quote/route.ts): 견적 생성 API (POST)
- [src/app/api/quote/[id]/route.ts](src/app/api/quote/[id]/route.ts): 견적 조회 API (GET)

### 4. 환경 변수
- [.env.example](.env.example): 환경 변수 예시
- `.env.local` (생성 필요): 실제 DATABASE_URL 설정

### 5. 설정 가이드
- [NEON_SETUP.md](NEON_SETUP.md): 상세 설정 가이드

---

## 다음 단계

### 1. Neon 프로젝트 생성
[https://neon.tech/](https://neon.tech/)에서 프로젝트 생성

### 2. 환경 변수 설정
```bash
# .env.local 파일 생성
DATABASE_URL=postgresql://[user]:[password]@[endpoint]/[database]?sslmode=require
```

### 3. 테이블 생성
Neon SQL Editor에서 `db/schema.sql` 실행

### 4. 개발 서버 실행
```bash
npm run dev
```

### 5. 테스트
[http://localhost:3000/quote](http://localhost:3000/quote)에서 견적 문의 작성

---

## 테이블 구조

```sql
quotes (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  project_type VARCHAR(100) NOT NULL,
  budget_range VARCHAR(100),
  timeline VARCHAR(100),
  requirements TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

---

## API 엔드포인트

### POST /api/quote
견적 문의 생성

**요청 Body:**
```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "phone": "010-1234-5678",
  "company": "㈜예시회사",
  "projectType": "web",
  "budget": "300만원 - 500만원",
  "timeline": "1개월 이내",
  "description": "온라인 쇼핑몰 개발 요청합니다."
}
```

**응답:**
```json
{
  "message": "견적 요청이 성공적으로 접수되었습니다.",
  "data": {
    "id": "uuid",
    "name": "홍길동",
    "email": "hong@example.com",
    ...
  }
}
```

### GET /api/quote/[id]
견적 문의 조회

**응답:**
```json
{
  "id": "uuid",
  "name": "홍길동",
  "email": "hong@example.com",
  "project_type": "web",
  "status": "pending",
  "created_at": "2025-10-27T...",
  ...
}
```

---

자세한 내용은 [NEON_SETUP.md](NEON_SETUP.md)를 참고하세요.
