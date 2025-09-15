/**
 * 홈페이지
 * JPEX 프리랜싱 웹사이트 메인 페이지
 */

import { Layout, Section } from '@/components/layout';
import { Button } from '@/components/ui';

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
            <Button variant="primary" size="lg" href="/quote">
              견적 요청하기
            </Button>
            <Button variant="outline" size="lg" href="/portfolio">
              포트폴리오 보기
            </Button>
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
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              제공 서비스
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              전문적인 기술력과 최신 트렌드를 기반으로 최고의 솔루션을 제공합니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 웹 개발 */}
            <div className="group bg-background-primary p-8 rounded-2xl border border-secondary hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-2">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🌐</div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">웹/앱 개발</h3>
              <p className="text-text-secondary mb-6">
                Next.js, React, Node.js를 활용한<br />
                현대적인 웹/앱 솔루션 개발
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">React</span>
                <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">Next.js</span>
                <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">TypeScript</span>
              </div>
            </div>
            
            {/* AI 솔루션 */}
            <div className="group bg-background-primary p-8 rounded-2xl border border-secondary hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-2">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🤖</div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">AI 솔루션</h3>
              <p className="text-text-secondary mb-6">
                OpenAI API 기반 챗봇 및<br />
                맞춤형 AI 자동화 시스템 구축
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">OpenAI</span>
                <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">LangChain</span>
                <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">Python</span>
              </div>
            </div>
            
            {/* 기술 컨설팅 */}
            <div className="group bg-background-primary p-8 rounded-2xl border border-secondary hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-2">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">💡</div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">기술 컨설팅</h3>
              <p className="text-text-secondary mb-6">
                시스템 아키텍처 설계,<br />
                성능 최적화 및 기술 전략 수립
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">AWS</span>
                <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">Docker</span>
                <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">DevOps</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 포트폴리오 미리보기 */}
      <Section padding="xl">
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              최근 프로젝트
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              다양한 분야의 성공적인 프로젝트 경험을 보유하고 있습니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 프로젝트 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-background-secondary border border-secondary hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <div className="text-4xl">💼</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2">기업 포트폴리오 사이트</h3>
                <p className="text-text-secondary text-sm mb-4">
                  Next.js와 Tailwind CSS를 활용한 반응형 포트폴리오 웹사이트
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded">Next.js</span>
                  <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded">Tailwind</span>
                </div>
                <div className="text-xs text-text-secondary">2024.08</div>
              </div>
            </div>
            
            {/* 프로젝트 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-background-secondary border border-secondary hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <div className="text-4xl">🤖</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2">AI 챗봇 시스템</h3>
                <p className="text-text-secondary text-sm mb-4">
                  OpenAI API를 활용한 고객 상담 자동화 챗봇 개발
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded">OpenAI</span>
                  <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded">Python</span>
                </div>
                <div className="text-xs text-text-secondary">2024.07</div>
              </div>
            </div>
            
            {/* 프로젝트 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-background-secondary border border-secondary hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <div className="text-4xl">🏢</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2">전자상거래 플랫폼</h3>
                <p className="text-text-secondary text-sm mb-4">
                  React와 Node.js로 구축한 풀스택 이커머스 솔루션
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded">React</span>
                  <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded">Node.js</span>
                </div>
                <div className="text-xs text-text-secondary">2024.06</div>
              </div>
            </div>
          </div>
          
          <div className="pt-8">
            <Button variant="outline" size="lg" href="/portfolio">
              전체 포트폴리오 보기
            </Button>
          </div>
        </div>
      </Section>
      
      {/* 고객 후기 */}
      <Section background="secondary" padding="xl">
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              고객 후기
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              함께 작업한 고객들의 생생한 후기를 확인해보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 후기 1 */}
            <div className="bg-background-primary p-8 rounded-2xl border border-secondary">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold">
                  김
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-text-primary">김○○ 대표</div>
                  <div className="text-sm text-text-secondary">IT 스타트업</div>
                </div>
              </div>
              <p className="text-text-secondary mb-4">
                "전문적인 기술력과 빠른 개발 속도에 매우 만족했습니다. 특히 소통이 원활하고 요구사항을 정확히 파악해주셨어요."
              </p>
              <div className="flex text-accent">
                {'★'.repeat(5)}
              </div>
            </div>
            
            {/* 후기 2 */}
            <div className="bg-background-primary p-8 rounded-2xl border border-secondary">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold">
                  박
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-text-primary">박○○ 과장</div>
                  <div className="text-sm text-text-secondary">제조업체</div>
                </div>
              </div>
              <p className="text-text-secondary mb-4">
                "AI 챗봇 도입으로 고객 문의 처리 시간이 70% 단축되었습니다. 예상보다 훨씬 뛰어난 결과에 놀랐어요."
              </p>
              <div className="flex text-accent">
                {'★'.repeat(5)}
              </div>
            </div>
            
            {/* 후기 3 */}
            <div className="bg-background-primary p-8 rounded-2xl border border-secondary">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-semibold">
                  이
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-text-primary">이○○ 팀장</div>
                  <div className="text-sm text-text-secondary">온라인 쇼핑몰</div>
                </div>
              </div>
              <p className="text-text-secondary mb-4">
                "사용자 경험을 최우선으로 생각하는 개발 철학이 인상적이었습니다. 덕분에 매출이 40% 증가했어요."
              </p>
              <div className="flex text-accent">
                {'★'.repeat(5)}
              </div>
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
            <Button variant="primary" size="lg" href="/contact">
              문의하기
            </Button>
            <Button variant="ghost" size="lg" href="/about">
              더 알아보기
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
