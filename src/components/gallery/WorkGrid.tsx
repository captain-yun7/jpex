/**
 * WorkGrid — 작품/서비스 카드를 균일 그리드로 배치
 * mobile 1col → sm 2col → lg 3col → 2xl 4col
 */

import React from 'react';
import { cn } from '@/lib/utils';
import type { GalleryItem } from './types';
import { WorkCard } from './WorkCard';
import { ServiceCard } from './ServiceCard';

interface WorkGridProps {
  items: GalleryItem[];
  className?: string;
}

export const WorkGrid: React.FC<WorkGridProps> = ({ items, className }) => {
  if (items.length === 0) {
    return (
      <div className="py-32 text-center text-ink-muted text-base">
        해당 카테고리의 작품이 아직 없습니다.
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-14',
        className
      )}
    >
      {items.map((item, idx) => {
        const key = `${item.kind}-${item.data.id}`;
        if (item.kind === 'work') {
          return <WorkCard key={key} data={item.data} priority={idx < 4} />;
        }
        return <ServiceCard key={key} data={item.data} />;
      })}
    </div>
  );
};

export default WorkGrid;
