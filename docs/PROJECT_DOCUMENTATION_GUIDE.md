# 📚 JPEX 프로젝트 문서 가이드

## 🎯 문서 계층구조 및 역할

이 가이드는 프로젝트의 모든 문서를 정리하고, **어떤 순서로 어떤 문서를 참조해야 하는지** 명확히 합니다.

---

## 📋 1단계: 핵심 기획 문서 (plan/)

### 🔥 **주 참조 문서** - 이것부터 보세요!

#### 1. `/plan/requirements-specification.md` ⭐⭐⭐
- **역할**: 전체 프로젝트의 **마스터 요구사항 명세서**
- **내용**: 페이지 구조, 기능 명세, 비즈니스 요구사항
- **사용법**: 개발 전 반드시 확인, 모든 개발은 이 문서 기준

#### 2. `/plan/freelance-website-design.md`
- **역할**: 디자인 컨셉 및 방향성
- **내용**: 카카오 개발자 스타일 분석, UI/UX 가이드
- **사용법**: 디자인 결정 시 참조

#### 3. `/plan/templates/` (참조용)
- **kakao-dev-style.html**: 카카오 개발자 스타일 HTML 템플릿
- **template1-3.html**: 기타 디자인 옵션들
- **사용법**: 스타일링 작업 시 참조

---

## 📝 2단계: 개발 계획 문서 (docs/)

### 🏗️ **개발 진행 시 참조 문서들**

#### 4. `/docs/development-plan.md`
- **역할**: 단계별 개발 계획 (Phase 1~4)
- **내용**: 우선순위, 일정, 마일스톤
- **사용법**: 다음 개발할 기능 확인

#### 5. `/docs/tech-architecture.md`
- **역할**: 기술 스택 및 아키텍처 설계
- **내용**: Next.js, TypeScript, Tailwind 설정
- **사용법**: 기술적 의사결정 시 참조

#### 6. `/docs/api-design.md`
- **역할**: API 설계 (Phase 2용)
- **내용**: 백엔드 API 스펙
- **사용법**: 백엔드 개발 시 참조

#### 7. `/docs/database-design.md`
- **역할**: 데이터베이스 설계 (Phase 2용)
- **내용**: Supabase 테이블 스키마
- **사용법**: DB 구축 시 참조

---

## 📊 3단계: 진행상황 문서 (docs/)

### 📈 **개발 현황 추적 문서들**

#### 8. `/docs/IMPLEMENTATION.md` ⭐⭐
- **역할**: 전체 구현 완료 보고서
- **내용**: 완료된 기능, 해결된 이슈, 성과
- **사용법**: 현재까지 완료된 내용 확인

#### 9. `/docs/REQUIREMENTS_VERIFICATION.md` ⭐
- **역할**: 요구사항 대비 구현 검증서
- **내용**: 달성률, 미구현 항목 분석
- **사용법**: 진행 상황 점검

#### 10. `/docs/implementation-log.md`
- **역할**: 개발 과정 상세 로그
- **내용**: 일별 개발 기록
- **사용법**: 문제 해결 시 참조

---

## 🎨 4단계: 디자인 & 관리 문서 (docs/)

### 🖌️ **디자인 및 프로젝트 관리**

#### 11. `/docs/ui-ux-design-guide.md`
- **역할**: UI/UX 디자인 가이드라인
- **내용**: 컴포넌트 스타일, 색상 시스템
- **사용법**: 디자인 일관성 유지

#### 12. `/docs/project-management.md`
- **역할**: 프로젝트 관리 방법론
- **내용**: 작업 프로세스, 품질 관리
- **사용법**: 팀 작업 시 참조

---

## 🚀 **체계적 개발을 위한 우선순위**

### 📖 개발 시작 전 반드시 읽어야 할 문서 (순서대로)

1. **`/plan/requirements-specification.md`** ⭐⭐⭐
   - 전체 프로젝트 이해
   - 구현할 기능 파악

