/**
 * Portfolio 페이지
 * JPEX 포트폴리오 및 프로젝트 쇼케이스
 */

'use client';

import { useState } from 'react';
import { Layout, Section } from '@/components/layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'web', name: '웹/앱 개발' },
    { id: 'ai', name: 'AI 솔루션' },
    { id: 'consulting', name: '컨설팅' }
  ];

  const projects = [
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

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <Layout>
      {/* Hero Section */}
      <Section padding="xl" className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            프로젝트 <span className="text-green">포트폴리오</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            다양한 분야의 성공적인 프로젝트들을 통해<br />
            쌓은 경험과 노하우를 확인해보세요
          </p>
        </motion.div>
      </Section>

      {/* Filter Tabs */}
      <Section background="secondary" padding="sm">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-green text-black shadow-glow-green-sm'
                  : 'bg-black-light text-gray-400 border border-gray-800 hover:border-green'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Projects Grid */}
      <Section padding="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="group bg-black-light p-6 lg:p-8 rounded-2xl border-2 border-gray-800 hover:border-green transition-all duration-300 hover:shadow-glow-green-sm"
            >
              {/* Project Image */}
              <div className="relative mb-6">
                <div className="aspect-video bg-gradient-to-br from-green/10 to-green/5 rounded-xl overflow-hidden border border-gray-800 group-hover:border-green transition-all duration-300">
                  <div className="relative w-full h-full bg-gray-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Year Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-black-light/90 text-gray-400 text-xs font-semibold rounded-full border border-gray-800">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                {/* Category & Duration */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-green/10 text-green text-sm font-medium rounded-full border border-green/30">
                    {categories.find(cat => cat.id === project.category)?.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {project.duration}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">기술 스택</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs bg-green/10 text-green rounded-full border border-green/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">주요 기능</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-green text-sm mt-0.5">✓</span>
                        <span className="text-sm text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-semibold text-green mb-3">주요 성과</h4>
                  <div className="space-y-2">
                    {project.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-green">🎯</span>
                        <span className="text-sm font-medium text-gray-300">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                {(project.liveUrl || project.githubUrl) && (
                  <div className="pt-4 border-t border-gray-800 flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green text-black font-semibold rounded-lg hover:bg-green-light transition-all duration-300 group/btn"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>사이트 보기</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
            다음 프로젝트의 주인공은 <span className="text-green">당신</span>입니다
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            성공적인 프로젝트 경험을 바탕으로<br />
            여러분의 아이디어를 현실로 만들어드리겠습니다
          </p>

          <Link
            href="/quote"
            className="group relative inline-flex px-8 py-4 text-lg font-bold text-black bg-green rounded-lg overflow-hidden shadow-glow-green-sm hover:shadow-glow-green transition-all duration-300"
          >
            <span className="absolute inset-0 bg-green-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative z-10 flex items-center gap-2">
              견적 문의하기
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </Section>
    </Layout>
  );
}
