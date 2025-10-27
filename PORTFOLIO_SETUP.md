# 포트폴리오 프로젝트 추가 가이드

실제 프로젝트를 포트폴리오 페이지에 추가하는 방법을 설명합니다.

## 📋 준비물

1. 프로젝트 스크린샷 이미지 (PNG/JPG)
2. 프로젝트 실제 사이트 URL
3. GitHub 저장소 URL (선택사항)

## 🎯 단계별 가이드

### 1단계: 프로젝트 스크린샷 준비

#### 스크린샷 찍기
- 실제 프로젝트 사이트의 **메인 화면** 스크린샷
- **권장 해상도**: 1920x1080 이상
- **권장 비율**: 16:9 (가로형)
- **형식**: PNG 또는 JPG

#### 이미지 최적화 (권장)
파일 크기를 줄이기 위해 이미지 압축 도구 사용:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- 목표: 1MB 이하

#### 이미지 저장
```bash
# 프로젝트 루트에서
public/images/projects/project1.png
public/images/projects/project2.png
public/images/projects/project3.png
# ...
```

**파일명 규칙**:
- `project1.png` ~ `project6.png`
- 프로젝트 ID와 일치해야 함

---

### 2단계: 프로젝트 정보 수정

`src/app/portfolio/page.tsx` 파일을 열고 프로젝트 배열에서 해당 프로젝트를 찾아 수정합니다.

#### 예시: 프로젝트 1 수정

**수정 전:**
```typescript
{
  id: 1,
  title: '기업 포트폴리오 웹사이트',
  category: 'web',
  description: 'Next.js와 Headless CMS를 활용하여 제작한 현대적이고 반응형 기업 홈페이지입니다.',
  image: '/images/projects/project1.png',
  liveUrl: 'https://example.com',  // ⬅️ 여기 수정
  githubUrl: '',  // ⬅️ 여기 수정 (선택)
  technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Strapi', 'PostgreSQL'],
  features: [
    '반응형 웹 디자인',
    'SEO 최적화',
    'CMS 연동',
    '다국어 지원'
  ],
  results: [
    '로딩 속도 70% 향상',
    'SEO 점수 95점 달성',
    '문의 전환율 40% 증가'
  ],
  duration: '3주',
  year: '2024'
},
```

**수정 후:**
```typescript
{
  id: 1,
  title: '내 실제 프로젝트 이름',  // 프로젝트 이름 변경
  category: 'web',
  description: '실제 프로젝트 설명을 입력하세요.',  // 설명 변경
  image: '/images/projects/project1.png',
  liveUrl: 'https://myactualsite.com',  // ✅ 실제 사이트 URL
  githubUrl: 'https://github.com/username/repo',  // ✅ GitHub URL (선택)
  technologies: ['React', 'Node.js'],  // 실제 사용한 기술
  features: [
    '실제 주요 기능 1',
    '실제 주요 기능 2',
    // ...
  ],
  results: [
    '실제 성과 1',
    '실제 성과 2',
    // ...
  ],
  duration: '4주',
  year: '2024'
},
```

#### 필드 설명

| 필드 | 설명 | 필수 여부 |
|------|------|----------|
| `id` | 프로젝트 고유 번호 (변경 금지) | ✅ 필수 |
| `title` | 프로젝트 제목 | ✅ 필수 |
| `category` | 카테고리 (`web`, `ai`, `consulting`) | ✅ 필수 |
| `description` | 프로젝트 설명 (1-2문장) | ✅ 필수 |
| `image` | 이미지 경로 | ✅ 필수 |
| `liveUrl` | 실제 사이트 URL | ⚠️ 선택 (없으면 버튼 안 보임) |
| `githubUrl` | GitHub URL | ⚠️ 선택 (없으면 버튼 안 보임) |
| `technologies` | 기술 스택 배열 | ✅ 필수 |
| `features` | 주요 기능 배열 | ✅ 필수 |
| `results` | 주요 성과 배열 | ✅ 필수 |
| `duration` | 프로젝트 기간 | ✅ 필수 |
| `year` | 프로젝트 연도 | ✅ 필수 |

---

### 3단계: 이미지 코드 활성화

