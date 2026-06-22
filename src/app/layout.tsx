/**
 * RootLayout 컴포넌트
 * JPEX 프리랜싱 웹사이트의 루트 레이아웃
 */

import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG, SEO_CONFIG } from "@/lib/constants";
import { getSeoSettings, type SeoSettings } from "@/lib/db";
import { ClientErrorBoundary } from "@/components/common";

// Pretendard 폰트 import
import '@fontsource/pretendard/300.css';  // Light
import '@fontsource/pretendard/400.css';  // Regular
import '@fontsource/pretendard/500.css';  // Medium
import '@fontsource/pretendard/600.css';  // SemiBold
import '@fontsource/pretendard/700.css';  // Bold
import '@fontsource/pretendard/900.css';  // Black

// DB의 SEO 설정을 1시간마다 재검증 (관리자 저장 후 반영)
export const revalidate = 3600;

/**
 * 관리자 SEO 설정(DB) > 코드 상수 순으로 메타데이터를 구성한다.
 * DB 미설정/미연결 시에는 상수값으로 폴백한다.
 */
export async function generateMetadata(): Promise<Metadata> {
  let seo: SeoSettings | null = null;
  try {
    seo = await getSeoSettings();
  } catch {
    seo = null;
  }

  const title = seo?.site_title || SEO_CONFIG.defaultTitle;
  const description = seo?.site_description || SEO_CONFIG.description;
  const keywords = seo?.keywords
    ? seo.keywords.split(',').map((k) => k.trim()).filter(Boolean)
    : [...SEO_CONFIG.keywords];
  const ogImage = seo?.og_image || SITE_CONFIG.ogImage;

  const googleCode = seo?.google_verification || SEO_CONFIG.verification.google;
  const naverCode = seo?.naver_verification || SEO_CONFIG.verification.naver;
  const bingCode = seo?.bing_verification || SEO_CONFIG.verification.bing;

  const otherVerification: Record<string, string> = {};
  if (naverCode) otherVerification['naver-site-verification'] = naverCode;
  if (bingCode) otherVerification['msvalidate.01'] = bingCode;

  return {
    title: {
      template: SEO_CONFIG.titleTemplate,
      default: title,
    },
    description,
    keywords,
    authors: [{ name: SEO_CONFIG.author }],
    creator: SEO_CONFIG.creator,
    publisher: SEO_CONFIG.publisher,
    robots: SEO_CONFIG.robots,
    metadataBase: new URL(SITE_CONFIG.url),

    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: SITE_CONFIG.author.twitter,
    },

    verification: {
      google: googleCode || undefined,
      ...(Object.keys(otherVerification).length > 0
        ? { other: otherVerification }
        : {}),
    },

    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'theme-color': '#FFFFFF',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Inter — 영문/숫자 (mobbin 톤) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Viewport meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        
        {/* 한국어 최적화 메타 태그 */}
        <meta httpEquiv="Content-Language" content="ko" />
        <meta name="language" content="Korean" />
        
        {/* 성능 힌트 */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://image.thum.io" />
        <link rel="dns-prefetch" href="//image.thum.io" />

        {/* 사이트 전역 구조화 데이터 (Organization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.url,
              description: SITE_CONFIG.description,
              email: SITE_CONFIG.author.email,
              sameAs: [SITE_CONFIG.author.github, SITE_CONFIG.author.linkedin],
              areaServed: 'KR',
              knowsAbout: [
                '홈페이지 제작',
                '웹사이트 개발',
                'AI 솔루션 개발',
                '업무 자동화',
                '반응형 웹',
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans bg-surface text-ink antialiased">
        <ClientErrorBoundary>
          {children}
        </ClientErrorBoundary>

        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-white px-4 py-2 rounded-md z-50"
        >
          메인 콘텐츠로 건너뛰기
        </a>
      </body>
    </html>
  );
}
