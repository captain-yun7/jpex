/**
 * JPEX 프로젝트 상수 정의
 * 전역적으로 사용되는 상수값들을 중앙 관리
 */

// ============================================================================
// 사이트 기본 정보
// ============================================================================

export const SITE_CONFIG = {
  name: 'JpexStudio',
  title: 'JpexStudio - 홈페이지 제작 & AI 솔루션 개발',
  description: '회사·병원·쇼핑몰 홈페이지 제작부터 AI 솔루션 개발까지. JpexStudio는 실제 운영 중인 프로젝트로 검증된 웹 개발 스튜디오입니다.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jpexstudio.com',
  ogImage: '/images/og-image.jpg',
  author: {
    name: 'JpexStudio',
    email: 'jslovejs182@gmail.com',
    twitter: '@jpex_dev',
    github: 'https://github.com/jpex-dev',
    linkedin: 'https://linkedin.com/in/jpex-dev',
  },
} as const;

// ============================================================================
// 네비게이션 메뉴
// ============================================================================

export const NAVIGATION_ITEMS = [
  {
    name: '홈',
    href: '/',
    description: '메인 페이지',
  },
  {
    name: '서비스',
    href: '/services',
    description: '제공 서비스 안내',
  },
  {
    name: '포트폴리오',
    href: '/portfolio',
    description: '프로젝트 사례',
  },
  {
    name: '진행 프로세스',
    href: '/process',
    description: '프로젝트 진행 과정',
  },
  {
    name: '견적 문의',
    href: '/quote',
    description: '프로젝트 견적 요청',
  },
] as const;

// ============================================================================
// 프로젝트 관련 상수
// ============================================================================

export const PROJECT_CATEGORIES = {
  web: {
    label: '웹 개발',
    description: '반응형 웹사이트 및 웹 애플리케이션',
    icon: '🌐',
    color: '#00A0FF',
  },
  mobile: {
    label: '모바일 앱',
    description: 'iOS/Android 네이티브 및 크로스 플랫폼 앱',
    icon: '📱',
    color: '#00FF88',
  },
  ai: {
    label: 'AI 솔루션',
    description: '인공지능 및 머신러닝 서비스',
    icon: '🤖',
    color: '#FFB800',
  },
  consulting: {
    label: '기술 컨설팅',
    description: '아키텍처 설계 및 성능 최적화',
    icon: '💡',
    color: '#FF4444',
  },
} as const;

export const PROJECT_TECHNOLOGIES = [
  // Frontend
  'React', 'Next.js', 'Vue.js', 'Nuxt.js', 'Angular', 'Svelte',
  'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Sass', 'Tailwind CSS',
  
  // Backend
  'Node.js', 'Express', 'Fastify', 'NestJS', 'Python', 'Django',
  'FastAPI', 'Flask', 'PHP', 'Laravel', 'Java', 'Spring Boot',
  
  // Database
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Neon', 'Firebase',
  'Prisma', 'TypeORM', 'Sequelize',
  
  // Mobile
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic',
  
  // AI/ML
  'TensorFlow', 'PyTorch', 'OpenAI API', 'Hugging Face', 'LangChain',
  'Scikit-learn', 'Pandas', 'NumPy',
  
  // Cloud & DevOps
  'AWS', 'Google Cloud', 'Vercel', 'Netlify', 'Docker', 'Kubernetes',
  'GitHub Actions', 'GitLab CI', 'Terraform',
  
  // Tools
  'Git', 'Webpack', 'Vite', 'ESLint', 'Prettier', 'Jest', 'Cypress',
] as const;

// ============================================================================
// 서비스 관련 상수
// ============================================================================

