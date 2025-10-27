# Neon Postgres 데이터베이스 설정 가이드

JPEX 견적 문의 시스템을 Neon Postgres 데이터베이스와 연결하는 방법입니다.

---

## 1. Neon 프로젝트 생성

### 1.1 Neon 계정 생성
1. [Neon 웹사이트](https://neon.tech/)에 접속
2. **Sign Up** 버튼 클릭 (GitHub 계정으로 간편 가입 가능)
3. 무료 플랜으로 시작 가능

### 1.2 새 프로젝트 생성
1. Neon 대시보드에서 **New Project** 클릭
2. 프로젝트 정보 입력:
   - **Project name**: `jpex-database` (원하는 이름)
   - **Region**: `Asia Pacific (Singapore)` 또는 가까운 지역 선택
   - **Postgres version**: 최신 버전 선택 (16 권장)
3. **Create Project** 클릭

---

## 2. 데이터베이스 연결 URL 가져오기

프로젝트 생성 후 **Connection String**을 복사합니다:

```
postgresql://[user]:[password]@[endpoint]/[database]?sslmode=require
```

예시:
```
postgresql://jpex_user:AbCdEf123456@ep-cool-cloud-123456.ap-southeast-1.aws.neon.tech/jpexdb?sslmode=require
```

---

## 3. 환경 변수 설정

### 3.1 로컬 개발 환경

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# .env.local
DATABASE_URL=postgresql://[your-connection-string]
```

**주의**: `.env.local` 파일은 Git에 커밋하지 않습니다. (이미 `.gitignore`에 추가되어 있음)

### 3.2 Vercel 배포 환경

1. Vercel 프로젝트 설정 페이지로 이동
2. **Settings** > **Environment Variables**
3. 다음 변수 추가:
   - **Name**: `DATABASE_URL`
   - **Value**: Neon 연결 문자열
   - **Environment**: Production, Preview, Development 모두 체크
4. **Save** 클릭

---

## 4. 데이터베이스 테이블 생성

### 4.1 Neon SQL Editor 사용

1. Neon 대시보드에서 **SQL Editor** 클릭
2. `/db/schema.sql` 파일의 내용을 복사해서 붙여넣기
3. **Run** 버튼 클릭

### 4.2 또는 로컬에서 실행

```bash
# psql 클라이언트가 설치되어 있다면
psql "postgresql://[your-connection-string]" -f db/schema.sql
```

### 4.3 테이블 생성 확인

SQL Editor에서 다음 쿼리 실행:

```sql
SELECT * FROM quotes LIMIT 1;
```

에러 없이 실행되면 성공!

---

## 5. 애플리케이션 실행

### 5.1 개발 서버 시작

```bash
npm run dev
```

### 5.2 견적 문의 테스트

1. 브라우저에서 `http://localhost:3000/quote` 접속
2. 견적 문의 폼 작성:
   - 이름 입력
   - 이메일 입력
   - 프로젝트 유형 선택
   - 개인정보 동의 체크
3. **무료 견적 받기** 버튼 클릭
4. 성공 메시지 확인

### 5.3 데이터베이스 확인

Neon SQL Editor에서:

```sql
SELECT * FROM quotes ORDER BY created_at DESC;
```

방금 입력한 데이터가 표시되면 성공!

---

## 6. 문제 해결 (Troubleshooting)

### 에러: "DATABASE_URL 환경 변수가 설정되지 않았습니다"

**원인**: `.env.local` 파일이 없거나 `DATABASE_URL`이 설정되지 않음

**해결**:
1. `.env.local` 파일 확인
2. `DATABASE_URL=...` 올바르게 입력되었는지 확인
3. 개발 서버 재시작 (`npm run dev`)

### 에러: "connection refused" 또는 "timeout"

**원인**: Neon 연결 문자열이 잘못되었거나 네트워크 문제

**해결**:
1. Neon 대시보드에서 연결 문자열 다시 복사
2. `?sslmode=require` 파라미터가 포함되어 있는지 확인
3. 방화벽 설정 확인

### 에러: "relation 'quotes' does not exist"

**원인**: 테이블이 생성되지 않음

**해결**:
1. `db/schema.sql` 파일을 Neon SQL Editor에서 실행
2. 또는 psql로 직접 실행

---

## 7. Neon 무료 플랜 제한

Neon 무료 플랜 제한사항:
- **Storage**: 3 GB
- **Connections**: 동시 접속 100개
- **Projects**: 1개

**충분한 제한**: JPEX 견적 문의 시스템은 무료 플랜으로 충분합니다.

---

## 8. 관리자용: 견적 문의 조회

### 8.1 모든 견적 조회

```sql
SELECT
  id,
  name,
  email,
  company,
  project_type,
  status,
  created_at
FROM quotes
ORDER BY created_at DESC;
```

### 8.2 특정 상태 조회

```sql
-- 대기 중인 견적
SELECT * FROM quotes WHERE status = 'pending';

-- 진행 중인 견적
SELECT * FROM quotes WHERE status = 'in_progress';

-- 완료된 견적
SELECT * FROM quotes WHERE status = 'completed';
```

### 8.3 견적 상태 변경

```sql
UPDATE quotes
SET status = 'in_progress'
WHERE id = 'your-quote-id-here';
```

---

## 9. 백업 및 복구

### 9.1 데이터 백업

Neon 대시보드에서:
1. **Settings** > **Backups**
2. **Create Backup** 클릭

또는 SQL로 내보내기:

```bash
pg_dump "postgresql://[your-connection-string]" > backup.sql
```

### 9.2 데이터 복구

```bash
psql "postgresql://[your-connection-string]" < backup.sql
```

---

## 10. 다음 단계

- [ ] 관리자 페이지 구현 (견적 목록 보기)
- [ ] 이메일 알림 기능 추가
- [ ] 견적 상태 업데이트 기능
- [ ] 파일 첨부 기능 (예: 포트폴리오, 참고 자료)

---

## 참고 자료

- [Neon 공식 문서](https://neon.tech/docs)
- [Neon + Next.js 가이드](https://neon.tech/docs/guides/nextjs)
- [Neon Serverless Driver](https://github.com/neondatabase/serverless)

---

**작성일**: 2025-10-27
**버전**: 1.0
