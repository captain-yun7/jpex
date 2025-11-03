/**
 * Portfolio 프로젝트 데이터
 */

export const categories = [
  { id: 'all', name: '전체' },
  { id: 'web', name: '웹/앱 개발' },
  { id: 'ai', name: 'AI 솔루션' },
  { id: 'consulting', name: '컨설팅' }
];

export const projects = [
  {
    id: 1,
    title: 'KCPOWER 회사 홈페이지',
    category: 'web',
    description: '친환경 에너지 솔루션 전문기업의 현대적이고 전문적인 기업 홈페이지를 제작했습니다.',
    image: '/images/projects/project1.png',
    liveUrl: '',
    githubUrl: '',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SEO'],
    features: [
      '반응형 웹 디자인',
      'SEO 최적화',
      '회사 소개 및 사업 영역 구성',
      '문의 시스템'
    ],
    results: [
      '깔끔하고 전문적인 UI/UX',
      '빠른 로딩 속도',
      '모바일 최적화'
    ],
    duration: '3주',
    year: '2025'
  },
  {
    id: 2,
    title: 'FaceFalcon - AI 얼굴분석 서비스',
    category: 'ai',
    description: 'AI 기반 얼굴 분석 기술을 활용한 혁신적인 서비스 플랫폼입니다.',
    image: '/images/projects/project2.png',
    liveUrl: '',
    githubUrl: '',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'OpenCV'],
    features: [
      'AI 얼굴 분석 알고리즘',
      '실시간 이미지 처리',
      '사용자 대시보드',
      '분석 결과 시각화'
    ],
    results: [
      '정확한 얼굴 분석',
      '빠른 처리 속도',
      '직관적인 사용자 경험'
    ],
    duration: '5주',
    year: '2025'
  },
  {
    id: 3,
    title: '온라인 강의 플랫폼',
    category: 'web',
    description: '학생들을 위한 온라인 학습 관리 시스템으로 강의 수강, 과제 제출, 성적 관리 등의 기능을 제공합니다.',
    image: '/images/projects/project3.png',
    liveUrl: '',
    githubUrl: '',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'WebSocket'],
    features: [
      '강의 동영상 스트리밍',
      '과제 제출 시스템',
      '실시간 채팅',
      '학습 진도 관리'
    ],
    results: [
      '학습 효율성 향상',
      '편리한 과제 관리',
      '학생-교사 소통 강화'
    ],
    duration: '6주',
    year: '2025'
  },
  {
    id: 4,
    title: '염창역더채움 분양사이트',
    category: 'web',
    description: '부동산 분양 정보를 효과적으로 전달하는 프리미엄 분양 웹사이트입니다.',
    image: '/images/projects/project4.png',
    liveUrl: '',
    githubUrl: '',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    features: [
      '매력적인 인터랙티브 디자인',
      '단지 정보 상세 페이지',
      '위치 정보 지도 연동',
      '분양 문의 시스템'
    ],
    results: [
      '프리미엄 브랜드 이미지 구축',
      '높은 사용자 참여도',
      '효과적인 정보 전달'
    ],
    duration: '4주',
    year: '2025'
  },
  {
    id: 5,
    title: '고등국어 시험 시스템',
    category: 'web',
    description: '학생들의 국어 학습을 돕는 온라인 시험 및 평가 시스템입니다.',
    image: '/images/projects/project5.png',
    liveUrl: '',
    githubUrl: '',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    features: [
      '온라인 시험 기능',
      '자동 채점 시스템',
      '성적 분석 리포트',
      '문제은행 관리'
    ],
    results: [
      '시험 관리 효율화',
      '즉각적인 성적 확인',
      '학습 분석 데이터 제공'
    ],
    duration: '5주',
    year: '2025'
  },
  {
    id: 6,
    title: '국가대표광고 - 광고회사 홈페이지',
    category: 'web',
    description: '광고 전문 기업의 포트폴리오와 서비스를 효과적으로 소개하는 웹사이트입니다.',
    image: '/images/projects/project6.png',
    liveUrl: '',
    githubUrl: '',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    features: [
      '포트폴리오 갤러리',
      '서비스 소개 페이지',
      '반응형 디자인',
      '문의 시스템'
    ],
    results: [
      '전문적인 브랜드 이미지',
      '포트폴리오 효과적 전달',
      '고객 문의 증가'
    ],
    duration: '3주',
    year: '2025'
  },
  {
    id: 7,
    title: '병원 홈페이지',
    category: 'web',
    description: '의료 기관의 전문성과 신뢰를 전달하는 병원 홈페이지입니다.',
    image: '/images/projects/project7.png',
    liveUrl: '',
    githubUrl: '',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    features: [
      '진료 과목 소개',
      '의료진 프로필',
      '온라인 예약 시스템',
      '병원 소식 게시판'
    ],
    results: [
      '환자 편의성 향상',
      '온라인 예약 활성화',
      '병원 신뢰도 제고'
    ],
    duration: '4주',
    year: '2025'
  },
  {
    id: 8,
    title: '유통회사 홈페이지',
    category: 'web',
    description: '유통 전문 기업의 사업 영역과 제품을 소개하는 기업 홈페이지입니다.',
    image: '/images/projects/project8.png',
    liveUrl: '',
    githubUrl: '',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: [
      '회사 소개 및 연혁',
      '제품 카탈로그',
      '파트너사 관리',
      '문의 시스템'
    ],
    results: [
      '기업 신뢰도 향상',
      '제품 정보 효과적 전달',
      'B2B 파트너십 강화'
    ],
    duration: '3주',
    year: '2025'
  }
];
