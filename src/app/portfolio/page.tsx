/**
 * Portfolio 페이지
 * JPEX 포트폴리오 및 프로젝트 쇼케이스
 */

'use client';

import { useState } from 'react';
import { Layout, Section } from '@/components/layout';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
      title: '기업 포트폴리오 웹사이트',
      category: 'web',
      description: 'Next.js와 Headless CMS를 활용하여 제작한 현대적이고 반응형 기업 홈페이지입니다.',
      image: '🏢',
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
    {
      id: 2,
      title: 'AI 기반 고객 상담 챗봇',
      category: 'ai',
      description: 'GPT-4 API를 활용한 24/7 자동 고객 상담 시스템으로 고객 만족도와 업무 효율성을 크게 향상시켰습니다.',
      image: '🤖',
      technologies: ['OpenAI GPT-4', 'LangChain', 'Python', 'FastAPI', 'React'],
      features: [
        'GPT-4 자연어 처리',
        '실시간 대화 인터페이스',
        '대화 히스토리 관리',
        '관리자 대시보드'
      ],
      results: [
        '상담 처리 시간 60% 단축',
        '고객 만족도 85% 향상',
        '운영 비용 50% 절감'
      ],
      duration: '4주',
      year: '2024'
    },
    {
      id: 3,
      title: '이커머스 플랫폼',
      category: 'web',
      description: '완전한 온라인 쇼핑몰 솔루션으로 결제, 재고 관리, 주문 처리 등 모든 기능이 통합되어 있습니다.',
      image: '🛒',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'AWS'],
      features: [
        '결제 시스템 통합',
        '재고 관리 시스템',
        '주문 추적 기능',
        '관리자 대시보드'
      ],
      results: [
        '온라인 매출 200% 증가',
        '주문 처리 자동화 90%',
        '월 활성 사용자 150% 증가'
      ],
      duration: '6주',
      year: '2024'
    },
    {
      id: 4,
      title: '레거시 시스템 현대화',
      category: 'consulting',
      description: '오래된 모놀리식 시스템을 현대적인 마이크로서비스 아키텍처로 전환하여 확장성과 유지보수성을 개선했습니다.',
      image: '🏗️',
      technologies: ['Docker', 'Kubernetes', 'Node.js', 'React', 'PostgreSQL'],
      features: [
        '마이크로서비스 설계',
        '컨테이너화',
        'API 게이트웨이 구축',
        '자동 배포 파이프라인'
      ],
      results: [
        '확장성 300% 향상',
        '유지보수 시간 70% 단축',
        '가용성 99.9% 달성'
      ],
      duration: '8주',
      year: '2024'
    },
    {
      id: 5,
      title: '문서 자동 분석 AI 시스템',
      category: 'ai',
      description: '대량의 PDF 문서를 자동으로 분석하고 요약하여 업무 효율성을 크게 향상시킨 AI 시스템입니다.',
      image: '📄',
      technologies: ['Python', 'GPT-4', 'LangChain', 'PyPDF2', 'Streamlit'],
      features: [
        'PDF 자동 파싱',
        'AI 기반 내용 요약',
        '키워드 추출',
        '일괄 처리 시스템'
      ],
      results: [
        '문서 처리 시간 80% 단축',
        '분석 정확도 95% 달성',
        '업무 생산성 120% 향상'
      ],
      duration: '3주',
      year: '2024'
    },
    {
      id: 6,
      title: 'SaaS 플랫폼 대시보드',
      category: 'web',
      description: '실시간 데이터 시각화와 사용자 관리 기능을 갖춘 종합적인 SaaS 관리 대시보드입니다.',
      image: '📊',
      technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'WebSocket'],
      features: [
        '실시간 데이터 시각화',
        '사용자 권한 관리',
        '알림 시스템',
        'API 관리 도구'
      ],
      results: [
        '관리 효율성 150% 향상',
        '데이터 접근성 개선',
        '사용자 만족도 90%'
      ],
      duration: '5주',
      year: '2023'
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

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-4xl font-black text-green">{projects.length}+</div>
              <div className="text-sm text-gray-500">완료 프로젝트</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green">100%</div>
              <div className="text-sm text-gray-500">고객 만족도</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green">5년+</div>
              <div className="text-sm text-gray-500">개발 경험</div>
            </div>
          </div>
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
              {/* Project Icon */}
              <div className="relative mb-6">
                <div className="aspect-video bg-gradient-to-br from-green/10 to-green/5 rounded-xl flex items-center justify-center border border-gray-800 group-hover:border-green transition-all duration-300">
                  <motion.div
                    className="text-7xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {project.image}
                  </motion.div>
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
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Tech Stats */}
      <Section background="secondary" padding="xl">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
              기술 <span className="text-green">경험</span>
            </h2>
            <p className="text-lg text-gray-400">
              다양한 프로젝트를 통해 축적한 기술별 경험
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚛️', title: 'Frontend', count: 8, desc: 'React, Next.js 등' },
              { icon: '⚙️', title: 'Backend', count: 6, desc: 'Node.js, Python 등' },
              { icon: '🤖', title: 'AI/ML', count: 4, desc: 'OpenAI, LangChain 등' },
              { icon: '☁️', title: 'Cloud', count: 5, desc: 'AWS, Docker 등' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black-light p-6 lg:p-8 rounded-2xl border-2 border-gray-800 hover:border-green transition-all duration-300 hover:shadow-glow-green-sm text-center"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{stat.title}</h3>
                <div className="text-3xl font-black text-green mb-2">{stat.count}개</div>
                <p className="text-sm text-gray-500">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/quote"
              className="group relative px-8 py-4 text-lg font-bold text-black bg-green rounded-lg overflow-hidden shadow-glow-green-sm hover:shadow-glow-green transition-all duration-300"
            >
              <span className="absolute inset-0 bg-green-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative z-10 flex items-center gap-2">
                프로젝트 시작하기
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/reviews"
              className="px-8 py-4 text-lg font-bold text-white border-2 border-green rounded-lg hover:bg-green/10 transition-all duration-300"
            >
              고객 후기 보기
            </Link>
          </div>
        </motion.div>
      </Section>
    </Layout>
  );
}
