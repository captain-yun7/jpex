/**
 * Footer 컴포넌트
 * 카카오 개발자 스타일 기반의 푸터 컴포넌트
 */

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  SITE_CONFIG, 
  NAVIGATION_ITEMS, 
  CONTACT_INFO, 
  SOCIAL_LINKS,
  PROJECT_CATEGORIES 
} from '@/lib/constants';

interface FooterProps {
  className?: string;
}

/**
 * 소셜 아이콘 컴포넌트
 */
const SocialIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const icons = {
    github: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    linkedin: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    twitter: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    instagram: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.23 2.471c3.86 0 5.54 0 6.21.03.92.04 1.43.19 1.77.32.44.17.78.38 1.11.71.34.33.54.67.71 1.11.13.34.28.85.32 1.77.03.67.03 2.35.03 6.21s0 5.54-.03 6.21c-.04.92-.19 1.43-.32 1.77-.17.44-.38.78-.71 1.11-.33.34-.67.54-1.11.71-.34.13-.85.28-1.77.32-.67.03-2.35.03-6.21.03s-5.54 0-6.21-.03c-.92-.04-1.43-.19-1.77-.32-.44-.17-.78-.38-1.11-.71-.34-.33-.54-.67-.71-1.11-.13-.34-.28-.85-.32-1.77-.03-.67-.03-2.35-.03-6.21s0-5.54.03-6.21c.04-.92.19-1.43.32-1.77.17-.44.38-.78.71-1.11.33-.34.67-.54 1.11-.71.34-.13.85-.28 1.77-.32.67-.03 2.35-.03 6.21-.03z"/>
      </svg>
    ),
    youtube: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  };

  return icons[name as keyof typeof icons] || null;
};

/**
 * 푸터 링크 섹션 컴포넌트
 */
interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
      {title}
    </h3>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

/**
 * 푸터 링크 컴포넌트
 */
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, external = false }) => (
  <Link
    href={href}
    className="text-sm text-text-secondary hover:text-accent transition-colors duration-normal block"
    {...(external && {
      target: '_blank',
      rel: 'noopener noreferrer'
    })}
  >
    {children}
  </Link>
);

/**
 * Footer 컴포넌트 메인
 */
export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'bg-background-secondary border-t border-secondary',
        className
      )}
    >
      <div className="container mx-auto">
        {/* 메인 푸터 콘텐츠 */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 회사 정보 */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">JP</span>
                </div>
                <div>
                  <h2 className="font-bold text-xl text-text-primary">JPEX</h2>
                  <p className="text-xs text-text-muted">프리랜서 웹 개발 & AI 솔루션</p>
                </div>
              </div>
              
              <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-md">
                {SITE_CONFIG.description}
                <br />
                전문적이고 혁신적인 디지털 솔루션으로 비즈니스 성장을 도와드립니다.
              </p>

              {/* 연락처 정보 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`}
                    className="text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm text-text-secondary">
                    {CONTACT_INFO.address}
                  </span>
                </div>
              </div>
            </div>

            {/* 네비게이션 링크 */}
            <FooterSection title="바로가기">
              {NAVIGATION_ITEMS.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.name}
                </FooterLink>
              ))}
            </FooterSection>

            {/* 서비스 링크 */}
            <FooterSection title="서비스">
              {Object.entries(PROJECT_CATEGORIES).map(([key, category]) => (
                <FooterLink key={key} href={`/services#${key}`}>
                  {category.label}
                </FooterLink>
              ))}
              <FooterLink href="/quote">견적 요청</FooterLink>
              <FooterLink href="/contact">문의하기</FooterLink>
            </FooterSection>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-secondary" />

        {/* 하단 푸터 */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 저작권 정보 */}
            <div className="text-center md:text-left">
              <p className="text-sm text-text-muted">
                © {currentYear} {SITE_CONFIG.name}. All rights reserved.
              </p>
              <p className="text-xs text-text-muted mt-1">
                Made with ❤️ using Next.js & Tailwind CSS
              </p>
            </div>

            {/* 소셜 미디어 링크 */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-muted hidden sm:block">Follow us:</span>
              <div className="flex items-center space-x-3">
                {Object.entries(SOCIAL_LINKS).map(([key, social]) => (
                  <a
                    key={key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent transition-colors duration-normal p-2 hover:bg-background-primary rounded-lg"
                    aria-label={`Visit our ${social.name}`}
                  >
                    <SocialIcon name={key} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-accent text-white rounded-full shadow-lg hover:bg-accent-hover transition-all duration-normal hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/50 z-20"
        aria-label="맨 위로 이동"
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;