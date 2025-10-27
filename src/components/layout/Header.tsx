/**
 * Header 컴포넌트
 * Yellopencil 스타일 - 전문 외주 업체 디자인
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS, CONTACT_INFO } from '@/lib/constants';
import { JPLogo } from '@/components/icons';

interface HeaderProps {
  className?: string;
}

/**
 * 모바일 메뉴 아이콘 컴포넌트 (애니메이션)
 */
const MenuIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <motion.div
    className="w-6 h-6 flex flex-col justify-center items-center gap-1.5"
    animate={isOpen ? 'open' : 'closed'}
  >
    <motion.span
      className="block w-6 h-0.5 bg-current rounded-full"
      variants={{
        closed: { rotate: 0, y: 0 },
        open: { rotate: 45, y: 8 }
      }}
      transition={{ duration: 0.3 }}
    />
    <motion.span
      className="block w-6 h-0.5 bg-current rounded-full"
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 0 }
      }}
      transition={{ duration: 0.3 }}
    />
    <motion.span
      className="block w-6 h-0.5 bg-current rounded-full"
      variants={{
        closed: { rotate: 0, y: 0 },
        open: { rotate: -45, y: -8 }
      }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
);

/**
 * 로고 컴포넌트 (SVG 기반 JP 로고)
 */
const Logo: React.FC = () => (
  <Link
    href="/"
    className="flex items-center space-x-2 lg:space-x-3 group"
  >
    <motion.div
      className="relative w-10 h-10 lg:w-12 lg:h-12"
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {/* 배경 글로우 */}
      <div className="absolute inset-0 bg-green rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

      {/* SVG 로고 */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <JPLogo size={48} className="lg:w-12 lg:h-12 w-10 h-10" />
      </motion.div>
    </motion.div>

    <motion.div
      className="flex flex-col leading-none"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span
        className="text-xl lg:text-2xl font-black text-white group-hover:text-green transition-colors duration-300"
        style={{ fontStyle: 'italic', letterSpacing: '0.02em' }}
      >
        JPEX
      </span>
      <span
        className="text-[10px] lg:text-xs font-bold text-green/70 group-hover:text-green transition-colors duration-300 -mt-0.5"
        style={{ fontStyle: 'italic', letterSpacing: '0.15em' }}
      >
        STUDIO
      </span>
    </motion.div>
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
        'relative px-4 py-2 text-base font-medium transition-colors duration-300 group',
        'hover:text-green',
        isActive ? 'text-green' : 'text-white',
        className
      )}
    >
      {children}

      {/* 언더라인 애니메이션 */}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-green"
        initial={{ width: isActive ? '100%' : '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
};

/**
 * 데스크톱 네비게이션 컴포넌트
 */
const DesktopNavigation: React.FC = () => (
  <nav className="hidden lg:flex items-center space-x-2">
    {NAVIGATION_ITEMS.filter((item) => item.href !== '/quote').map((item, index) => (
      <motion.div
        key={item.href}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <NavLink href={item.href}>
          {item.name}
        </NavLink>
      </motion.div>
    ))}
  </nav>
);

/**
 * CTA 버튼
 */
const CTAButtons: React.FC = () => (
  <div className="hidden lg:flex items-center gap-3">
    {/* 카카오톡 상담 버튼 */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <a
        href="https://open.kakao.com/o/syoHUbZh"
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold text-black bg-[#FEE500] rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* 버튼 배경 애니메이션 */}
        <span className="absolute inset-0 bg-[#FDD800] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        <svg className="relative z-10 w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.676l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.298.8a.472.472 0 1 0 .884-.33l-.344-.926zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.212.472-.472z"/>
        </svg>
        <span className="relative z-10">카톡 상담</span>
      </a>
    </motion.div>

    {/* 견적 문의 버튼 */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href="/quote"
        className="relative inline-flex items-center justify-center px-6 py-3 text-base font-bold text-black bg-green rounded-lg overflow-hidden group shadow-glow-green-sm hover:shadow-glow-green transition-shadow duration-300"
      >
        {/* 버튼 배경 애니메이션 */}
        <span className="absolute inset-0 bg-green-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        <span className="relative z-10">견적 문의</span>
      </Link>
    </motion.div>
  </div>
);

/**
 * 모바일 메뉴 컴포넌트
 */
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
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
      <motion.div
        className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* 모바일 메뉴 */}
      <motion.div
        className="fixed top-0 right-0 w-80 max-w-[90vw] h-full bg-black border-l-2 border-green/20 z-50 lg:hidden"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="flex flex-col h-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <Logo />
            <motion.button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-green transition-colors"
              aria-label="메뉴 닫기"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* 네비게이션 링크들 */}
          <nav className="flex-1 py-8 overflow-y-auto">
            <div className="space-y-2 px-6">
              {NAVIGATION_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <NavLink
                    href={item.href}
                    onClick={onClose}
                    className="block px-6 py-4 rounded-lg hover:bg-green/10 border border-transparent hover:border-green/30"
                  >
                    <div>
                      <div className="font-bold text-lg">{item.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                    </div>
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* 연락처 정보 */}
          <motion.div
            className="p-6 border-t border-gray-800 bg-black-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="space-y-4">
              <p className="text-sm font-bold text-green">Contact</p>

              {/* 카카오톡 상담 버튼 */}
              <a
                href="https://open.kakao.com/o/syoHUbZh"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-2 w-full px-4 py-3 text-base font-bold text-black bg-[#FEE500] rounded-lg hover:bg-[#FDD800] transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.676l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.298.8a.472.472 0 1 0 .884-.33l-.344-.926zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.212.472-.472z"/>
                </svg>
                카카오톡 상담
              </a>

              <div className="space-y-3">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="block text-sm text-gray-400 hover:text-green transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="block text-sm text-gray-400 hover:text-green transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

/**
 * Header 컴포넌트 메인
 * Yellopencil 스타일: 고정 높이 90px (데스크톱), 57px (모바일)
 */
export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // 스크롤에 따른 배경 투명도
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.8, 0.98]);

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
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-30',
          // Yellopencil 스타일 고정 높이
          'h-[57px] lg:h-[90px]',
          'border-b',
          'transition-all duration-300',
          isScrolled
            ? 'border-green/30 shadow-glow-green-sm'
            : 'border-gray-800/50',
          className
        )}
        style={{
          backgroundColor: `rgba(21, 21, 23, ${backgroundOpacity})`,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="container max-w-container mx-auto h-full px-[15px] lg:px-8">
          <div className="flex items-center justify-between h-full">
            {/* 로고 */}
            <Logo />

            {/* 데스크톱 네비게이션 */}
            <DesktopNavigation />

            {/* CTA 버튼들 */}
            <CTAButtons />

            {/* 모바일 메뉴 버튼 */}
            <motion.button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-white hover:text-green transition-colors"
              aria-label="메뉴 열기"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MenuIcon isOpen={isMobileMenuOpen} />
            </motion.button>
          </div>
        </div>

        {/* 하단 그린 라인 애니메이션 */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-green to-transparent"
          initial={{ width: '0%', left: '50%', x: '-50%' }}
          animate={isScrolled ? { width: '100%' } : { width: '0%' }}
          transition={{ duration: 0.5 }}
        />
      </motion.header>

      {/* 모바일 메뉴 */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* 헤더 높이만큼 상단 여백 확보 (Yellopencil 스타일) */}
      <div className="h-[57px] lg:h-[90px]" />
    </>
  );
};

export default Header;
