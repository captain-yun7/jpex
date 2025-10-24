/**
 * RootLayout 컴포넌트
 * JPEX 프리랜싱 웹사이트의 루트 레이아웃
 */

import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG, SEO_CONFIG } from "@/lib/constants";
import { ClientErrorBoundary } from "@/components/common";

// Pretendard 폰트 import
import '@fontsource/pretendard/300.css';  // Light
import '@fontsource/pretendard/400.css';  // Regular
import '@fontsource/pretendard/500.css';  // Medium
import '@fontsource/pretendard/600.css';  // SemiBold
import '@fontsource/pretendard/700.css';  // Bold
import '@fontsource/pretendard/900.css';  // Black

export const metadata: Metadata = {
  title: {
    template: SEO_CONFIG.titleTemplate,
    default: SEO_CONFIG.defaultTitle,
  },
  description: SEO_CONFIG.description,
  keywords: [...SEO_CONFIG.keywords],
  authors: [{ name: SEO_CONFIG.author }],
  creator: SEO_CONFIG.creator,
  publisher: SEO_CONFIG.publisher,
  robots: SEO_CONFIG.robots,
  metadataBase: new URL(SITE_CONFIG.url),
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: SITE_CONFIG.author.twitter,
  },
  
  // 검증 코드
  verification: SEO_CONFIG.verification,
  
  // 추가 메타 태그
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'theme-color': '#00A0FF',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
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
      </head>
      <body className="font-sans bg-gray-900 text-white antialiased" style={{backgroundColor: '#151517'}}>
        <ClientErrorBoundary>
          {children}
        </ClientErrorBoundary>
        
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-white px-4 py-2 rounded-md z-50 focus:z-50"
        >
          메인 콘텐츠로 건너뛰기
        </a>
      </body>
    </html>
  );
}
