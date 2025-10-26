/**
 * Services 페이지
 * JPEX 제공 서비스 상세 정보
 */

'use client';

import { Layout, Section } from '@/components/layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { WebDevIcon, AIIcon, CloudIcon, EducationIcon } from '@/components/icons';

export default function Services() {
  const services = [
    {
      id: 'web',
      icon: <WebDevIcon size={80} />,
      title: '웹/앱 개발',
      description: 'React, Next.js 기반의 현대적이고 반응형 웹 애플리케이션 및 모바일 앱 개발',
      features: [
        '반응형 웹 디자인 (Mobile First)',
        'SEO 최적화 및 성능 튜닝',
        'Progressive Web App (PWA)',
        '실시간 데이터 처리 및 WebSocket',
        '타사 API 연동 및 결제 시스템',
        '관리자 대시보드 구축'
      ],
      technologies: [
        'React', 'Next.js', 'TypeScript', 'Tailwind CSS',
        'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB'
      ]
    },
    {
      id: 'ai',
      icon: <AIIcon size={80} />,
      title: 'AI 솔루션',
      description: 'OpenAI API 및 최신 AI 기술을 활용한 맞춤형 자동화 및 지능형 시스템 개발',
      features: [
        '챗봇 개발 및 고도화',
        '문서 자동 분석 및 요약',
        '이미지/음성 인식 시스템',
        '자동 콘텐츠 생성',
        '개인화 추천 엔진',
        'AI 기반 업무 자동화'
      ],
      technologies: [
        'OpenAI GPT-4', 'LangChain', 'Python', 'FastAPI',
        'TensorFlow', 'PyTorch', 'Hugging Face', 'Pinecone'
      ]
    },
    {
      id: 'cloud',
      icon: <CloudIcon size={80} />,
      title: '클라우드 & DevOps',
      description: '클라우드 인프라 구축, 자동화 배포, 시스템 모니터링 및 성능 최적화',
      features: [
        '클라우드 아키텍처 설계 (AWS, GCP)',
        '컨테이너화 및 오케스트레이션',
        'CI/CD 파이프라인 구축',
        '자동화 배포 시스템',
        '모니터링 및 로그 관리',
        '성능 분석 및 최적화'
      ],
      technologies: [
        'AWS', 'Google Cloud', 'Docker', 'Kubernetes',
        'Terraform', 'Jenkins', 'GitHub Actions', 'Monitoring Tools'
      ]
    },
    {
      id: 'education',
      icon: <EducationIcon size={80} />,
      title: '교육 & 컨설팅',
      description: '웹/앱부터 AI, 클라우드까지 전 분야를 아우르는 실무 중심 교육 및 기술 컨설팅',
      features: [
        '풀스택 개발 (Frontend/Backend)',
        'AI/ML 실무 활용 교육',
        '클라우드 & DevOps 구축',
        '프로젝트 기반 실전 교육',
        '기술 아키텍처 설계 컨설팅',
        '기업 맞춤형 기술 교육 프로그램'
      ],
      technologies: [
        'Web/App Dev', 'AI/ML', 'Cloud/DevOps',
        'React', 'Next.js', 'Node.js', 'Python',
        'OpenAI', 'LangChain', 'AWS', 'Docker'
      ]
    }
  ];

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
            제공 <span className="text-green">서비스</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            최신 기술과 풍부한 경험을 바탕으로<br />
            고품질의 디지털 솔루션을 제공합니다
          </p>
        </motion.div>
      </Section>

      {/* Services Detail */}
      <Section background="secondary" padding="xl">
        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto"
            >
              {/* Service Header */}
              <div className="text-center mb-12">
                <motion.div
                  className="inline-flex justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {service.icon}
                </motion.div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  {service.description}
                </p>
              </div>

              {/* Features & Technologies */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Features */}
                <div className="bg-black-light p-6 lg:p-8 rounded-2xl border-2 border-gray-800 hover:border-green transition-all duration-300 hover:shadow-glow-green-sm">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-green">✓</span> 주요 서비스
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-green text-sm mt-1">•</span>
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="bg-black-light p-6 lg:p-8 rounded-2xl border-2 border-gray-800 hover:border-green transition-all duration-300 hover:shadow-glow-green-sm">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-green">⚡</span> 사용 기술
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-sm bg-green/10 text-green rounded-full border border-green/30 hover:bg-green/20 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              {index < services.length - 1 && (
                <div className="mt-24 border-t border-gray-800"></div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Pricing Info Section */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green/10 to-green/5 p-8 lg:p-12 rounded-2xl border-2 border-green/30"
          >
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-white">
                맞춤형 <span className="text-green">견적</span> 제공
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                모든 프로젝트는 고유한 요구사항을 가지고 있습니다.<br />
                정확한 견적은 상담을 통해 제공해드립니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="text-sm font-semibold text-green">투명한 가격</div>
                  <div className="text-xs text-gray-500 mt-1">숨겨진 비용 없음</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-sm font-semibold text-green">빠른 견적</div>
                  <div className="text-xs text-gray-500 mt-1">24시간 내 회신</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🤝</div>
                  <div className="text-sm font-semibold text-green">유연한 협의</div>
                  <div className="text-xs text-gray-500 mt-1">예산에 맞춰 조정</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="secondary" padding="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
            프로젝트를 <span className="text-green">시작</span>하세요
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            무료 상담을 통해 프로젝트 요구사항을 논의하고<br />
            최적의 솔루션을 제안해드리겠습니다
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

          {/* Contact Info */}
          <div className="pt-8 border-t border-gray-800/50 max-w-2xl mx-auto">
            <p className="text-sm text-gray-500">
              📞 <a href="tel:010-2174-5072" className="text-green hover:underline">010-2174-5072</a> |
              ✉️ <a href="mailto:jslovejs182@gmail.com" className="text-green hover:underline ml-2">jslovejs182@gmail.com</a>
            </p>
          </div>
        </motion.div>
      </Section>
    </Layout>
  );
}
