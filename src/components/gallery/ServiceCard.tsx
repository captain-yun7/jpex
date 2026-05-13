/**
 * ServiceCard — mobbin 톤
 * 인디고 배경 + lift hover + 화살표 시그니처
 */

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ServiceItemData } from './types';

interface ServiceCardProps {
  data: ServiceItemData;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ data, className }) => {
  return (
    <Link href={data.href} className={cn('group block', className)}>
      <div className="card-lift relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-accent to-accent-hover text-white p-7 flex flex-col justify-between ring-1 ring-accent/20">
        {/* 노이즈/패턴 (subtle) */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, white 0%, transparent 50%), radial-gradient(circle at 80% 80%, white 0%, transparent 50%)',
          }}
        />

        <div className="relative">
          <span className="font-display inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-semibold tracking-[0.15em] uppercase bg-white/15 backdrop-blur-md">
            Service
          </span>
          <h3 className="text-[22px] lg:text-[24px] font-semibold mt-4 leading-snug">
            {data.title}
          </h3>
          <p className="text-[14.5px] mt-3 text-white/85 leading-relaxed line-clamp-3">
            {data.description}
          </p>
        </div>

        <div className="relative flex items-center justify-between">
          <span className="font-display text-[12px] font-medium text-white/70">
            자세히 보기
          </span>
          <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/25">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="pt-4 px-0.5">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-[16px] font-medium text-ink line-clamp-1 leading-snug group-hover:text-accent transition-colors duration-200">
            {data.title}
          </h4>
          <span className="font-display text-[12.5px] text-ink-subtle shrink-0 mt-0.5">
            JPEX
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