export const SERVICES = {
  web: {
    title: '웹/앱 개발',
    description: '현대적이고 반응형 웹사이트 및 애플리케이션 개발',
    features: [
      '반응형 웹 디자인',
      'Progressive Web App (PWA)',
      'E-commerce 솔루션',
      '관리자 대시보드',
      'API 개발 및 연동',
      '성능 최적화',
    ],
    process: [
      '요구사항 분석',
      'UI/UX 설계',
      '개발 및 구현',
      '테스트 및 QA',
      '배포 및 런칭',
      '유지보수',
    ],
    duration: '2-12주',
    priceRange: '300만원 - 3,000만원',
  },
  ai: {
    title: 'AI 솔루션',
    description: '비즈니스 자동화를 위한 인공지능 서비스',
    features: [
      'ChatGPT 기반 챗봇',
      '문서 자동 분석',
      '이미지 인식 시스템',
      '추천 시스템',
      '자동화 워크플로우',
      'API 연동 서비스',
    ],
    process: [
      '비즈니스 분석',
      'AI 모델 설계',
      '데이터 준비',
      '모델 훈련',
      '시스템 통합',
      '성능 모니터링',
    ],
    duration: '4-16주',
    priceRange: '500만원 - 5,000만원',
  },
  consulting: {
    title: '기술 컨설팅',
    description: '시스템 아키텍처 설계 및 성능 최적화',
    features: [
      '아키텍처 설계',
      '코드 리뷰',
      '성능 최적화',
      '보안 감사',
      '기술 스택 선정',
      '팀 교육',
    ],
    process: [
      '현황 분석',
      '문제점 파악',
      '개선 방안 제시',
      '구현 지원',
      '결과 검증',
      '지속적 개선',
    ],
    duration: '1-8주',
    priceRange: '200만원 - 2,000만원',
  },
} as const;

// ============================================================================
// 폼 관련 상수
// ============================================================================

export const FORM_VALIDATION = {
  name: {
    minLength: 2,
    maxLength: 50,
    required: true,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: true,
  },
  phone: {
    pattern: /^(010|011|016|017|018|019)-?\d{3,4}-?\d{4}$/,
    required: false,
  },
  subject: {
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  message: {
    minLength: 10,
    maxLength: 1000,
    required: true,
  },
  company: {
    maxLength: 100,
    required: false,
  },
} as const;

export const BUDGET_RANGES = [
  '100만원 미만',
  '100만원 - 300만원',
  '300만원 - 500만원',
  '500만원 - 1,000만원',
  '1,000만원 - 3,000만원',
  '3,000만원 이상',
  '예산 상담',
] as const;

export const PROJECT_TIMELINES = [
  '1주 이내',
  '2-4주',
  '1-2개월',
  '3-6개월',
  '6개월 이상',
  '일정 협의',
] as const;

export const PROJECT_SCOPES = {
  small: {
    label: '소규모',
    description: '간단한 웹사이트 또는 기본 기능',
    features: ['5페이지 이하', '기본 반응형', '간단한 폼'],
    duration: '2-4주',
    price: '300-800만원',
  },
  medium: {
    label: '중간 규모',
    description: '일반적인 비즈니스 웹사이트',
    features: ['10페이지 이하', '고급 반응형', 'CMS 연동', 'SEO 최적화'],
    duration: '4-8주',
    price: '800-2,000만원',
  },
  large: {
    label: '대규모',
    description: '복잡한 웹 애플리케이션',
    features: ['사용자 인증', '데이터베이스', 'API 개발', '관리자 패널'],
    duration: '8-16주',
    price: '2,000-5,000만원',
  },
  enterprise: {
    label: '엔터프라이즈',
    description: '기업용 맞춤 솔루션',
    features: ['확장성', '보안', '통합', '24/7 지원'],
    duration: '16주 이상',
    price: '5,000만원 이상',
  },
} as const;

// ============================================================================
// UI 관련 상수
// ============================================================================

export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
  '3xl': 1600,
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 600,
} as const;

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070,
} as const;

// ============================================================================
// 분석 관련 상수
// ============================================================================

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  FORM_SUBMIT: 'form_submit',
  PROJECT_VIEW: 'project_view',
  DOWNLOAD: 'download',
  CLICK: 'click',
  SCROLL: 'scroll',
  SEARCH: 'search',
} as const;

export const CONVERSION_GOALS = {
  CONTACT_FORM: 'contact_form_submit',
  QUOTE_REQUEST: 'quote_request_submit',
  PROJECT_INQUIRY: 'project_inquiry',
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
} as const;

// ============================================================================
// API 관련 상수
// ============================================================================

