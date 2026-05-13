/**
 * Portfolio 콘텐츠 — 노트폴리오 톤 (CategoryTabs + WorkGrid 재사용)
 */

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { CategoryTabs, WorkGrid } from '@/components/gallery';
import type { GalleryItem, WorkItemData } from '@/components/gallery';
import { categories, projects } from './data';

const CATEGORY_LABEL: Record<string, string> = {
  web: '웹/앱 개발',
  ai: 'AI 솔루션',
  consulting: '컨설팅',
};

export default function PortfolioContent() {
  const [activeId, setActiveId] = useState('all');

  const items: GalleryItem[] = useMemo(() => {
    const filtered =
      activeId === 'all'
        ? projects
        : projects.filter((p) => p.category === activeId);

    return filtered.map((p) => ({
      kind: 'work' as const,
      data: {
        id: p.id,
        title: p.title,
        category: p.category,
        categoryLabel: CATEGORY_LABEL[p.category] ?? p.category,
        image: p.image,
        year: p.year,
        href: `/portfolio?p=${p.id}`,
      } satisfies WorkItemData,
    }));
  }, [activeId]);

  return (
    <Layout>
      {/* 인트로 */}
      <section className="container mx-auto pt-20 lg:pt-32 pb-16 lg:pb-20">
        <p className="inline-flex items-center gap-2 font-display text-[12.5px] font-semibold tracking-[0.25em] text-ink uppercase mb-7"><span className="inline-block w-1.5 h-1.5 rounded-full bg-accent align-middle" /> 
          Portfolio
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-[52px] font-semibold text-ink leading-[1.2] tracking-tight max-w-4xl">
          홈페이지 제작 <span className="text-accent-underline">포트폴리오</span>.
        </h1>
        <p className="text-[16.5px] text-ink-muted mt-8 max-w-2xl leading-relaxed">
          회사 홈페이지, 병원 홈페이지, 쇼핑몰, 분양 사이트 등 다양한 분야의
          웹 개발 프로젝트를 확인해보세요.
        </p>
      </section>

      {/* 카테고리 + 그리드 */}
      <section className="container mx-auto pt-6 lg:pt-10 pb-28 lg:pb-36">
        <CategoryTabs
          categories={categories}
          activeId={activeId}
          onChange={setActiveId}
          rightSlot={
            <span>
              총 <span className="text-ink font-medium">{items.length}</span>건
            </span>
          }
        />
        <div className="mt-12 lg:mt-16">
          <WorkGrid items={items} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-surface-alt">
        <div className="container mx-auto py-20 lg:py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-ink">
              다음 프로젝트의 주인공은 당신입니다.
            </h2>
            <p className="text-[15.5px] text-ink-muted mt-4 max-w-xl">
              회사 홈페이지, 병원 홈페이지, 쇼핑몰 개발 등
              여러분의 아이디어를 현실로 만들어드리겠습니다.
            </p>
          </div>
          <Link
            href="/quote"
            className="group/btn inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-medium text-white bg-ink rounded-full hover:bg-ink/85 shadow-card hover:shadow-lift transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            무료 견적 문의
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
