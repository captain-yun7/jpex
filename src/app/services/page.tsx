/**
 * Services 페이지
 * JPEX 제공 서비스 상세 정보
 */

'use client';

import { Layout, Section } from '@/components/layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { WebDevIcon, AIIcon, CloudIcon } from '@/components/icons';

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
      ],
      pricing: [
        {
          name: '기본 패키지',
          price: '200만원~',
          duration: '2-3주',
          features: [
            '5-10 페이지 웹사이트',
            '반응형 디자인',
            '기본 SEO 설정',
            '1개월 무료 유지보수'
          ]
        },
        {
          name: '프리미엄 패키지',
          price: '500만원~',
          duration: '4-6주',
          features: [
            '복잡한 기능의 웹 애플리케이션',
            '사용자 인증 시스템',
            '데이터베이스 연동',
            '관리자 패널',
            '3개월 무료 유지보수'
          ]
        },
        {
          name: '엔터프라이즈',
          price: '협의',
          duration: '8주+',
          features: [
            '대규모 플랫폼 개발',
            '마이크로서비스 아키텍처',
            '고가용성 인프라',
            '24/7 모니터링',
            '지속적인 기술 지원'
          ]
        }
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
      ],
      pricing: [
        {
          name: '기본 챗봇',
          price: '150만원~',
          duration: '1-2주',
          features: [
            '간단한 Q&A 챗봇',
            '웹사이트 임베딩',
            '기본 학습 데이터 구축',
            '1개월 무료 튜닝'
          ]
        },
        {
          name: '고급 AI 시스템',
          price: '400만원~',
          duration: '3-5주',
          features: [
            '복잡한 업무 자동화',
            '문서 분석 및 처리',
            '맞춤형 AI 모델 구축',
            '대화형 인터페이스',
            '3개월 무료 지원'
          ]
        },
        {
          name: '엔터프라이즈 AI',
          price: '협의',
          duration: '6주+',
          features: [
            '대규모 AI 플랫폼',
            '실시간 학습 시스템',
            '고성능 추론 엔진',
            '클라우드 인프라',
            '지속적인 모델 업데이트'
          ]
        }
      ]
    },
    {
      id: 'cloud',
      icon: <CloudIcon size={80} />,
      title: '클라우드 & 컨설팅',
      description: '시스템 아키텍처 설계, 성능 최적화, 클라우드 인프라 구축 및 기술 전략 수립',
      features: [
        '클라우드 아키텍처 설계 (AWS, GCP)',
        '컨테이너화 및 오케스트레이션',
        'CI/CD 파이프라인 구축',
        '성능 분석 및 최적화',
        '코드 리뷰 및 품질 개선',
        '기술 스택 선정 및 팀 멘토링'
      ],
      technologies: [
        'AWS', 'Google Cloud', 'Docker', 'Kubernetes',
        'Terraform', 'Jenkins', 'GitHub Actions', 'Monitoring Tools'
      ],
      pricing: [
        {
          name: '코드 리뷰',
          price: '50만원~',
          duration: '1주',
          features: [
            '코드베이스 전체 리뷰',
            '개선사항 보고서',
            '리팩토링 가이드',
            '1회 화상 미팅'
          ]
        },
        {
          name: '아키텍처 컨설팅',
          price: '200만원~',
          duration: '2-3주',
          features: [
            '시스템 아키텍처 설계',
            '기술 스택 추천',
            '개발 로드맵 제작',
            '팀 워크샵 진행'
          ]
        },
        {
          name: '장기 컨설팅',
          price: '협의',
          duration: '1-6개월',
          features: [
            '지속적인 기술 자문',
            '정기 코드 리뷰',
            '성능 모니터링',
            '팀 교육 및 멘토링'
          ]
        }
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
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

              {/* Pricing Packages */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  가격 패키지
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {service.pricing.map((pkg, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="group bg-black-light p-6 lg:p-8 rounded-2xl border-2 border-gray-800 hover:border-green transition-all duration-300 hover:shadow-glow-green-sm"
                    >
                      <div className="text-center mb-6">
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-green transition-colors duration-300">
                          {pkg.name}
                        </h4>
                        <div className="text-3xl font-black text-green mb-1">
                          {pkg.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          개발 기간: {pkg.duration}
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {pkg.features.map((feature, fIdx) => (
                          <li key={fIdx} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-green mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
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

      {/* CTA Section */}
      <Section padding="xl">
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/quote"
              className="group relative px-8 py-4 text-lg font-bold text-black bg-green rounded-lg overflow-hidden shadow-glow-green-sm hover:shadow-glow-green transition-all duration-300"
            >
              <span className="absolute inset-0 bg-green-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative z-10 flex items-center gap-2">
                견적 요청하기
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 text-lg font-bold text-white border-2 border-green rounded-lg hover:bg-green/10 transition-all duration-300"
            >
              상담 문의
            </Link>
          </div>

          {/* Contact Info */}
          <div className="pt-8 border-t border-gray-800/50 max-w-2xl mx-auto">
            <p className="text-sm text-gray-500">
              📞 <a href="tel:010-2648-5072" className="text-green hover:underline">010-2648-5072</a> |
              ✉️ <a href="mailto:jslovejs182@gmail.com" className="text-green hover:underline ml-2">jslovejs182@gmail.com</a>
            </p>
          </div>
        </motion.div>
      </Section>
    </Layout>
  );
}