export const API_ENDPOINTS = {
  PROJECTS: '/api/projects',
  CONTACT: '/api/contact',
  QUOTES: '/api/quotes',
  BLOG: '/api/blog',
  ANALYTICS: '/api/analytics',
  UPLOAD: '/api/upload',
  SETTINGS: '/api/settings',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const API_ERRORS = {
  INVALID_REQUEST: 'E1001',
  MISSING_REQUIRED_FIELD: 'E1002',
  INVALID_FIELD_FORMAT: 'E1003',
  REQUEST_TOO_LARGE: 'E1004',
  UNAUTHORIZED: 'E2001',
  FORBIDDEN: 'E2002',
  TOKEN_EXPIRED: 'E2003',
  RATE_LIMIT_EXCEEDED: 'E3001',
  RESOURCE_NOT_FOUND: 'E4001',
  FILE_TOO_LARGE: 'E5001',
  INVALID_FILE_TYPE: 'E5002',
  EMAIL_SEND_FAILED: 'E6001',
  INTERNAL_SERVER_ERROR: 'E9001',
  DATABASE_ERROR: 'E9002',
} as const;

// ============================================================================
// 파일 업로드 관련 상수
// ============================================================================

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'text/plain',
  ],
  ALLOWED_EXTENSIONS: [
    '.jpg', '.jpeg', '.png', '.gif', '.webp',
    '.pdf', '.doc', '.docx', '.zip', '.txt',
  ],
} as const;

// ============================================================================
// 소셜 미디어 관련 상수
// ============================================================================

export const SOCIAL_LINKS = {
  github: {
    name: 'GitHub',
    url: 'https://github.com/jpex-dev',
    icon: 'github',
  },
  linkedin: {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/jpex-dev',
    icon: 'linkedin',
  },
  twitter: {
    name: 'Twitter',
    url: 'https://twitter.com/jpex_dev',
    icon: 'twitter',
  },
  instagram: {
    name: 'Instagram',
    url: 'https://instagram.com/jpex_dev',
    icon: 'instagram',
  },
  youtube: {
    name: 'YouTube',
    url: 'https://youtube.com/@jpex_dev',
    icon: 'youtube',
  },
} as const;

// ============================================================================
// 연락처 정보
// ============================================================================

export const CONTACT_INFO = {
  email: 'jslovejs182@gmail.com',
  phone: '010-2174-5072',
  address: '서울 및 경기 협의',
  businessHours: {
    weekdays: '09:00 - 18:00',
    saturday: '10:00 - 16:00',
    sunday: '휴무',
  },
  responseTime: '24시간 이내',
  languages: ['한국어', 'English'],
} as const;

// ============================================================================
// SEO 관련 상수
// ============================================================================

export const SEO_CONFIG = {
  titleTemplate: '%s | JpexStudio',
  defaultTitle: 'JpexStudio - 홈페이지 제작 & AI 솔루션 개발',
  description: '회사·병원·쇼핑몰 홈페이지 제작부터 AI 솔루션 개발까지. JpexStudio는 실제 운영 중인 프로젝트로 검증된 웹 개발 스튜디오입니다.',
  keywords: [
    '홈페이지 제작', '웹사이트 제작', '회사 홈페이지 제작', '병원 홈페이지 제작',
    '쇼핑몰 제작', '분양 사이트 제작', '반응형 웹 제작', '홈페이지 제작 업체',
    'AI 솔루션 개발', '챗봇 개발', '업무 자동화', 'AI 개발',
    'React', 'Next.js', 'TypeScript', '웹 개발 외주',
  ],
  author: 'JpexStudio',
  creator: 'JpexStudio',
  publisher: 'JpexStudio',
  robots: 'index,follow',
  googlebot: 'index,follow',
  verification: {
    google: '', // Google Search Console 인증 코드
    naver: '',  // 네이버 웹마스터 인증 코드
    bing: '',   // Bing 웹마스터 인증 코드
  },
} as const;

// ============================================================================
// 환경별 설정
// ============================================================================

export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
} as const;

// ============================================================================
// 에러 메시지
// ============================================================================

export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  VALIDATION_ERROR: '입력 정보를 확인해주세요.',
  NOT_FOUND: '요청한 페이지를 찾을 수 없습니다.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  TOO_MANY_REQUESTS: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
  FILE_TOO_LARGE: '파일 크기가 너무 큽니다.',
  INVALID_FILE_TYPE: '지원하지 않는 파일 형식입니다.',
  EMAIL_SEND_FAILED: '이메일 전송에 실패했습니다.',
} as const;