`src/app/portfolio/page.tsx` 파일의 **246-253번째 줄**을 수정합니다.

**현재 코드 (플레이스홀더):**
```tsx
<div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
  {/* 플레이스홀더 - 실제 이미지로 교체하세요 */}
  <div className="text-6xl opacity-30">
    {project.id === 1 ? '🏢' : project.id === 2 ? '🤖' : project.id === 3 ? '🛒' : project.id === 4 ? '🏗️' : project.id === 5 ? '📄' : '📊'}
  </div>
  {/* 실제 사용 시:
  <Image
    src={project.image}
    alt={project.title}
    fill
    className="object-cover"
  />
  */}
</div>
```

**수정 후 (실제 이미지 사용):**
```tsx
<div className="relative w-full h-full bg-gray-900">
  <Image
    src={project.image}
    alt={project.title}
    fill
    className="object-cover"
  />
</div>
```

---

### 4단계: 테스트

개발 서버를 실행하고 확인합니다.

```bash
npm run dev
```

브라우저에서 `http://localhost:3000/portfolio` 접속 후 확인:
- ✅ 프로젝트 이미지가 제대로 표시되는가?
- ✅ "사이트 보기" 버튼이 보이고 클릭 시 새 탭으로 열리는가?
- ✅ "GitHub 보기" 버튼이 보이고 제대로 동작하는가?

---

## 💡 팁

### URL이 없는 경우
`liveUrl`이나 `githubUrl`을 빈 문자열(`''`)로 두면 해당 버튼은 표시되지 않습니다.

```typescript
liveUrl: '',  // 버튼 표시 안 됨
githubUrl: '',  // 버튼 표시 안 됨
```

### 카테고리 종류
```typescript
'web'        // 웹/앱 개발
'ai'         // AI 솔루션
'consulting' // 컨설팅
```

### 새 프로젝트 추가
6개 프로젝트 외에 더 추가하려면:

1. `projects` 배열에 새 객체 추가
2. `id`를 7, 8, 9... 순서로 증가
3. 이미지도 `project7.png`, `project8.png`... 로 추가

---

## 🎨 이미지 스크린샷 팁

### 좋은 스크린샷 예시
- ✅ 메인 페이지의 히어로 섹션
- ✅ 프로젝트의 핵심 기능이 보이는 화면
- ✅ 깔끔하고 전문적인 UI
- ✅ 밝고 선명한 화질

### 피해야 할 것
- ❌ 로딩 중인 화면
- ❌ 에러 메시지가 보이는 화면
- ❌ 개인정보가 노출된 화면
- ❌ 흐릿하거나 너무 어두운 이미지

---

## 🔧 문제 해결

### 이미지가 안 보여요
1. 파일 경로 확인: `public/images/projects/project1.png`
2. 파일명 확인: 대소문자 구분됨
3. 이미지 형식 확인: PNG, JPG, WebP 지원

### 버튼이 안 보여요
- `liveUrl` 또는 `githubUrl`이 빈 문자열이 아닌지 확인
- 유효한 URL 형식인지 확인 (`https://`로 시작)

### 이미지가 깨져 보여요
- 이미지 비율이 16:9에 가까운지 확인
- `object-cover` 클래스가 적용되어 있는지 확인

---

## 📝 체크리스트

프로젝트 추가 전 확인사항:

- [ ] 프로젝트 스크린샷 준비 (1920x1080, 16:9 비율)
- [ ] 이미지 최적화 완료 (1MB 이하)
- [ ] `public/images/projects/` 폴더에 이미지 저장
- [ ] `src/app/portfolio/page.tsx`에서 프로젝트 정보 수정
- [ ] `liveUrl`, `githubUrl` 업데이트
- [ ] 이미지 코드 주석 해제 및 플레이스홀더 제거
- [ ] 로컬에서 테스트 완료
- [ ] 실제 링크 클릭 테스트 완료

---

## 📞 문제가 있나요?

이 가이드대로 진행했는데도 문제가 있다면:
1. 파일 경로 다시 확인
2. 브라우저 캐시 삭제 후 새로고침
3. 개발 서버 재시작

---

**작성일**: 2025-10-27
**버전**: 1.0
