/**
 * 홈페이지
 * JPEX 프리랜싱 웹사이트 메인 페이지
 * Yellopencil 스타일 - 전문 외주 업체 디자인
 */

import { Layout, Section } from '@/components/layout';
import { HeroSlider } from '@/components/home/HeroSlider';
import { WebDevIcon, AIIcon, CloudIcon, SpeedIcon, TargetIcon, VerifiedIcon, PartnershipIcon } from '@/components/icons';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      {/* Hero Slider - 4개 섹션 (웹/앱/AI/클라우드) */}
      <HeroSlider />

      {/* 서비스 미리보기 */}
      <Section background="secondary" padding="xl" id="services-preview">
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white">
              제공 <span className="text-green">서비스</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
              전문적인 기술력과 최신 트렌드를 기반으로 최고의 솔루션을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 웹 개발 */}
            <div className="group bg-black-light p-8 rounded-2xl border-2 border-gray-800 hover:border-green transition-all duration-300 hover:shadow-glow-green-sm hover:-translate-y-2">
              <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <WebDevIcon size={80} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green transition-colors duration-300">
                웹/앱 개발
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Next.js, React, Node.js를 활용한<br />
                현대적인 웹/앱 솔루션 개발
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-green/10 text-green rounded-full border border-green/20">React</span>
                <span className="px-3 py-1 text-xs bg-green/10 text-green rounded-full border border-green/20">Next.js</span>
                <span className="px-3 py-1 text-xs bg-green/10 text-green rounded-full border border-green/20">TypeScript</span>
              </div>
            </div>

            {/* AI 솔루션 */}
            <div className="group bg-black-light p-8 rounded-2xl border-2 border-gray-800 hover:border-green transition-all duration-300 hover:shadow-glow-green-sm hover:-translate-y-2">
              <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <AIIcon size={80} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green transition-colors duration-300">
                AI 솔루션
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                OpenAI API 기반 챗봇 및<br />
                맞춤형 AI 자동화 시스템 구축
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-green/10 text-green rounded-full border border-green/20">OpenAI</span>
                <span className="px-3 py-1 text-xs bg-green/10 text-green rounded-full border border-green/20">LangChain</span>
                <span className="px-3 py-1 text-xs bg-green/10 text-green rounded-full border border-green/20">Python</span>
              </div>
            </div>

            {/* 클라우드 인프라 */}
            <div className="group bg-black-light p-8 rounded-2xl border-2 border-gray-800 hover:border-green transition-all duration-300 hover:shadow-glow-green-sm hover:-translate-y-2">
              <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CloudIcon size={80} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green transition-colors duration-300">
                클라우드 인프라
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                AWS, GCP 기반의<br />
                확장 가능한 클라우드 아키텍처 설계
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-green/10 text-green rounded-full border border-green/20">AWS</span>
                <span className="px-3 py-1 text-xs bg-green/10 text-green rounded-full border border-green/20">Docker</span>
                <span className="px-3 py-1 text-xs bg-green/10 text-green rounded-full border border-green/20">Kubernetes</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Why JPEX 섹션 */}
      <Section padding="xl" className="relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-20 right-20 w-64 h-64 border-4 border-green/10 rounded-full animate-spin-slow" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white">
            왜 <span className="text-green">JPEX</span>인가?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="p-6 bg-black-light rounded-xl border border-gray-800 hover:border-green/50 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <SpeedIcon size={64} />
              </div>
              <h3 className="text-xl font-bold text-green mb-2">빠른 개발 속도</h3>
              <p className="text-gray-400">
                검증된 프로세스와 최신 기술 스택으로 신속한 개발을 보장합니다
              </p>
            </div>

            <div className="p-6 bg-black-light rounded-xl border border-gray-800 hover:border-green/50 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <TargetIcon size={64} />
              </div>
              <h3 className="text-xl font-bold text-green mb-2">비즈니스 중심 사고</h3>
              <p className="text-gray-400">
                단순 개발을 넘어 비즈니스 성장에 기여하는 솔루션을 제공합니다
              </p>
            </div>

            <div className="p-6 bg-black-light rounded-xl border border-gray-800 hover:border-green/50 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <VerifiedIcon size={64} />
              </div>
              <h3 className="text-xl font-bold text-green mb-2">검증된 기술력</h3>
              <p className="text-gray-400">
                다양한 프로젝트 경험과 최신 기술 트렌드에 대한 깊은 이해
              </p>
            </div>

            <div className="p-6 bg-black-light rounded-xl border border-gray-800 hover:border-green/50 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <PartnershipIcon size={64} />
              </div>
              <h3 className="text-xl font-bold text-green mb-2">지속적인 파트너십</h3>
              <p className="text-gray-400">
                런칭 후에도 지속적인 기술 지원과 유지보수를 제공합니다
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA 섹션 */}
      <Section background="secondary" padding="xl">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white">
            프로젝트를 <span className="text-green">시작</span>하세요
          </h2>

          <p className="text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto">
            아이디어가 있으시나요?<br />
            함께 멋진 디지털 솔루션을 만들어보세요.
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
        </div>
      </Section>
    </Layout>
  );
}
