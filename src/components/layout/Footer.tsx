/**
 * Footer 컴포넌트
 * JPEX Studio 스타일 - Yellopencil 디자인
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { JPLogo } from '@/components/icons';
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
    <h3 className="text-sm font-bold text-green uppercase tracking-wider mb-6 relative inline-block">
      {title}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green/30" />
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
    className="text-sm text-gray-400 hover:text-green transition-all duration-300 block group flex items-center"
    {...(external && {
      target: '_blank',
      rel: 'noopener noreferrer'
    })}
  >
    <span className="w-0 h-0.5 bg-green group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
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
        'bg-black border-t-2 border-green/20 relative overflow-hidden',
        className
      )}
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green rounded-full blur-3xl" />
      </div>

      <div className="container max-w-container mx-auto px-[15px] lg:px-8 relative z-10">
        {/* 메인 푸터 콘텐츠 */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* 회사 정보 */}
            <div className="lg:col-span-2">
              <motion.div
                className="flex items-center space-x-3 mb-6 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
                  <JPLogo size={48} className="relative" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-2xl font-black text-white group-hover:text-green transition-colors" style={{ fontStyle: 'italic' }}>
                    JPEX
                  </span>
                  <span className="text-xs font-bold text-green/70 group-hover:text-green transition-colors -mt-0.5" style={{ fontStyle: 'italic', letterSpacing: '0.15em' }}>
                    STUDIO
                  </span>
                </div>
              </motion.div>

              <motion.p
                className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {SITE_CONFIG.description}
                <br />
                <span className="text-green/80 font-medium">전문적이고 혁신적인 디지털 솔루션</span>으로 비즈니스 성장을 도와드립니다.
              </motion.p>

              {/* 연락처 정보 */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 rounded-lg bg-green/10 flex items-center justify-center group-hover:bg-green/20 transition-colors">
                    <svg className="w-4 h-4 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm text-gray-400 hover:text-green transition-colors font-medium"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 rounded-lg bg-green/10 flex items-center justify-center group-hover:bg-green/20 transition-colors">
                    <svg className="w-4 h-4 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`}
                    className="text-sm text-gray-400 hover:text-green transition-colors font-medium"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 rounded-lg bg-green/10 flex items-center justify-center group-hover:bg-green/20 transition-colors">
                    <svg className="w-4 h-4 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-400 font-medium">
                    {CONTACT_INFO.address}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* 네비게이션 링크 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FooterSection title="바로가기">
                {NAVIGATION_ITEMS.map((item) => (
                  <FooterLink key={item.href} href={item.href}>
                    {item.name}
                  </FooterLink>
                ))}
              </FooterSection>
            </motion.div>

            {/* 서비스 링크 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FooterSection title="서비스">
                {Object.entries(PROJECT_CATEGORIES).map(([key, category]) => (
                  <FooterLink key={key} href={`/services#${key}`}>
                    {category.label}
                  </FooterLink>
                ))}
              </FooterSection>
            </motion.div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-green/10" />

        {/* 하단 푸터 */}
        <div className="py-8">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* 저작권 정보 */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">
                © {currentYear} <span className="text-green font-semibold">{SITE_CONFIG.name} Studio</span>. All rights reserved.
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Made with <span className="text-green">💚</span> using <span className="text-white/80">Next.js</span> & <span className="text-white/80">Tailwind CSS</span>
              </p>
            </div>

            {/* 소셜 미디어 링크 */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 hidden sm:block font-medium">Connect:</span>
              <div className="flex items-center space-x-2">
                {Object.entries(SOCIAL_LINKS).map(([key, social]) => (
                  <motion.a
                    key={key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-green transition-colors p-2 hover:bg-green/10 rounded-lg"
                    aria-label={`Visit our ${social.name}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SocialIcon name={key} className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 뒤로가기 버튼 */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-green text-black rounded-full shadow-glow-green hover:shadow-glow-green-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green/50 z-20"
        aria-label="맨 위로 이동"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;