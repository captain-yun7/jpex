/**
 * Header 컴포넌트
 * 카카오 개발자 스타일 기반의 헤더 컴포넌트
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

/**
 * 모바일 메뉴 아이콘 컴포넌트
 */
const MenuIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <div className="w-6 h-6 flex flex-col justify-center items-center">
    <span
      className={cn(
        'block w-5 h-0.5 bg-current transition-all duration-300',
        isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
      )}
    />
    <span
      className={cn(
        'block w-5 h-0.5 bg-current transition-all duration-300',
        isOpen ? 'opacity-0' : 'opacity-100'
      )}
    />
    <span
      className={cn(
        'block w-5 h-0.5 bg-current transition-all duration-300',
        isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
      )}
    />
  </div>
);

/**
 * 로고 컴포넌트
 */
const Logo: React.FC = () => (
  <Link
    href="/"
    className="flex items-center space-x-2 font-bold text-xl text-text-primary hover:text-accent transition-colors duration-normal"
  >
    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">JP</span>
    </div>
    <span>JPEX</span>
  </Link>
);

/**
 * 네비게이션 링크 컴포넌트
 */
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative px-3 py-2 text-sm font-medium transition-all duration-normal',
        'hover:text-accent',
        isActive 
          ? 'text-accent' 
          : 'text-text-primary',
        className
      )}
    >
      {children}
      {/* 활성 상태 인디케이터 */}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
      )}
    </Link>
  );
};

/**
 * 데스크톱 네비게이션 컴포넌트
 */
const DesktopNavigation: React.FC = () => (
  <nav className="hidden md:flex items-center space-x-1">
    {NAVIGATION_ITEMS.filter((item) => item.href !== '/portfolio').map((item) => (
      <NavLink key={item.href} href={item.href}>
        {item.name}
      </NavLink>
    ))}
  </nav>
);

/**
 * 모바일 메뉴 컴포넌트
 */
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // 메뉴가 열릴 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* 모바일 메뉴 */}
      <div className="fixed top-0 right-0 w-80 max-w-[90vw] h-full bg-background-primary border-l border-secondary z-50 md:hidden">
        <div className="flex flex-col h-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-secondary">
            <Logo />
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="메뉴 닫기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 네비게이션 링크들 */}
          <nav className="flex-1 py-6">
            <div className="space-y-1 px-6">
              {NAVIGATION_ITEMS.filter((item) => item.href !== '/portfolio').map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg hover:bg-background-secondary"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-text-muted mt-1">{item.description}</div>
                  </div>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* 연락처 정보 */}
          <div className="p-6 border-t border-secondary">
            <div className="space-y-3">
              <p className="text-sm font-medium text-text-primary">연락처</p>
              <div className="space-y-2">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="block text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="block text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Header 컴포넌트 메인
 */
export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30',
          'bg-background-primary/80 backdrop-blur-sm',
          'border-b border-secondary/50',
          'transition-all duration-normal',
          isScrolled && 'bg-background-primary/95 shadow-lg',
          className
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* 로고 */}
            <Logo />

            {/* 데스크톱 네비게이션 */}
            <DesktopNavigation />

            {/* CTA 버튼들 */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="/contact"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                문의하기
              </a>
              <a
                href="/quote"
                className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                견적 요청
              </a>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="메뉴 열기"
            >
              <MenuIcon isOpen={isMobileMenuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* 헤더 높이만큼 상단 여백 확보 */}
      <div className="h-16" />
    </>
  );
};

export default Header;