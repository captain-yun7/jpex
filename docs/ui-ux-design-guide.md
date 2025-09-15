# UI/UX 디자인 가이드

## 📋 디자인 시스템 개요
- **디자인 철학**: 카카오 개발자 스타일 기반의 프로페셔널한 다크 테마
- **타겟 사용자**: 기업 고객, 스타트업, 개인 사업자
- **브랜드 정체성**: 전문성, 신뢰성, 혁신성

---

## 🎨 컬러 시스템

### 주요 컬러 팔레트
```css
:root {
  /* Primary Colors */
  --color-primary: #151517;      /* 메인 다크 배경 */
  --color-primary-light: #1a1a1c; /* 카드 배경 */
  --color-primary-dark: #0f0f10;  /* 더 진한 배경 */
  
  /* Secondary Colors */
  --color-secondary: #2a2a2a;     /* 보더, 구분선 */
  --color-secondary-light: #3a3a3a; /* 호버 상태 */
  --color-secondary-dark: #1a1a1a;  /* 눌린 상태 */
  
  /* Accent Colors */
  --color-accent: #00A0FF;        /* 카카오 블루 */
  --color-accent-hover: #0080cc;  /* 호버 시 블루 */
  --color-accent-light: #33b3ff;  /* 밝은 블루 */
  
  /* Text Colors */
  --color-text-primary: #ffffff;   /* 메인 텍스트 */
  --color-text-secondary: #cccccc; /* 보조 텍스트 */
  --color-text-muted: #888888;     /* 흐린 텍스트 */
  
  /* Status Colors */
  --color-success: #00FF88;        /* 성공, 온라인 상태 */
  --color-warning: #FFB800;        /* 경고, 대기 상태 */
  --color-error: #FF4444;          /* 오류, 오프라인 상태 */
  --color-info: #00A0FF;           /* 정보, 알림 */
  
  /* Background Colors */
  --color-bg-primary: #151517;     /* 메인 배경 */
  --color-bg-secondary: #1a1a1c;   /* 카드, 모달 배경 */
  --color-bg-tertiary: #f7fafc;    /* 라이트 모드 배경 (필요시) */
}
```

### 컬러 사용 가이드
- **Primary**: 메인 배경, 헤더, 푸터
- **Secondary**: 카드 배경, 모달, 사이드바
- **Accent**: CTA 버튼, 링크, 강조 요소
- **Text**: 가독성을 고려한 계층적 텍스트 컬러
- **Status**: 시스템 상태, 알림, 피드백

---

## ✏️ 타이포그래피

### 폰트 스택
```css
:root {
  /* 한글 + 영문 폰트 */
  --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
  
  /* 코드 폰트 */
  --font-mono: 'Fira Code', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
  
  /* 숫자 전용 폰트 */
  --font-numeric: 'SF Pro Display', -apple-system, sans-serif;
}
```

### 타이포그래피 스케일
```css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px - 캡션, 라벨 */
  --text-sm: 0.875rem;   /* 14px - 작은 텍스트 */
  --text-base: 1rem;     /* 16px - 기본 텍스트 */
  --text-lg: 1.125rem;   /* 18px - 큰 텍스트 */
  --text-xl: 1.25rem;    /* 20px - 제목 */
  --text-2xl: 1.5rem;    /* 24px - 섹션 제목 */
  --text-3xl: 1.875rem;  /* 30px - 페이지 제목 */
  --text-4xl: 2.25rem;   /* 36px - 큰 제목 */
  --text-5xl: 3rem;      /* 48px - 히어로 제목 */
  --text-6xl: 3.75rem;   /* 60px - 메인 헤드라인 */
  
  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

### 텍스트 스타일 클래스
```css
/* 헤딩 스타일 */
.heading-hero {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  background: linear-gradient(135deg, #ffffff, #00A0FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.heading-section {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: 2rem;
}

.heading-card {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

/* 본문 스타일 */
.text-body {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.text-caption {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  color: var(--color-text-muted);
}
```

---

## 🧩 컴포넌트 라이브러리

### 버튼 컴포넌트
```css
/* 기본 버튼 스타일 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

/* Primary 버튼 */
.btn-primary {
  background-color: var(--color-accent);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-1px);
}

/* Secondary 버튼 */
.btn-secondary {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-secondary);
}

.btn-secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* 사이즈 변형 */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: var(--text-sm);
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: var(--text-lg);
}
```

### 카드 컴포넌트
```css
.card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-secondary);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 160, 255, 0.1);
}

.card-header {
  margin-bottom: 1rem;
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.card-description {
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.card-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-secondary);
}
```

### 입력 폼 컴포넌트
```css
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-secondary);
  border-radius: 0.375rem;
  color: var(--color-text-primary);
  font-size: var(--text-base);
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 160, 255, 0.1);
}

.form-input::placeholder {
  color: var(--color-text-muted);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}
```

---

## 🏗️ 레이아웃 시스템

### 그리드 시스템
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.grid {
  display: grid;
  gap: 2rem;
}

/* 반응형 그리드 */
.grid-1 { grid-template-columns: 1fr; }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-auto { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }

/* 모바일 대응 */
@media (max-width: 768px) {
  .grid-2, .grid-3 {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 1rem;
  }
}
```

