import type { Metadata } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { projects } from '../data';

export const metadata: Metadata = {
  title: 'DomainXiom - RAG 기반 LLM 학습/평가 데이터셋 제작 솔루션 | JpexStudio',
  description:
    '도메인 전문 문서를 OCR·RAG 파이프라인으로 가공하고 전문가 검수로 품질을 보증하는 고품질 LLM 학습/평가 데이터셋 제작 솔루션. 플리토·업스테이지·에이치제이엘 납품.',
};

const project = projects.find((p) => p.detailHref === '/portfolio/domainxiom')!;

/** 납품처 공식 로고 (없는 곳은 텍스트로 표기) */
const CLIENT_LOGOS: Record<string, { src: string; className: string }> = {
  플리토: { src: '/portfolio/logos/flitto.svg', className: 'h-[19px]' },
  업스테이지: { src: '/portfolio/logos/upstage.svg', className: 'h-[28px]' },
};

export default function DomainXiomPage() {
  return (
    <Layout>
      {/* 인트로 */}
      <section className="container mx-auto pt-20 lg:pt-32 pb-12 lg:pb-16">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-[13.5px] text-ink-muted hover:text-ink transition-colors mb-8"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          포트폴리오로 돌아가기
        </Link>
        <p className="inline-flex items-center gap-2 font-display text-[12.5px] font-semibold tracking-[0.25em] text-ink uppercase mb-7">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent align-middle" />
          AI 솔루션
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-[48px] font-semibold text-ink leading-[1.2] tracking-tight max-w-4xl">
          DomainXiom
        </h1>
        <p className="text-lg md:text-xl text-ink-muted mt-5 max-w-3xl leading-relaxed">
          RAG 기반의 고품질 LLM 학습/평가 데이터셋 제작 솔루션
        </p>
      </section>

      {/* 캡쳐 */}
      <section className="container mx-auto pb-16 lg:pb-20">
        <div className="rounded-xl overflow-hidden ring-1 ring-line shadow-card bg-surface-alt">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt="DomainXiom 전문가 검수 워크스페이스"
            className="w-full h-auto"
          />
        </div>
        <p className="text-[13px] text-ink-subtle mt-3">
          전문가(SME) 검수 워크스페이스 — 데이터 품질과 저작권을 안전하게 귀속합니다.
        </p>
      </section>

      {/* 설명 + 정보 */}
      <section className="container mx-auto pb-24 lg:pb-32 grid grid-cols-1 lg:grid-cols-3 gap-14">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-ink mb-5">프로젝트 소개</h2>
          <p className="text-[15.5px] text-ink-muted leading-relaxed">
            {project.description}
          </p>
          <p className="text-[15.5px] text-ink-muted leading-relaxed mt-4">
            수십 년 분량의 도메인 전문지 아카이브(37,000+ 페이지)를 OCR로 정제 마크다운화하고,
            RAG 파이프라인으로 학습/평가용 QA를 자동 생성합니다. 이어 도메인 전문가 여러 명이
            웹 기반 검수 워크스페이스에서 정답 검증·오류 태깅·상호 합의(IAA)를 거쳐,
            LLM 학습과 벤치마크 평가에 바로 쓸 수 있는 고품질 데이터셋으로 반출합니다.
          </p>

          <h2 className="text-xl font-semibold text-ink mt-12 mb-5">주요 기능</h2>
          <ul className="space-y-3">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[15px] text-ink-muted">
                <span className="mt-[7px] inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-10">
          <div>
            <h3 className="font-display text-[12.5px] font-semibold tracking-[0.2em] text-ink uppercase mb-4">
              납품처 · 파트너사
            </h3>
            <ul className="space-y-2.5">
              {(project.clients ?? []).map((c) => {
                const logo = CLIENT_LOGOS[c];
                return (
                  <li
                    key={c}
                    className="flex items-center min-h-[52px] px-4 py-3 rounded-lg bg-surface-alt ring-1 ring-line"
                  >
                    {logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={logo.src} alt={c} className={`${logo.className} w-auto`} />
                    ) : (
                      <span className="text-[15px] font-medium text-ink">{c}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-[12.5px] font-semibold tracking-[0.2em] text-ink uppercase mb-4">
              사용 기술
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-md bg-surface-alt ring-1 ring-line text-[13px] text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-[12.5px] font-semibold tracking-[0.2em] text-ink uppercase mb-4">
              프로젝트 성과
            </h3>
            <ul className="space-y-2.5">
              {project.results.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-[14.5px] text-ink-muted">
                  <span className="mt-[7px] inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </Layout>
  );
}
