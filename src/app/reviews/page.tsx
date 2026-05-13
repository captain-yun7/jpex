/**
 * Reviews 페이지 — 노트폴리오 톤
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { CategoryTabs } from '@/components/gallery';

const categories = [
  { id: 'all', name: '전체' },
  { id: 'web', name: '웹/앱 개발' },
  { id: 'ai', name: 'AI 솔루션' },
  { id: 'consulting', name: '컨설팅' },
];

const reviews = [
  {
    id: 1,
    category: 'web',
    client: '김민수',
    company: '테크스타트업 A',
    role: '대표',
    project: '기업 홈페이지 & 관리자 시스템',
    rating: 5,
    date: '2024.10',
    content:
      '처음 외주를 맡기는 거라 걱정이 많았는데, 정말 만족스러웠습니다. 특히 소통이 원활했고 요구사항을 정확히 이해하고 구현해주셔서 좋았습니다. 일정도 약속대로 지켜주셨고, 배포 후에도 세심하게 케어해주셔서 감사했습니다.',
    tags: ['Next.js', 'React', 'Node.js'],
  },
  {
    id: 2,
    category: 'ai',
    client: '박지영',
    company: '마케팅 에이전시 B',
    role: '팀장',
    project: 'AI 챗봇 & 자동화 시스템',
    rating: 5,
    date: '2024.09',
    content:
      'GPT-4 기반 고객 상담 챗봇을 만들어주셨는데, 응답 정확도가 생각보다 훨씬 높아서 놀랐습니다. 덕분에 고객 문의 처리 시간이 70% 이상 단축됐어요. 비용 대비 효과가 정말 좋았습니다.',
    tags: ['OpenAI', 'LangChain', 'FastAPI'],
  },
  {
    id: 3,
    category: 'web',
    client: '이준호',
    company: '온라인 쇼핑몰 C',
    role: '운영팀',
    project: 'E-commerce 플랫폼 구축',
    rating: 5,
    date: '2024.08',
    content:
      '결제 연동부터 재고 관리까지 복잡한 기능들이 많았는데 모두 완벽하게 구현해주셨습니다. 특히 관리자 페이지가 직관적이어서 사용하기 편하고, 성능도 매우 빠릅니다. 적극 추천합니다!',
    tags: ['React', 'PostgreSQL', 'Stripe'],
  },
  {
    id: 4,
    category: 'consulting',
    client: '정서윤',
    company: 'SaaS 스타트업 D',
    role: 'CTO',
    project: '기술 아키텍처 설계',
    rating: 5,
    date: '2024.07',
    content:
      '레거시 시스템을 현대화하는 과정에서 도움을 받았습니다. 우리 비즈니스에 맞는 기술 스택을 제안해주시고, 마이그레이션 로드맵도 상세하게 작성해주셔서 팀 전체가 방향성을 잡는 데 큰 도움이 됐습니다.',
    tags: ['Architecture', 'AWS', 'Microservices'],
  },
  {
    id: 5,
    category: 'web',
    client: '최현우',
    company: '교육 플랫폼 E',
    role: '대표',
    project: '온라인 강의 플랫폼',
    rating: 5,
    date: '2024.06',
    content:
      '동영상 스트리밍부터 결제, 수강생 관리까지 모든 기능이 잘 작동합니다. 반응형으로 제작해주셔서 모바일에서도 문제없고, 로딩 속도도 빨라서 사용자들 만족도가 높습니다. 감사합니다!',
    tags: ['Next.js', 'Video Streaming', 'MongoDB'],
  },
  {
    id: 6,
    category: 'ai',
    client: '강민지',
    company: '법률 서비스 F',
    role: '변호사',
    project: '문서 분석 AI 시스템',
    rating: 5,
    date: '2024.05',
    content:
      '방대한 법률 문서를 자동으로 분석하고 요약해주는 시스템을 구축해주셨습니다. 업무 효율이 엄청나게 올라갔고, 직원들도 매우 만족하고 있습니다. 기술력이 정말 뛰어나십니다.',
    tags: ['GPT-4', 'Document AI', 'Python'],
  },
];

const stats = [
  { number: '200+', label: '완료 프로젝트' },
  { number: '98%', label: '고객 만족도' },
  { number: '100+', label: '5점 리뷰' },
  { number: '85%', label: '재의뢰율' },
];

export default function Reviews() {
  const [activeId, setActiveId] = useState('all');
  const filtered =
    activeId === 'all' ? reviews : reviews.filter((r) => r.category === activeId);

  return (
    <Layout>
      {/* 인트로 */}
      <section className="container mx-auto pt-20 lg:pt-32 pb-16 lg:pb-20">
        <p className="inline-flex items-center gap-2 font-display text-[12.5px] font-semibold tracking-[0.25em] text-ink uppercase mb-7"><span className="inline-block w-1.5 h-1.5 rounded-full bg-accent align-middle" /> 
          Client Reviews
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-[52px] font-semibold text-ink leading-[1.2] tracking-tight max-w-4xl">
          고객들이 남긴 <span className="text-accent-underline">후기</span>입니다.
        </h1>
        <p className="text-[16.5px] text-ink-muted mt-8 max-w-2xl leading-relaxed">
          실제 프로젝트를 함께한 고객들의 생생한 경험을 확인하세요.
        </p>
      </section>

      {/* 통계 */}
      <section className="border-t border-line bg-surface-alt">
        <div className="container mx-auto py-14 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface-alt p-8 lg:p-10 text-center">
                <div className="text-3xl md:text-4xl font-semibold text-ink tabular-nums">
                  {s.number}
                </div>
                <div className="text-[14px] text-ink-muted mt-3">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 카테고리 + 후기 */}
      <section className="container mx-auto py-20 lg:py-28">
        <CategoryTabs
          categories={categories}
          activeId={activeId}
          onChange={setActiveId}
          rightSlot={
            <span>
              총 <span className="text-ink font-medium">{filtered.length}</span>건
            </span>
          }
        />

        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
          {filtered.map((r) => (
            <article key={r.id} className="bg-surface p-8 lg:p-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-accent"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[13px] text-ink-subtle">{r.date}</span>
              </div>

              <h3 className="text-[17px] font-medium text-ink mb-2">
                {r.project}
              </h3>
              <p className="text-[14px] text-ink-muted mb-6">
                {r.company} · {r.client} {r.role}
              </p>

              <p className="text-[15.5px] text-ink leading-[1.75] mb-6">
                “{r.content}”
              </p>

              <div className="flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-[13px] text-ink-muted bg-surface-alt border border-line rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <div className="container mx-auto py-20 lg:py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-ink">
              다음은 당신의 차례입니다.
            </h2>
            <p className="text-[15.5px] text-ink-muted mt-2">
              평균 2시간 내 응답 · 무료 상담 제공
            </p>
          </div>
          <Link
            href="/quote"
            className="group/btn inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-medium text-white bg-ink rounded-full hover:bg-ink/85 shadow-card hover:shadow-lift transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            견적 문의하기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
