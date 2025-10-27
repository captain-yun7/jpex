/**
 * Contact 페이지 → Quote 페이지로 리다이렉트
 * 견적 문의로 통합
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Contact() {
  const router = useRouter();

  useEffect(() => {
    // 즉시 견적 문의 페이지로 리다이렉트
    router.replace('/quote');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto mb-4"></div>
        <p className="text-gray-400">견적 문의 페이지로 이동 중...</p>
      </div>
    </div>
  );
}
