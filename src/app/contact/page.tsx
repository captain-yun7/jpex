/**
 * Contact 페이지 → Quote 페이지로 리다이렉트
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Contact() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/quote');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-line border-t-accent mx-auto mb-4" />
        <p className="text-[14.5px] text-ink-muted">견적 문의 페이지로 이동 중...</p>
      </div>
    </div>
  );
}
