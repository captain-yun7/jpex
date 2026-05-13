/**
 * CategoryTabs — mobbin 톤 pill 형태
 * active = 검은 채워진 pill, 비활성 = 회색 텍스트
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CategoryOption {
  id: string;
  name: string;
}

interface CategoryTabsProps {
  categories: CategoryOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  rightSlot?: React.ReactNode;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeId,
  onChange,
  className,
  rightSlot,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 pb-2',
        className
      )}
    >
      <div className="flex gap-1.5 overflow-x-auto -mx-1 px-1 py-1">
        {categories.map((cat) => {
          const active = cat.id === activeId;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={cn(
                'whitespace-nowrap px-4 py-2 text-[14.5px] font-medium rounded-full transition-all duration-200',
                active
                  ? 'bg-ink text-white shadow-card'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
              )}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
      {rightSlot && (
        <div className="hidden md:block font-display text-[13.5px] text-ink-muted shrink-0">
          {rightSlot}
        </div>
      )}
    </div>
  );
};

export default CategoryTabs;
