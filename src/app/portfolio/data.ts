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
  /** 내부 상세 페이지 경로 (있으면 카드 클릭 시 liveUrl 대신 이동) */
  detailHref?: string;
  /** 납품처·파트너사 */
  clients?: string[];
}

export const projects: Project[] = [
  {
    id: 9,
    title: 'DomainXiom - LLM 학습/평가 데이터셋 제작 솔루션',
    category: 'ai',
    description:
      '도메인 전문 문서를 OCR로 디지털화하고 RAG 파이프라인으로 QA 데이터셋을 생성한 뒤, 전문가(SME) 검수 웹앱으로 품질을 보증하는 고품질 LLM 학습/평가 데이터셋 제작 솔루션입니다.',
    image: shot('https://domainxiom.vercel.app'),
    liveUrl: 'https://domainxiom.vercel.app',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'RAG', 'OCR'],
    features: [
      '전문 문서 아카이브 OCR 디지털화 (37,000+ 페이지)',
      'RAG 파이프라인 기반 QA 데이터셋 자동 생성',
      '전문가(SME) 다중사용자 검수 워크스페이스 (HITL)',
      '검수 합의(IAA)·진행률 모니터링 및 데이터셋 반출',
    ],
    results: [
      '고품질 LLM 학습/평가 데이터셋 구축',
      '전문가 검수로 데이터 품질·저작권 보증',
      '플리토·업스테이지·에이치제이엘 납품',
    ],
    clients: ['플리토', '업스테이지', '에이치제이엘'],
    duration: '12주',
    year: '2026',
  },
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
    id: 5,
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
    id: 6,
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
    id: 7,
    title: '픽앤뷰 - 리뷰 캠페인 커뮤니티 플랫폼',
    category: 'web',
    description:
      'Dior·YSL·Dyson 등 유명 브랜드 제품을 체험하고 리뷰를 공유하는 얼리어답터 리뷰 커뮤니티 플랫폼입니다. 캠페인 신청부터 리뷰 등록, 유튜브 콘텐츠 연동까지 지원합니다.',
    image: shot('https://marieclairepicknview.com'),
    liveUrl: 'https://marieclairepicknview.com',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    features: [
      '브랜드 제품 체험 캠페인 신청·선정',
      '체험 후기 리뷰 등록 및 공유',
      '유튜브·인스타그램 소셜 연동',
      '마이페이지 활동 관리',
    ],
    results: [
      '브랜드-인플루언서 매칭 자동화',
      '캠페인 운영 효율화',
      '커뮤니티 참여 활성화',
    ],
    duration: '5주',
    year: '2026',
  },
  {
    id: 8,
    title: '케이씨파워 - 전기설비 제조기업 사이트',
    category: 'web',
    description:
      '30년 전통의 변압기 외함·수배전반 제조 전문업체 공식 홈페이지입니다. 제품 카탈로그, 시공 사례, 온라인 견적 문의 시스템을 갖춘 B2B 기업 사이트입니다.',
    image: shot('https://kcpower-v1.vercel.app'),
    liveUrl: 'https://kcpower.co.kr',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Vercel'],
    features: [
      '변압기 외함·수배전반 제품 카탈로그',
      '온라인 견적 문의 시스템',
      '시공 사례 및 인증 자료실',
      '관리자 콘텐츠 관리 기능',
    ],
    results: [
      '주요 전력기업 레퍼런스 강조',
      '견적 문의 온라인화',
      'B2B 신뢰도 강화',
    ],
    duration: '5주',
    year: '2026',
  },
];
