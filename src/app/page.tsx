/**
 * 메인 홈 — 노트폴리오 스타일 갤러리
 */

import Link from 'next/link';
import { Layout } from '@/components/layout';
import { HomeGallery } from '@/components/home/HomeGallery';

export default function Home() {
  return (
    <Layout>
      {/* 인트로 — mobbin 톤: 라벨 dot + 키 단어 강조 */}
      <section className="container mx-auto pt-20 lg:pt-32 pb-16 lg:pb-20">
        <div className="inline-flex items-center gap-2 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <p className="font-display text-[12.5px] font-semibold tracking-[0.25em] text-ink uppercase">
            Selected Works
          </p>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-[52px] font-semibold text-ink leading-[1.2] tracking-tight max-w-4xl">
          JPEX가 만들어온{' '}
          <span className="text-accent-underline">디지털 솔루션</span> 작업물입니다.
        </h1>
        <p className="text-[16px] text-ink-muted mt-8 max-w-2xl leading-relaxed">
          웹·앱부터 AI 솔루션, 기술 컨설팅까지. 카테고리별로 둘러보고
          관심 있는 작업물의 상세를 확인해보세요.
        </p>
      </section>

      {/* 카테고리 + 그리드 */}
      <HomeGallery />

      {/* 하단 CTA — 미니멀 */}
      <section className="border-t border-line bg-surface-alt">
        <div className="container mx-auto py-20 lg:py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[12.5px] font-semibold tracking-[0.2em] text-ink-subtle uppercase mb-2">
              Start a Project
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-ink">
              새 프로젝트를 함께 만들어볼까요?
            </h2>
            <p className="text-[15.5px] text-ink-muted mt-4 max-w-xl">
              아이디어가 있다면 견적 문의를 통해 자세히 알려주세요.
              영업일 기준 24시간 이내 회신드립니다.
            </p>
          </div>
          <Link
            href="/quote"
            className="group/btn inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-medium text-white bg-ink rounded-full hover:bg-ink/85 shadow-card hover:shadow-lift transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            견적 문의하기
            <svg className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
