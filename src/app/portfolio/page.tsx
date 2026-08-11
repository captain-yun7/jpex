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
  title: '웹 서비스 & AI 개발 포트폴리오 | SaaS·AI 에이전트·LLM 데이터셋 - JpexStudio',
  description: '웹 서비스, SaaS, AI 에이전트, LLM 학습/평가 데이터셋 구축 등 실제 운영 중인 프로젝트를 직접 확인하세요. JpexStudio는 라이브 URL로 검증된 웹·AI 개발 포트폴리오를 제공합니다.',
  keywords: [
    'AI 솔루션 개발',
    'AI 에이전트 개발',
    'LLM 데이터셋 구축',
    'RAG 구축',
    'SaaS 개발',
    '웹 서비스 개발',
    '업무 자동화',
    '챗봇 개발',
    '홈페이지 제작',
    '회사 홈페이지 제작',
    '웹사이트 제작',
    '반응형 웹 제작',
    '웹 개발 외주',
    '웹 에이전시',
    '기업 홈페이지 제작',
  ],
  openGraph: {
    title: '웹 서비스 & AI 개발 포트폴리오 - JpexStudio',
    description: '실제 운영 중인 프로젝트로 검증된 웹 서비스·SaaS·AI 솔루션 포트폴리오를 확인하세요.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.jpexstudio.com/portfolio',
    siteName: 'JpexStudio',
  },
  twitter: {
    card: 'summary_large_image',
    title: '웹 서비스 & AI 개발 포트폴리오 - JpexStudio',
    description: '실제 운영 중인 프로젝트로 검증된 웹 서비스·SaaS·AI 솔루션 포트폴리오',
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
    name: '웹 서비스 & AI 개발 포트폴리오 - JpexStudio',
    description: '웹 서비스·SaaS 개발, AI 에이전트, LLM 데이터셋 구축 등 실제 운영 중인 웹·AI 프로젝트 포트폴리오',
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
      description: '웹 서비스·SaaS·AI 솔루션 개발 전문 스튜디오',
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