### 스페이싱 시스템
```css
:root {
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */
  --space-4xl: 6rem;     /* 96px */
}

/* 유틸리티 클래스 */
.mt-lg { margin-top: var(--space-lg); }
.mb-xl { margin-bottom: var(--space-xl); }
.p-md { padding: var(--space-md); }
.px-lg { padding-left: var(--space-lg); padding-right: var(--space-lg); }
.py-xl { padding-top: var(--space-xl); padding-bottom: var(--space-xl); }
```

---

## 🎭 애니메이션 시스템

### 전환 효과
```css
:root {
  /* 애니메이션 지속시간 */
  --duration-fast: 0.15s;
  --duration-normal: 0.3s;
  --duration-slow: 0.6s;
  
  /* 이징 함수 */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 기본 전환 */
.transition {
  transition: all var(--duration-normal) var(--ease-in-out);
}

.transition-fast {
  transition: all var(--duration-fast) var(--ease-in-out);
}

.transition-slow {
  transition: all var(--duration-slow) var(--ease-in-out);
}
```

### 스크롤 애니메이션
```css
/* 페이드인 애니메이션 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp var(--duration-slow) var(--ease-out);
}

/* 스케일 애니메이션 */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn var(--duration-normal) var(--ease-out);
}
```

### 호버 효과
```css
.hover-lift {
  transition: transform var(--duration-normal) var(--ease-out);
}

.hover-lift:hover {
  transform: translateY(-4px);
}

.hover-glow {
  transition: box-shadow var(--duration-normal) var(--ease-out);
}

.hover-glow:hover {
  box-shadow: 0 0 20px rgba(0, 160, 255, 0.3);
}
```

---

## 📱 반응형 디자인

### 브레이크포인트
```css
:root {
  --breakpoint-sm: 640px;   /* 모바일 */
  --breakpoint-md: 768px;   /* 태블릿 */
  --breakpoint-lg: 1024px;  /* 데스크톱 */
  --breakpoint-xl: 1280px;  /* 대형 화면 */
}

/* 미디어 쿼리 */
@media (max-width: 640px) {
  /* 모바일 스타일 */
  .container {
    padding: 0 1rem;
  }
  
  .text-hero {
    font-size: var(--text-4xl);
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  /* 태블릿 스타일 */
  .grid-auto {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1025px) {
  /* 데스크톱 스타일 */
  .hero-section {
    padding: 6rem 0;
  }
}
```

### 모바일 우선 접근법
```css
/* 기본: 모바일 스타일 */
.navigation {
  flex-direction: column;
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100vh;
  background: var(--color-bg-primary);
  transition: left var(--duration-normal);
}

/* 데스크톱에서 확장 */
@media (min-width: 768px) {
  .navigation {
    position: static;
    flex-direction: row;
    width: auto;
    height: auto;
    left: 0;
    background: transparent;
  }
}
```

---

## 🎨 아이콘 시스템

### 아이콘 라이브러리
- **Primary**: Lucide Icons (일관된 스타일)
- **Social**: Brand Icons (소셜 미디어용)
- **Custom**: 커스텀 SVG 아이콘

### 아이콘 스타일 가이드
```css
.icon {
  width: 1.5rem;
  height: 1.5rem;
  color: currentColor;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon-sm { width: 1rem; height: 1rem; }
.icon-lg { width: 2rem; height: 2rem; }
.icon-xl { width: 3rem; height: 3rem; }

.icon-primary { color: var(--color-accent); }
.icon-success { color: var(--color-success); }
.icon-muted { color: var(--color-text-muted); }
```

---

## 🖼️ 이미지 및 미디어

### 이미지 최적화
```css
.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
}

.image-responsive {
  width: 100%;
  height: auto;
  display: block;
}

.image-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7));
  opacity: 0;
  transition: opacity var(--duration-normal);
}

.image-container:hover .image-overlay {
  opacity: 1;
}
```

### 비디오 컴포넌트
```css
.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 비율 */
  overflow: hidden;
  border-radius: 0.5rem;
}

.video-responsive {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

---

## 🌓 다크 모드 지원

### CSS 변수 활용
```css
/* 라이트 모드 (기본) */
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a202c;
}

/* 다크 모드 */
:root[data-theme="dark"] {
  --bg-primary: #151517;
  --text-primary: #ffffff;
}

/* 시스템 설정에 따른 자동 전환 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #151517;
    --text-primary: #ffffff;
  }
}
```

---

## ♿ 접근성 가이드라인

### 색상 대비
- **일반 텍스트**: 4.5:1 이상
- **큰 텍스트**: 3:1 이상
- **UI 요소**: 3:1 이상

### 키보드 내비게이션
```css
/* 포커스 표시 */
.focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* 건너뛰기 링크 */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-accent);
  color: white;
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}
```

### 스크린 리더 지원
```css
/* 스크린 리더 전용 텍스트 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 🎯 사용성 가이드라인

### 터치 타겟 크기
- **최소 크기**: 44px × 44px
- **권장 크기**: 48px × 48px
- **간격**: 8px 이상

### 로딩 상태
```css
.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--color-secondary);
  border-top: 2px solid var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## 📐 디자인 토큰

### Figma/Design Tool 연동
```json
{
  "colors": {
    "primary": {
      "50": "#f8fafc",
      "900": "#151517"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px"
  },
  "typography": {
    "heading": {
      "fontSize": "48px",
      "lineHeight": "1.2"
    }
  }
}
```

이 디자인 가이드는 JPEX 웹사이트의 일관된 시각적 경험을 제공하며, 카카오 개발자 스타일을 기반으로 한 전문적이고 현대적인 디자인을 구현합니다.