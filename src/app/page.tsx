/**
 * 홈페이지
 * JPEX 프리랜싱 웹사이트 메인 페이지
 */

import { Layout, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      {/* 임시 Hero Section */}
      <Section padding="xl" id="main-content">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient animate-fadeInUp">
            전문적인 웹 개발 &<br />
            AI 솔루션 서비스
          </h1>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto animate-fadeInUp">
            카카오 개발자 스타일을 기반으로 한 현대적이고 혁신적인<br />
            웹/앱 개발 및 AI 솔루션을 제공합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp">
            <Link href="/quote">
              <Button variant="primary" size="lg">
                견적 요청하기
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg">
                포트폴리오 보기
              </Button>
            </Link>
          </div>
          
          {/* 상태 표시 */}
          <div className="inline-flex items-center space-x-2 bg-background-secondary px-4 py-2 rounded-full animate-fadeInUp">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-text-secondary">현재 새로운 프로젝트 문의 가능</span>
          </div>
        </div>
      </Section>

      {/* 서비스 미리보기 */}
      <Section background="secondary" padding="xl">
        <div className="text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            제공 서비스
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 웹 개발 */}
            <div className="bg-background-primary p-8 rounded-lg border border-secondary hover:border-accent transition-colors">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">웹/앱 개발</h3>
              <p className="text-text-secondary">
                반응형 웹사이트 및 모바일 애플리케이션 개발
              </p>
            </div>
            
            {/* AI 솔루션 */}
            <div className="bg-background-primary p-8 rounded-lg border border-secondary hover:border-accent transition-colors">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">AI 솔루션</h3>
              <p className="text-text-secondary">
                ChatGPT 기반 챗봇 및 자동화 시스템 구축
              </p>
            </div>
            
            {/* 기술 컨설팅 */}
            <div className="bg-background-primary p-8 rounded-lg border border-secondary hover:border-accent transition-colors">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">기술 컨설팅</h3>
              <p className="text-text-secondary">
                시스템 아키텍처 설계 및 성능 최적화
              </p>
            </div>
          </div>
        </div>
      </Section>
      
      {/* 연락처 섹션 */}
      <Section padding="xl">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            프로젝트 시작하기
          </h2>
          
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            아이디어가 있으시나요? 함께 멋진 디지털 솔루션을 만들어보세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                문의하기
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="lg">
                더 알아보기
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
