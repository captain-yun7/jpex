/**
 * Services 페이지
 * JPEX 제공 서비스 상세 정보
 */

import { Layout, Section } from '@/components/layout';
import { PROJECT_CATEGORIES } from '@/lib/constants';

export default function Services() {
  const services = [
    {
      id: 'web-development',
      icon: '🌐',
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
        'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB',
        'AWS', 'Vercel', 'Docker'
      ],
      pricing: {
        basic: {
          name: '기본 패키지',
          price: '200만원 ~',
          duration: '2-3주',
          features: [
            '5-10 페이지 웹사이트',
            '반응형 디자인',
            '기본 SEO 설정',
            '1개월 무료 유지보수'
          ]
        },
        premium: {
          name: '프리미엄 패키지',
          price: '500만원 ~',
          duration: '4-6주',
          features: [
            '복잡한 기능의 웹 애플리케이션',
            '사용자 인증 시스템',
            '데이터베이스 연동',
            '관리자 패널',
            '3개월 무료 유지보수'
          ]
        },
        enterprise: {
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
      },
      portfolio: [
        {
          name: '기업 포트폴리오 사이트',
          description: 'Next.js와 Headless CMS를 활용한 기업 홈페이지',
          tech: ['Next.js', 'Strapi', 'Tailwind CSS']
        },
        {
          name: 'E-commerce 플랫폼',
          description: '결제 시스템이 통합된 온라인 쇼핑몰',
          tech: ['React', 'Node.js', 'Stripe', 'PostgreSQL']
        }
      ]
    },
    {
      id: 'ai-solution',
      icon: '🤖',
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
        'TensorFlow', 'PyTorch', 'Hugging Face',
        'Pinecone', 'Chroma', 'Streamlit'
      ],
      pricing: {
        basic: {
          name: '기본 챗봇',
          price: '150만원 ~',
          duration: '1-2주',
          features: [
            '간단한 Q&A 챗봇',
            '웹사이트 임베딩',
            '기본 학습 데이터 구축',
            '1개월 무료 튜닝'
          ]
        },
        premium: {
          name: '고급 AI 시스템',
          price: '400만원 ~',
          duration: '3-5주',
          features: [
            '복잡한 업무 자동화',
            '문서 분석 및 처리',
            '맞춤형 AI 모델 구축',
            '대화형 인터페이스',
            '3개월 무료 지원'
          ]
        },
        enterprise: {
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
      },
      portfolio: [
        {
          name: '고객 상담 챗봇',
          description: 'GPT-4 기반 24/7 고객 지원 시스템',
          tech: ['OpenAI API', 'LangChain', 'FastAPI', 'React']
        },
        {
          name: '문서 자동 분석 시스템',
          description: 'PDF 문서 자동 분석 및 요약 솔루션',
          tech: ['Python', 'GPT-4', 'PyPDF2', 'Streamlit']
        }
      ]
    },
    {
      id: 'consulting',
      icon: '💡',
      title: '기술 컨설팅',
      description: '시스템 아키텍처 설계, 성능 최적화, 기술 전략 수립 및 개발팀 멘토링',
      features: [
        '기술 스택 선정 및 아키텍처 설계',
        '코드 리뷰 및 품질 개선',
        '성능 분석 및 최적화',
        '개발 프로세스 개선',
        '팀 멘토링 및 교육',
        'DevOps 및 CI/CD 구축'
      ],
      technologies: [
        'AWS', 'Google Cloud', 'Docker', 'Kubernetes',
        'Terraform', 'Jenkins', 'GitHub Actions',
        'Monitoring Tools', 'Database Optimization'
      ],
      pricing: {
        basic: {
          name: '코드 리뷰',
          price: '50만원 ~',
          duration: '1주',
          features: [
            '코드베이스 전체 리뷰',
            '개선사항 보고서',
            '리팩토링 가이드',
            '1회 화상 미팅'
          ]
        },
        premium: {
          name: '아키텍처 컨설팅',
          price: '200만원 ~',
          duration: '2-3주',
          features: [
            '시스템 아키텍처 설계',
            '기술 스택 추천',
            '개발 로드맵 제작',
            '팀 워크샵 진행'
          ]
        },
        enterprise: {
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
      },
      portfolio: [
        {
          name: '스타트업 기술 전략 수립',
          description: '초기 스타트업의 기술 스택 선정 및 개발 전략',
          tech: ['Architecture Design', 'AWS', 'Microservices']
        },
        {
          name: '레거시 시스템 현대화',
          description: '기존 모놀리식 시스템을 마이크로서비스로 전환',
          tech: ['System Migration', 'Docker', 'API Gateway']
        }
      ]
    }
  ];

  const process = [
    {
      step: '01',
      title: '요구사항 분석',
      description: '클라이언트와의 상세한 미팅을 통해 프로젝트 목표, 요구사항, 제약사항을 명확히 정의합니다.',
      icon: '📋'
    },
    {
      step: '02',
      title: '기술 설계',
      description: '최적의 기술 스택을 선정하고 시스템 아키텍처를 설계합니다. 확장성과 유지보수성을 고려합니다.',
      icon: '🏗️'
    },
    {
      step: '03',
      title: '프로토타입 개발',
      description: '핵심 기능을 중심으로 MVP를 개발하여 초기 피드백을 받고 방향성을 검증합니다.',
      icon: '⚡'
    },
    {
      step: '04',
      title: '반복적 개발',
      description: 'Agile 방법론을 적용하여 2주 단위로 기능을 개발하고 지속적으로 피드백을 반영합니다.',
      icon: '🔄'
    },
    {
      step: '05',
      title: '테스트 & 배포',
      description: '철저한 테스트를 통해 품질을 보장하고 안정적인 프로덕션 환경에 배포합니다.',
      icon: '🚀'
    },
    {
      step: '06',
      title: '유지보수 & 지원',
      description: '배포 후 지속적인 모니터링과 버그 수정, 기능 개선을 통해 서비스를 안정적으로 운영합니다.',
      icon: '🛠️'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Section padding="xl" id="services-hero">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
            전문 <span className="text-accent">개발 서비스</span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            최신 기술과 풍부한 경험을 바탕으로 고품질의 디지털 솔루션을 제공합니다.
            <br />
            스타트업부터 대기업까지, 규모에 관계없이 최적의 결과를 약속드립니다.
          </p>
        </div>
      </Section>

      {/* 서비스 상세 */}
      <Section background="secondary" padding="xl">
        <div className="space-y-20">
          {services.map((service, index) => (
            <div key={service.id} className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* 서비스 소개 */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-5xl">{service.icon}</div>
                      <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                        {service.title}
                      </h2>
                    </div>
                    
                    <p className="text-lg text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* 주요 기능 */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-text-primary">
                      주요 서비스
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-2">
                          <span className="text-accent mt-1">✓</span>
                          <span className="text-sm text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 기술 스택 */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-text-primary">
                      사용 기술
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* 가격 및 포트폴리오 */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {/* 가격 패키지 */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-text-primary">
                      가격 패키지
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(service.pricing).map(([key, pkg]) => (
                        <div
                          key={key}
                          className="bg-background-primary p-6 rounded-xl border border-secondary hover:border-accent transition-colors duration-300"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold text-text-primary">{pkg.name}</h4>
                              <p className="text-sm text-text-muted">개발 기간: {pkg.duration}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-bold text-accent">{pkg.price}</span>
                            </div>
                          </div>
                          <ul className="space-y-1">
                            {pkg.features.map((feature, fIndex) => (
                              <li key={fIndex} className="text-sm text-text-secondary flex items-start">
                                <span className="text-accent mr-2 mt-0.5">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 포트폴리오 예시 */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-text-primary">
                      관련 프로젝트
                    </h3>
                    <div className="space-y-4">
                      {service.portfolio.map((project, pIndex) => (
                        <div
                          key={pIndex}
                          className="bg-background-primary p-6 rounded-xl border border-secondary"
                        >
                          <h4 className="font-semibold text-text-primary mb-2">
                            {project.name}
                          </h4>
                          <p className="text-sm text-text-secondary mb-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.tech.map((tech, tIndex) => (
                              <span
                                key={tIndex}
                                className="px-2 py-0.5 text-xs bg-accent/10 text-accent rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 개발 프로세스 */}
      <Section padding="xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              개발 프로세스
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              체계적이고 투명한 개발 프로세스로 프로젝트의 성공을 보장합니다
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((step, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  {/* 연결선 (데스크톱에서만 표시) */}
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-accent to-transparent z-0"></div>
                  )}
                  
                  <div className="relative bg-background-secondary p-8 rounded-2xl border border-secondary hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 z-10">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent font-bold text-lg">
                        {step.step}
                      </div>
                      <div className="text-3xl">{step.icon}</div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="secondary" padding="xl">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            프로젝트를 시작할 준비가 되셨나요?
          </h2>
          
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            무료 상담을 통해 프로젝트 요구사항을 논의하고 
            최적의 솔루션을 제안해드리겠습니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold min-h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              견적 요청하기
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold min-h-12 bg-transparent text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              상담 문의
            </a>
          </div>
          
          <div className="pt-8 border-t border-secondary/50">
            <p className="text-sm text-text-muted">
              📞 문의: <a href="tel:010-2648-5072" className="text-accent hover:underline">010-2648-5072</a> | 
              ✉️ 이메일: <a href="mailto:jslovejs182@gmail.com" className="text-accent hover:underline">jslovejs182@gmail.com</a>
            </p>
          </div>
        </div>
      </Section>
    </Layout>
  );
}