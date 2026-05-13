/**
 * WorkCard — mobbin 톤
 * 썸네일 + lift hover + 우상단 화살표 fade-in
 */

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { WorkItemData } from './types';

interface WorkCardProps {
  data: WorkItemData;
  className?: string;
  priority?: boolean;
}

export const WorkCard: React.FC<WorkCardProps> = ({ data, className, priority }) => {
  const inner = (
    <>
      <div className="card-hover-overlay card-lift relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-alt ring-1 ring-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.image}
          alt={data.title}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
        />

        {/* 우상단 hover 화살표 (외부 링크 느낌) */}
        <div className="absolute top-3 right-3 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md shadow-card flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-ink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* 좌하단 카테고리 chip (작게) */}
        <div className="absolute bottom-3 left-3">
          <span className="font-display inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium text-ink bg-white/90 backdrop-blur-md shadow-pill">
            {data.categoryLabel ?? data.category}
          </span>
        </div>
      </div>

      <div className="pt-4 px-0.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[16px] font-medium text-ink line-clamp-1 leading-snug group-hover:text-accent transition-colors duration-200">
            {data.title}
          </h3>
          {data.year && (
            <span className="font-display text-[12.5px] text-ink-subtle tabular-nums shrink-0 mt-0.5">
              {data.year}
            </span>
          )}
        </div>
      </div>
    </>
  );

  const wrapperClass = cn('group block', className);

  if (data.href) {
    return (
      <Link href={data.href} className={wrapperClass}>
        {inner}
      </Link>
    );
  }
  return <div className={wrapperClass}>{inner}</div>;
};

export default WorkCard;
