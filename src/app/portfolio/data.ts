/**
 * Portfolio 프로젝트 데이터
 * JpexStudio가 실제 제작·배포한 프로젝트 기반 (라이브 URL 보유)
 */

/**
 * 라이브 사이트 화면을 실시간 캡처한 썸네일 URL 생성
 * (thum.io — 별도 스크린샷 파일 없이 실제 화면을 그대로 노출)
 */
const shot = (url: string): string =>
  `https://image.thum.io/get/width/1200/crop/900/${url}`;

export const categories = [
  { id: 'all', name: '전체' },
  { id: 'web', name: '웹/앱 개발' },
  { id: 'ai', name: 'AI 솔루션' },
];

export interface Project {
  id: number;
  title: string;
  category: 'web' | 'ai';
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  features: string[];
  results: string[];
  duration: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: '쿠쿠배배 - 배달 실적 자동화 SaaS',
    category: 'ai',
    description:
      '쿠팡이츠 벤더포털 실적 데이터를 자동 수집해 카카오톡으로 전송하는 배달 운영 자동화 서비스입니다. 매장주가 포털에 접속하지 않아도 실시간 실적을 받아볼 수 있습니다.',
    image: shot('https://www.coucoubaebae.com'),
    liveUrl: 'https://www.coucoubaebae.com',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', 'Playwright', '카카오 API', 'Vercel'],
    features: [
      '벤더포털 실적 자동 수집 (배정·처리·거절률·라이더 현황)',
      '설정 주기마다 카카오톡 오픈채팅 자동 전송',
      '피크타임(아침·점심·저녁)별 목표 달성 모니터링',
      '구독형 SaaS 결제 및 매장 관리',
    ],
    results: [
      '포털 수동 확인 업무 제거',
      '실시간 실적 가시성 확보',
      '점주 운영 효율 향상',
    ],
    duration: '6주',
    year: '2026',
  },
  {
    id: 2,
    title: 'FaceFalcon - AI 얼굴분석 서비스',
    category: 'ai',
    description:
      'InsightFace 기반 AI로 얼굴 유사도, 나이 예측, 스타일 분석 등을 제공하는 무료 웹 서비스입니다. 회원가입 없이 즉시 사용하며 업로드 이미지는 분석 후 자동 삭제됩니다.',
    image: shot('https://facefalcon.com'),
    liveUrl: 'https://facefalcon.com',
    githubUrl: '',
    technologies: ['InsightFace', 'Python', 'FastAPI', 'Next.js', 'Vercel'],
    features: [
      '두 얼굴 유사도 분석',
      '나이 예측 및 스타일(에겐·테토) 분석',
      '여러 명 중 가장 닮은 얼굴 찾기',
      '업로드 이미지 즉시 삭제로 개인정보 보호',
    ],
    results: [
      '회원가입 없는 즉시 사용',
      '높은 분석 정확도',
      '바이럴 트래픽 유입',
    ],
    duration: '5주',
    year: '2025',
  },
  {
    id: 3,
    title: 'AutoScore - AI 자동 채점 시스템',
    category: 'ai',
    description:
      '답안지를 업로드하면 OCR과 AI가 객관식부터 서술형까지 자동 채점하는 EdTech 플랫폼입니다. 한글 손글씨 인식과 GPT 기반 채점으로 채점 시간을 대폭 단축합니다.',
    image: shot('https://automatic-scoring-system-v1.vercel.app'),
    liveUrl: 'https://automatic-scoring-system-v1.vercel.app',
    githubUrl: '',
    technologies: ['Next.js', 'OCR', 'OpenAI GPT', 'TypeScript', 'Vercel'],
    features: [
      'OCR 기반 답안지 자동 인식 (한글 손글씨 대응)',
      'GPT 기반 서술형 AI 채점',
      '개인화 피드백 자동 생성',
      '성적 분석 통계 대시보드',
    ],
    results: [
      '수동 채점 대비 약 90% 시간 단축',
      '객관식·서술형 통합 채점',
      '교사 업무 부담 경감',
    ],
    duration: '7주',
    year: '2026',
  },
  {
    id: 4,
    title: '다낭 K-Talk Lab - AI 한국어 학원',
    category: 'ai',
    description:
      '다낭 소재 한국어 학원을 위한 웹 플랫폼으로, AI 발음·작문 평가와 수준별 커리큘럼, 전담 케어 시스템을 제공합니다. 초급부터 TOPIK까지 체계적인 학습을 지원합니다.',
    image: shot('https://danang-academy.vercel.app'),
    liveUrl: 'https://danang-academy.vercel.app',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', 'AI 음성평가', 'Tailwind CSS', 'Vercel'],
    features: [
      'AI 기반 발음·작문 평가 및 주간 리포트',
      '초급·중급·TOPIK·회화 수준별 코스',
      '무료 발음 테스트 및 배정 테스트',
      '전담 케어팀 밀착 관리',
    ],
    results: [
      '학습 동기 및 지속률 향상',
      '객관적 학습 진단 제공',
      '해외 한국어 교육 디지털화',
    ],
    duration: '5주',
    year: '2026',
  },
  {
    id: 5,
    title: '스마일분양 - 부동산 분양 플랫폼',
    category: 'web',
    description:
      '서울 주요 지역 아파트·오피스텔 분양 프로젝트를 비교·소개하고 1:1 맞춤 상담을 제공하는 부동산 분양 정보 플랫폼입니다.',
    image: shot('https://www.smilebunyang.com'),
    liveUrl: 'https://www.smilebunyang.com',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    features: [
      '진행 중인 분양 프로젝트 비교·소개',
      '전문 상담사 1:1 맞춤 컨설팅 연결',
      '실시간 분양 동향 업데이트',
      '대출·자금 계획 원스톱 상담',
    ],
    results: [
      '분양 문의 전환율 향상',
      '프리미엄 브랜드 이미지 구축',
      '효과적인 정보 전달',
    ],
    duration: '4주',
    year: '2026',
  },
  {
    id: 6,
    title: '에이스유통 - F&B B2B 기업 사이트',
    category: 'web',
    description:
      '베이커리·카페 산업에 프리미엄 원재료를 공급하고 창업 컨설팅, 물류, 캐릭터 IP 사업을 전개하는 F&B B2B 기업의 공식 홈페이지입니다.',
    image: shot('https://www.acedistribution.co.kr'),
    liveUrl: 'https://www.acedistribution.co.kr',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    features: [
      '제과제빵 원재료 유통 소개',
      '무료 창업컨설팅 안내 (입지분석·운영전략)',
      '콜드체인 물류 서비스 소개',
      '캐릭터 IP 협업 상품 페이지',
    ],
    results: [
      'B2B 신뢰도 향상',
      '사업 영역 통합 소개',
      '창업 문의 채널 확보',
    ],
    duration: '4주',
    year: '2026',
  },
  {
    id: 7,
    title: '경희실용음악학원 홈페이지',
    category: 'web',
    description:
      '부천 지역 19년 경력의 실용음악 전문 교육기관 홈페이지입니다. 보컬·악기·작곡 커리큘럼과 입시·데뷔 지원, 장학제도를 효과적으로 소개합니다.',
    image: shot('https://www.khmusic.co.kr'),
    liveUrl: 'https://www.khmusic.co.kr',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    features: [
      '악기별 개인레슨 커리큘럼 소개',
      '입시·오디션·취미반 목표별 과정 안내',
      '공연·오디션 등 데뷔 프로그램 소개',
      '장학제도 및 상담 문의',
    ],
    results: [
      '학원 전문성·신뢰도 강화',
      '상담 문의 증가',
      '커리큘럼 직관적 전달',
    ],
    duration: '3주',
    year: '2026',
  },
  {
    id: 8,
    title: '블랙스코프 - 특수배우 매니지먼트',
    category: 'web',
    description:
      'Netflix·Disney+ 등 주요 제작사와 협업하는 국내 특수배우 전문 매니지먼트 기업의 브랜드 사이트입니다. 스턴트·액션 배우 캐스팅과 액션 교육 프로그램을 소개합니다.',
    image: shot('https://www.blackscope.co.kr'),
    liveUrl: 'https://www.blackscope.co.kr',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    features: [
      '특수배우 매니지먼트·캐스팅 소개',
      '액션 교육 프로그램(Tactical Master) 안내',
      '프로젝트 매칭 문의',
      '주요 클라이언트 레퍼런스 노출',
    ],
    results: [
      '글로벌 OTT 레퍼런스 강조',
      '강렬한 브랜드 이미지 구축',
      '캐스팅 문의 채널 확보',
    ],
    duration: '4주',
    year: '2025',
  },
  {
    id: 9,
    title: '한중현대음악학회 공식 사이트',
    category: 'web',
    description:
      '한국과 중국의 음악학자·연주자가 동시대 음악문화를 교류하는 국제학술단체의 공식 웹사이트입니다. 학술대회, 학술지 발간, 교류 콘서트 정보를 제공합니다.',
    image: shot('https://www.kccms.or.kr'),
    liveUrl: 'https://www.kccms.or.kr',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    features: [
      '국제학술대회·심포지엄 안내',
      '학술지 발간 및 논문 투고 정보',
      '한중 교류 콘서트·공동 프로젝트 소개',
      '연구자·연주자 네트워크 페이지',
    ],
    results: [
      '학술단체 위상 강화',
      '국제 교류 정보 일원화',
      '회원 접근성 향상',
    ],
    duration: '3주',
    year: '2026',
  },
  {
    id: 10,
    title: '진국논술 - 국어 학습 플랫폼',
    category: 'web',
    description:
      '국어 독해력 향상을 위한 온라인 학습 플랫폼입니다. 학생·교사 구분 로그인과 계정 관리 기반으로 체계적인 독해 학습 환경을 제공합니다.',
    image: shot('https://www.jinkuknon.com'),
    liveUrl: 'https://www.jinkuknon.com',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    features: [
      '학생·교사 구분 로그인',
      '학번·아이디 기반 계정 관리',
      '독해력 학습 콘텐츠 제공',
      '관리자 계정 발급 시스템',
    ],
    results: [
      '온라인 학습 체계화',
      '교사·학생 계정 관리 효율화',
      '학습 접근성 향상',
    ],
    duration: '5주',
    year: '2026',
  },
  {
    id: 11,
    title: '전수꽃 - 화환 주문 서비스',
    category: 'web',
    description:
      '화환 주문과 사용 후 수거 신청을 온라인으로 처리하는 화환 전문 주문·배송 서비스입니다. 카카오톡 채널 연동으로 간편한 문의를 지원합니다.',
    image: shot('https://kakao-chatbot-wreath.vercel.app'),
    liveUrl: 'https://kakao-chatbot-wreath.vercel.app',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', '카카오 채널', 'Tailwind CSS', 'Vercel'],
    features: [
      '화환 주문 양식 작성',
      '화환 수거 신청 접수',
      '카카오톡 채널 문의 연동',
      '주문 내역 관리',
    ],
    results: [
      '주문 프로세스 간소화',
      '수거 신청 자동화',
      '고객 문의 응대 효율화',
    ],
    duration: '3주',
    year: '2026',
  },
  {
    id: 12,
    title: '못앤트 - 옥외광고 정보 플랫폼',
    category: 'web',
    description:
      '지하철광고 등 다양한 옥외광고 공간을 검색·비교할 수 있는 B2B 광고 거래 정보 플랫폼입니다. 광고주와 매체 소유자를 연결합니다.',
    image: shot('https://motnt-ad-place.vercel.app'),
    liveUrl: 'https://motnt-ad-place.vercel.app',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', '지도 API', 'Tailwind CSS', 'Vercel'],
    features: [
      '광고 유형·지역별 필터 검색',
      '가격 범위 조회 및 정렬',
      '지도 기반 위치 정보 제공',
      '추천순·가격순 정렬',
    ],
    results: [
      '옥외광고 정보 디지털화',
      '광고주-매체 매칭 효율화',
      '투명한 가격 비교 제공',
    ],
    duration: '5주',
    year: '2026',
  },
];
