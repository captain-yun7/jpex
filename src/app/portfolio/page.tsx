/**
 * Portfolio 페이지
 * JPEX 포트폴리오 및 프로젝트 쇼케이스
 * SEO 최적화: 홈페이지 제작, 회사 홈페이지, 병원 홈페이지 제작
 */

import { Metadata } from 'next';
import PortfolioContent from './PortfolioContent';
import { projects } from './data';

// SEO 메타데이터
export const metadata: Metadata = {
  title: '홈페이지 제작 포트폴리오 | 회사·병원·쇼핑몰 제작 전문 - JpexStudio',
  description: '회사 홈페이지, 분양 사이트, AI 자동화 SaaS, AI 채점 시스템 등 실제 운영 중인 12개 프로젝트를 직접 확인하세요. JpexStudio는 라이브 URL로 검증된 웹 개발·AI 솔루션 포트폴리오를 제공합니다.',
  keywords: [
    '홈페이지 제작',
    '회사 홈페이지 제작',
    '병원 홈페이지 제작',
    '쇼핑몰 제작',
    '분양 사이트 제작',
    '웹사이트 제작',
    '반응형 웹 제작',
    '홈페이지 제작 업체',
    '홈페이지 제작 회사',
    '웹 개발 외주',
    '홈페이지 외주',
    '웹 에이전시',
    '온라인 강의 플랫폼 제작',
    '분양 홈페이지 제작',
    '기업 홈페이지 제작',
    '반응형 홈페이지 제작',
    '모바일 홈페이지 제작',
    'AI 솔루션 개발'
  ],
  openGraph: {
    title: '홈페이지 제작 포트폴리오 - 회사/병원/쇼핑몰 제작 전문 JpexStudio',
    description: '실제 운영 중인 12개 프로젝트로 검증된 웹 개발·AI 솔루션 포트폴리오를 확인하세요.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.jpexstudio.com/portfolio',
    siteName: 'JpexStudio',
  },
  twitter: {
    card: 'summary_large_image',
    title: '홈페이지 제작 포트폴리오 - JpexStudio',
    description: '실제 운영 중인 12개 프로젝트로 검증된 웹 개발·AI 솔루션 포트폴리오',
  },
  alternates: {
    canonical: 'https://www.jpexstudio.com/portfolio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function PortfolioPage() {
  // 구조화된 데이터 (JSON-LD) for 검색 엔진 최적화
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '홈페이지 제작 포트폴리오 - JpexStudio',
    description: '회사 홈페이지 제작, 분양 사이트 제작, AI 자동화 솔루션 등 실제 운영 중인 웹 개발 프로젝트 포트폴리오',
    url: 'https://www.jpexstudio.com/portfolio',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: project.liveUrl || undefined,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          image: project.image,
          url: project.liveUrl || undefined,
          dateCreated: project.year,
          keywords: project.technologies.join(', '),
          creator: {
            '@type': 'Organization',
            name: 'JpexStudio',
            url: 'https://www.jpexstudio.com'
          }
        }
      }))
    },
    provider: {
      '@type': 'Organization',
      name: 'JpexStudio',
      url: 'https://www.jpexstudio.com',
      description: '홈페이지 제작, 웹 개발, AI 솔루션 전문 스튜디오',
      sameAs: [
        'https://github.com/jpex-dev'
      ]
    }
  };

  return (
    <>
      {/* 구조화된 데이터 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 실제 콘텐츠 */}
      <PortfolioContent />
    </>
  );
}
