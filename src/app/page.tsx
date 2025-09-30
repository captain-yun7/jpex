/**
 * 홈페이지
 * JPEX 프리랜싱 웹사이트 메인 페이지
 */

import { Layout, Section } from '@/components/layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      {/* 임시 Hero Section */}
      <Section padding="xl" id="main-content">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            전문적인 웹 개발 &<br />
            AI 솔루션 서비스
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            아이디어를 현실로 만드는 개발 파트너<br />
            고객의 비즈니스 성장을 위한 맞춤형 솔루션을 제공합니다.
          </p>

          {/* 진정성 있는 어필 문구 */}
          <div className="max-w-4xl mx-auto space-y-3 text-gray-300 leading-relaxed">
            <p className="text-base">
              5년간 다양한 프로젝트를 진행하며 쌓아온 경험과 노하우로<br />
              단순한 개발을 넘어 비즈니스의 핵심 가치를 이해하고 구현합니다.
            </p>
            <p className="text-base">
              최신 기술 트렌드를 빠르게 습득하고 적용하여<br />
              경쟁력 있는 디지털 서비스를 만들어드립니다.
            </p>
            <p className="text-base">
              프로젝트 시작부터 런칭 후 유지보수까지<br />
              든든한 기술 파트너가 되어드리겠습니다.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold min-h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              견적 요청하기
            </Link>
            <a
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold min-h-12 bg-transparent text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              서비스 보기
            </a>
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
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold min-h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              문의하기
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold min-h-12 bg-transparent text-gray-300 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            >
              더 알아보기
            </a>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
