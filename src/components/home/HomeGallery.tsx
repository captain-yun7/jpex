/**
 * HomeGallery — 메인 홈의 카테고리 탭 + 작품/서비스 혼합 그리드
 */

'use client';

import React, { useMemo, useState } from 'react';
import { CategoryTabs, WorkGrid } from '@/components/gallery';
import type { GalleryItem, WorkItemData, ServiceItemData } from '@/components/gallery';
import { projects, categories as projectCategories } from '@/app/portfolio/data';
import { SERVICES } from '@/lib/constants';

const CATEGORY_LABEL: Record<string, string> = {
  web: '웹/앱 개발',
  ai: 'AI 솔루션',
  consulting: '컨설팅',
};

const works: GalleryItem[] = projects.map((p) => ({
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

const services: GalleryItem[] = (
  [
    { id: 'svc-web', key: 'web' as const, category: 'web' },
    { id: 'svc-ai', key: 'ai' as const, category: 'ai' },
    { id: 'svc-consulting', key: 'consulting' as const, category: 'consulting' },
  ] as const
).map(({ id, key, category }) => ({
  kind: 'service' as const,
  data: {
    id,
    title: SERVICES[key].title,
    description: SERVICES[key].description,
    category,
    href: `/services#${category}`,
  } satisfies ServiceItemData,
}));

function buildItems(activeId: string): GalleryItem[] {
  if (activeId === 'all') {
    // 작품 사이에 서비스 카드 3개를 자연스럽게 끼워넣음
    const inserts = new Map<number, GalleryItem>([
      [2, services[0]],
      [5, services[1]],
      [8, services[2]],
    ]);
    const out: GalleryItem[] = [];
    works.forEach((w, i) => {
      out.push(w);
      const ins = inserts.get(i);
      if (ins) out.push(ins);
    });
    return out;
  }
  const matched = services.find((s) => s.data.category === activeId);
  const filteredWorks = works.filter((w) => w.data.category === activeId);
  return matched ? [matched, ...filteredWorks] : filteredWorks;
}

export const HomeGallery: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('all');

  const items = useMemo(() => buildItems(activeId), [activeId]);

  // 카테고리 탭 옵션 — 포트폴리오 데이터의 categories 그대로 사용
  const categoryOptions = projectCategories.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  return (
    <section className="container mx-auto pt-6 lg:pt-10 pb-28 lg:pb-36">
      <CategoryTabs
        categories={categoryOptions}
        activeId={activeId}
        onChange={setActiveId}
        rightSlot={
          <span>
            총 <span className="text-ink font-medium">{items.length}</span>개
          </span>
        }
      />

      <div className="mt-12 lg:mt-16">
        <WorkGrid items={items} />
      </div>
    </section>
  );
};

export default HomeGallery;