2. **`/docs/development-plan.md`**
   - 현재 Phase 확인
   - 다음 작업 우선순위 파악

3. **`/docs/IMPLEMENTATION.md`** ⭐⭐
   - 현재까지 완료 사항 확인
   - 남은 작업 파악

### 💻 개발 중 참조 문서

4. **`/docs/tech-architecture.md`**
   - 기술적 결정 시 참조

5. **`/plan/freelance-website-design.md`**
   - 디자인 작업 시 참조

6. **`/docs/ui-ux-design-guide.md`**
   - 컴포넌트 제작 시 참조

### 🔍 문제 해결 시 참조 문서

7. **`/docs/implementation-log.md`**
   - 과거 해결 사례 확인

8. **`/docs/REQUIREMENTS_VERIFICATION.md`**
   - 요구사항 충족 여부 확인

---

## 🎯 **현재 개발 상태** (2024.09.16 기준)

### ✅ Phase 1 완료 (100%)
- 기본 레이아웃 및 네비게이션 ✅
- 모든 주요 페이지 (홈, About, Services, Portfolio, Contact, Quote) ✅
- 카카오 개발자 스타일 완벽 구현 ✅
- 반응형 디자인 및 접근성 ✅

### ⏳ 다음 단계 (Phase 2)
- Supabase 데이터베이스 연동
- 실제 문의 처리 시스템
- 파일 업로드 기능
- 관리자 대시보드

---

## 📚 **권장 개발 워크플로우**

### 🔄 새로운 기능 개발 시

1. **계획 확인**
   ```
   /plan/requirements-specification.md 해당 기능 확인
   ↓
   /docs/development-plan.md 우선순위 확인
   ↓
   /docs/IMPLEMENTATION.md 현재 상태 파악
   ```

2. **개발 진행**
   ```
   /docs/tech-architecture.md 기술 스택 확인
   ↓
   /docs/ui-ux-design-guide.md 디자인 가이드 적용
   ↓
   개발 진행
   ```

3. **완료 후 문서 업데이트**
   ```
   /docs/implementation-log.md 개발 과정 기록
   ↓
   /docs/IMPLEMENTATION.md 완료 사항 업데이트
   ↓
   git commit & push
   ```

---

## 🗂️ **문서 관리 원칙**

### ✅ DO (해야 할 것)
- **단일 진실 공급원**: 중복 정보는 한 곳에만
- **계층적 구조**: 상위 문서 → 하위 세부 문서
- **정기적 업데이트**: 개발 완료 시 즉시 문서 업데이트
- **명확한 역할**: 각 문서의 목적을 명확히

### ❌ DON'T (하지 말 것)  
- 여러 문서에 같은 정보 중복 기록
- 구현 없이 문서만 작성
- 문서 업데이트 없이 개발만 진행
- 문서 간 일관성 무시

---

## 🏆 **마스터 체크리스트**

새로운 기능 개발 전 확인사항:

- [ ] `/plan/requirements-specification.md`에서 요구사항 확인했는가?
- [ ] `/docs/development-plan.md`에서 우선순위 확인했는가?
- [ ] `/docs/IMPLEMENTATION.md`에서 현재 상태 파악했는가?
- [ ] 기술적 결정사항을 `/docs/tech-architecture.md`와 일치시켰는가?
- [ ] 개발 완료 후 관련 문서들을 업데이트했는가?

---

## 📞 **빠른 참조**

**"지금 뭘 개발해야 하지?"**
→ `/docs/development-plan.md` + `/docs/IMPLEMENTATION.md`

**"이 기능 요구사항이 뭐였지?"**
→ `/plan/requirements-specification.md`

**"이 기술을 왜 선택했지?"**
→ `/docs/tech-architecture.md`

**"이 버그 전에 어떻게 해결했지?"**
→ `/docs/implementation-log.md`

**"현재 진행률이 어떻게 되지?"**
→ `/docs/REQUIREMENTS_VERIFICATION.md`

이 가이드를 따라하면 체계적이고 일관성 있는 개발이 가능합니다! 🚀