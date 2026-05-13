/**
 * Header — 슬림 라이트 (60px)
 * 노트폴리오 톤: 로고 + 네비 + CTA
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS, CONTACT_INFO } from '@/lib/constants';

interface HeaderProps {
  className?: string;
}

const Logo: React.FC = () => (
  <Link href="/" className="flex items-baseline gap-2 group">
    <span
      className="text-[22px] font-bold text-ink tracking-tight"
      style={{ fontStyle: 'italic', letterSpacing: '-0.02em' }}
    >
      JPEX
    </span>
    <span className="hidden sm:inline text-[13px] font-medium text-ink-muted tracking-widest uppercase">
      Studio
    </span>
  </Link>
);

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-[16.5px] font-medium transition-colors duration-200',
        isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
      )}
    >
      {children}
    </Link>
  );
};

const KakaoButton: React.FC<{ className?: string; onClick?: () => void }> = ({
  className,
  onClick,
}) => (
  <a
    href="https://open.kakao.com/o/syoHUbZh"
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
    className={cn(
      'inline-flex items-center gap-1.5 text-[15.5px] font-medium text-ink-muted hover:text-ink transition-colors',
      className
    )}
  >
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
    </svg>
    카톡 상담
  </a>
);

const QuoteCTA: React.FC<{ className?: string; onClick?: () => void }> = ({
  className,
  onClick,
}) => (
  <Link
    href="/quote"
    onClick={onClick}
    className={cn(
      'inline-flex items-center gap-1.5 px-5 py-2.5 text-[15.5px] font-medium text-white bg-accent rounded-md hover:bg-accent-hover transition-colors',
      className
    )}
  >
    견적 문의
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  </Link>
);

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 4);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 h-[72px] bg-surface/90 backdrop-blur-md transition-shadow',
          isScrolled ? 'border-b border-line' : 'border-b border-transparent',
          className
        )}
      >
        <div className="container mx-auto h-full">
          <div className="flex items-center justify-between h-full">
            <Logo />

            <nav className="hidden lg:flex items-center gap-9">
              {NAVIGATION_ITEMS.filter((item) => item.href !== '/quote').map(
                (item) => (
                  <NavLink key={item.href} href={item.href}>
                    {item.name}
                  </NavLink>
                )
              )}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <KakaoButton />
              <span className="w-px h-4 bg-line-strong" />
              <QuoteCTA />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 -mr-2 text-ink"
              aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-[72px] left-0 right-0 z-30 bg-surface border-b border-line lg:hidden animate-fade-in">
            <nav className="container mx-auto py-4 flex flex-col">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 text-[16.5px] font-medium text-ink border-b border-line last:border-0"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-4">
                <KakaoButton onClick={() => setIsMenuOpen(false)} />
                <QuoteCTA className="ml-auto" onClick={() => setIsMenuOpen(false)} />
              </div>
              <div className="pt-4 mt-4 border-t border-line text-[13px] text-ink-subtle space-y-1">
                <a href={`mailto:${CONTACT_INFO.email}`} className="block hover:text-ink">
                  {CONTACT_INFO.email}
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="block hover:text-ink"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* 헤더 높이만큼 여백 */}
      <div className="h-[72px]" />
    </>
  );
};

export default Header;
