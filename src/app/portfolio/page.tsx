/**
 * Portfolio 페이지
 * JPEX 포트폴리오 및 프로젝트 쇼케이스
 */

'use client';

import { useState } from 'react';
import { Layout, Section } from '@/components/layout';
import Link from 'next/link';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: '전체', count: 12 },
    { id: 'web', name: '웹 개발', count: 6 },
    { id: 'ai', name: 'AI 솔루션', count: 3 },
    { id: 'consulting', name: '컨설팅', count: 3 }
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
        '다국어 지원',
        '성능 최적화'
      ],
      results: {
        performance: '로딩 속도 70% 향상',
        seo: 'SEO 점수 95점 달성',
        conversion: '문의 전환율 40% 증가'
      },
      duration: '3주',
      year: '2024',
      client: 'IT 스타트업',
      status: 'completed'
    },
    {
      id: 2,
      title: 'AI 기반 고객 상담 챗봇',
      category: 'ai',
      description: 'GPT-4 API를 활용한 24/7 자동 고객 상담 시스템으로 고객 만족도와 업무 효율성을 크게 향상시켰습니다.',
      image: '🤖',
      technologies: ['OpenAI GPT-4', 'LangChain', 'Python', 'FastAPI', 'React', 'PostgreSQL'],
      features: [
        'GPT-4 기반 자연어 처리',
        '실시간 대화 인터페이스',
        '대화 히스토리 관리',
        '감정 분석 기능',
        '관리자 대시보드'
      ],
      results: {
        efficiency: '상담 처리 시간 60% 단축',
        satisfaction: '고객 만족도 85% 향상',
        cost: '운영 비용 50% 절감'
      },
      duration: '4주',
      year: '2024',
      client: '전자상거래 업체',
      status: 'completed'
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
        '리뷰 및 평점 시스템',
        '관리자 대시보드'
      ],
      results: {
        sales: '온라인 매출 200% 증가',
        orders: '주문 처리 자동화 90%',
        users: '월 활성 사용자 150% 증가'
      },
      duration: '6주',
      year: '2024',
      client: '패션 브랜드',
      status: 'completed'
    },
    {
      id: 4,
      title: '레거시 시스템 현대화',
      category: 'consulting',
      description: '오래된 모놀리식 시스템을 현대적인 마이크로서비스 아키텍처로 전환하여 확장성과 유지보수성을 개선했습니다.',
      image: '🏗️',
      technologies: ['Docker', 'Kubernetes', 'Node.js', 'React', 'PostgreSQL', 'Redis'],
      features: [
        '마이크로서비스 아키텍처 설계',
        '컨테이너화 및 오케스트레이션',
        'API 게이트웨이 구축',
        '모니터링 시스템 구축',
        '자동 배포 파이프라인'
      ],
      results: {
        scalability: '시스템 확장성 300% 향상',
        maintenance: '유지보수 시간 70% 단축',
        uptime: '시스템 가용성 99.9% 달성'
      },
      duration: '8주',
      year: '2024',
      client: '제조업체',
      status: 'completed'
    },
    {
      id: 5,
      title: '문서 자동 분석 AI 시스템',
      category: 'ai',
      description: '대량의 PDF 문서를 자동으로 분석하고 요약하여 업무 효율성을 크게 향상시킨 AI 시스템입니다.',
      image: '📄',
      technologies: ['Python', 'GPT-4', 'LangChain', 'PyPDF2', 'Streamlit', 'PostgreSQL'],
      features: [
        'PDF 문서 자동 파싱',
        'AI 기반 내용 요약',
        '키워드 추출 기능',
        '검색 기능 구현',
        '일괄 처리 시스템'
      ],
      results: {
        processing: '문서 처리 시간 80% 단축',
        accuracy: '분석 정확도 95% 달성',
        productivity: '업무 생산성 120% 향상'
      },
      duration: '3주',
      year: '2024',
      client: '법무법인',
      status: 'completed'
    },
    {
      id: 6,
      title: 'SaaS 플랫폼 대시보드',
      category: 'web',
      description: '실시간 데이터 시각화와 사용자 관리 기능을 갖춘 종합적인 SaaS 관리 대시보드입니다.',
      image: '📊',
      technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Redis', 'WebSocket'],
      features: [
        '실시간 데이터 시각화',
        '사용자 권한 관리',
        '알림 시스템',
        '리포트 생성 기능',
        'API 관리 도구'
      ],
      results: {
        efficiency: '관리 효율성 150% 향상',
        insights: '데이터 인사이트 접근성 개선',
        satisfaction: '사용자 만족도 90% 달성'
      },
      duration: '5주',
      year: '2023',
      client: '핀테크 스타트업',
      status: 'completed'
    },
    {
      id: 7,
      title: '모바일 앱 성능 최적화',
      category: 'consulting',
      description: 'React Native 앱의 성능 병목 지점을 분석하고 최적화하여 사용자 경험을 대폭 개선했습니다.',
      image: '📱',
      technologies: ['React Native', 'JavaScript', 'iOS', 'Android', 'Performance Tools'],
      features: [
        '성능 프로파일링',
        '메모리 사용량 최적화',
        '렌더링 성능 개선',
        '번들 사이즈 최적화',
        '네트워크 최적화'
      ],
      results: {
        speed: '앱 로딩 속도 65% 향상',
        memory: '메모리 사용량 40% 감소',
        rating: '앱스토어 평점 4.8점 달성'
      },
      duration: '4주',
      year: '2023',
      client: '소셜 미디어 스타트업',
      status: 'completed'
    },
    {
      id: 8,
      title: '스마트 추천 시스템',
      category: 'ai',
      description: '머신러닝을 활용한 개인화 상품 추천 시스템으로 고객 만족도와 매출을 동시에 향상시켰습니다.',
      image: '🎯',
      technologies: ['Python', 'TensorFlow', 'Pandas', 'scikit-learn', 'FastAPI', 'PostgreSQL'],
      features: [
        '협업 필터링 구현',
        '콘텐츠 기반 필터링',
        '실시간 추천 업데이트',
        'A/B 테스트 기능',
        '성능 모니터링'
      ],
      results: {
        engagement: '사용자 참여도 80% 증가',
        conversion: '구매 전환율 45% 향상',
        revenue: '추천을 통한 매출 비중 35% 달성'
      },
      duration: '6주',
      year: '2023',
      client: '온라인 서점',
      status: 'completed'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <Layout>
      {/* Hero Section */}
      <Section padding="xl" id="portfolio-hero">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
            프로젝트 <span className="text-accent">포트폴리오</span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            다양한 분야의 성공적인 프로젝트들을 통해 쌓은 경험과 노하우를 확인해보세요.
            <br />
            각 프로젝트마다 고객의 요구사항을 완벽히 반영한 최적의 솔루션을 제공했습니다.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{projects.length}+</div>
              <div className="text-sm text-text-muted">완료된 프로젝트</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">100%</div>
              <div className="text-sm text-text-muted">고객 만족도</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">5년</div>
              <div className="text-sm text-text-muted">개발 경험</div>
            </div>
          </div>
        </div>
      </Section>

      {/* 필터링 */}
      <Section background="secondary" padding="lg">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-background-primary text-text-primary hover:bg-accent/10 hover:text-accent border border-secondary'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </Section>

      {/* 프로젝트 목록 */}
      <Section padding="xl">
        <div className="space-y-16">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="max-w-7xl mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* 프로젝트 이미지/아이콘 */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative group">
                    <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center border border-secondary hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
                      <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                        {project.image}
                      </div>
                    </div>
                    
                    {/* 상태 배지 */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-success/20 text-success text-xs font-semibold rounded-full border border-success/30">
                        ✓ 완료
                      </span>
                    </div>
                    
                    {/* 연도 배지 */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-background-primary/90 text-text-primary text-xs font-semibold rounded-full border border-secondary">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* 프로젝트 정보 */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                        {categories.find(cat => cat.id === project.category)?.name}
                      </span>
                      <span className="text-sm text-text-muted">
                        개발 기간: {project.duration}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-text-primary">
                      {project.title}
                    </h2>
                    
                    <p className="text-lg text-text-secondary leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="text-sm text-text-muted">
                      클라이언트: {project.client}
                    </div>
                  </div>
                  
                  {/* 기술 스택 */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-text-primary">사용 기술</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-sm bg-background-secondary text-text-primary border border-secondary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* 주요 기능 */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-text-primary">주요 기능</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <span className="text-accent">✓</span>
                          <span className="text-sm text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 성과 */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-text-primary">주요 성과</h3>
                    <div className="space-y-2">
                      {Object.entries(project.results).map(([, value], resultIndex) => (
                        <div key={resultIndex} className="flex items-center space-x-2">
                          <span className="text-accent">🎯</span>
                          <span className="text-sm font-medium text-accent">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 구분선 */}
              {index < filteredProjects.length - 1 && (
                <div className="mt-16 border-t border-secondary/30"></div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 기술 통계 */}
      <Section background="secondary" padding="xl">
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              기술 경험 통계
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              다양한 프로젝트를 통해 축적한 기술별 경험 현황입니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background-primary p-8 rounded-2xl border border-secondary">
              <div className="text-4xl mb-4">⚛️</div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Frontend</h3>
              <div className="text-2xl font-bold text-accent mb-2">8개</div>
              <p className="text-sm text-text-secondary">React, Next.js, TypeScript 등</p>
            </div>
            
            <div className="bg-background-primary p-8 rounded-2xl border border-secondary">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Backend</h3>
              <div className="text-2xl font-bold text-accent mb-2">6개</div>
              <p className="text-sm text-text-secondary">Node.js, Python, FastAPI 등</p>
            </div>
            
            <div className="bg-background-primary p-8 rounded-2xl border border-secondary">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">AI/ML</h3>
              <div className="text-2xl font-bold text-accent mb-2">4개</div>
              <p className="text-sm text-text-secondary">OpenAI, LangChain, TensorFlow 등</p>
            </div>
            
            <div className="bg-background-primary p-8 rounded-2xl border border-secondary">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Cloud/DevOps</h3>
              <div className="text-2xl font-bold text-accent mb-2">5개</div>
              <p className="text-sm text-text-secondary">AWS, Docker, Kubernetes 등</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="xl">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            다음 프로젝트의 주인공은 당신입니다
          </h2>
          
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            성공적인 프로젝트 경험을 바탕으로 여러분의 아이디어를 현실로 만들어드리겠습니다.
            지금 바로 상담을 요청해보세요!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold min-h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              프로젝트 의뢰하기
            </Link>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold min-h-12 bg-transparent text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              상세 문의
            </a>
          </div>
        </div>
      </Section>
    </Layout>
  );
}