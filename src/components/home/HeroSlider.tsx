/**
 * Hero Slider 컴포넌트
 * 전문 외주 업체 수준의 슬라이드 애니메이션
 * 4개 섹션: 웹 / 앱 / AI / 클라우드
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { WebDevIcon, AppDevIcon, AIIcon, CloudIcon } from '@/components/icons';

// 슬라이드 데이터 인터페이스
interface Slide {
  id: number;
  category: string;
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  image: string;
  primaryCTA: string;
  secondaryCTA: string;
  stats: Array<{ value: string; label: string }>;
  iconType: 'web' | 'app' | 'ai' | 'cloud';
}

// 슬라이드 컨텐츠
const slides: Slide[] = [
  {
    id: 1,
    category: 'WEB DEVELOPMENT',
    title: '웹의 경계를',
    highlight: '넘다',
    subtitle: '차세대 웹 경험을 설계합니다',
    description: '반응형 디자인부터 고성능 PWA까지, 사용자 중심의 웹 솔루션으로 비즈니스를 혁신합니다.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80',
    primaryCTA: '프로젝트 시작하기',
    secondaryCTA: '포트폴리오 보기',
    stats: [
      { value: '200+', label: '완료 프로젝트' },
      { value: '98%', label: '고객 만족도' },
      { value: '24/7', label: '기술 지원' },
    ],
    iconType: 'web',
  },
  {
    id: 2,
    category: 'APP DEVELOPMENT',
    title: '모바일에 혁신을',
    highlight: '더하다',
    subtitle: 'iOS와 Android를 넘나드는 네이티브 앱',
    description: '크로스 플랫폼 개발로 비용을 절감하고, 네이티브 성능으로 사용자 경험을 극대화합니다.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80',
    primaryCTA: '앱 개발 상담',
    secondaryCTA: '성공 사례',
    stats: [
      { value: '500K+', label: '앱 다운로드' },
      { value: '4.8★', label: '평균 평점' },
      { value: '60일', label: '평균 개발 기간' },
    ],
    iconType: 'app',
  },
  {
    id: 3,
    category: 'AI SOLUTION',
    title: '지능형 솔루션으로',
    highlight: '미래를 설계하다',
    subtitle: '데이터 기반 의사결정과 자동화',
    description: '머신러닝과 딥러닝 기술로 업무를 자동화하고, AI 기반 인사이트로 경쟁력을 강화합니다.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80',
    primaryCTA: 'AI 컨설팅',
    secondaryCTA: '기술 스택',
    stats: [
      { value: '92%', label: '업무 자동화' },
      { value: '5x', label: '처리 속도 향상' },
      { value: '40%', label: '비용 절감' },
    ],
    iconType: 'ai',
  },
  {
    id: 4,
    category: 'CLOUD INFRASTRUCTURE',
    title: '클라우드로 무한한',
    highlight: '확장성을',
    subtitle: '안전하고 확장 가능한 인프라 구축',
    description: 'AWS, Azure, GCP 기반의 클라우드 아키텍처로 비즈니스 성장에 맞춰 유연하게 확장합니다.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
    primaryCTA: '인프라 구축',
    secondaryCTA: '마이그레이션',
    stats: [
      { value: '99.99%', label: '서비스 가용성' },
      { value: '50%', label: '인프라 비용 절감' },
      { value: '3배', label: '배포 속도 향상' },
    ],
    iconType: 'cloud',
  },
];

// 배경 파티클 컴포넌트
const BackgroundParticles: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => {
        const startX = Math.random() * 1920;
        const startY = Math.random() * 1080;
        const endY = Math.random() * 1080;

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green rounded-full"
            initial={{
              x: startX,
              y: startY,
              opacity: 0,
            }}
            animate={{
              y: [null, endY],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        );
      })}
    </div>
  );
};

// 통계 카드 컴포넌트
const StatCard: React.FC<{ stat: { value: string; label: string }; index: number }> = ({ stat, index }) => (
  <motion.div
    className="flex flex-col items-center p-4 rounded-lg bg-black/30 backdrop-blur-sm border border-green/20"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
  >
    <div className="text-3xl lg:text-4xl font-black text-green mb-1">
      {stat.value}
    </div>
    <div className="text-xs lg:text-sm text-gray-400 text-center">
      {stat.label}
    </div>
  </motion.div>
);

// 아이콘 렌더링 헬퍼 함수
const getIconComponent = (iconType: 'web' | 'app' | 'ai' | 'cloud', size: number) => {
  switch (iconType) {
    case 'web':
      return <WebDevIcon size={size} />;
    case 'app':
      return <AppDevIcon size={size} />;
    case 'ai':
      return <AIIcon size={size} />;
    case 'cloud':
      return <CloudIcon size={size} />;
    default:
      return null;
  }
};

// Hero Slider 메인 컴포넌트
export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // 자동 슬라이드 (7초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  // 슬라이드 애니메이션 variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* 배경 파티클 */}
      <BackgroundParticles />

      {/* 슬라이드 컨텐츠 */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          {/* 배경 이미지 */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* 컨텐츠 */}
          <div className="relative z-10 container max-w-container mx-auto px-[15px] lg:px-8 h-full flex items-center">
            <div className="max-w-3xl">
              {/* 카테고리 */}
              <motion.div
                className="inline-block mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="px-4 py-2 text-xs lg:text-sm font-bold text-green bg-green/10 border border-green/30 rounded-full backdrop-blur-sm">
                  {slide.category}
                </span>
              </motion.div>

              {/* 메인 타이틀 */}
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {slide.title}
                <br />
                <span className="text-green relative inline-block">
                  {slide.highlight}
                  {/* 언더라인 애니메이션 */}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 lg:h-2 bg-green"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                </span>
              </motion.h1>

              {/* 서브 타이틀 */}
              <motion.p
                className="text-xl lg:text-3xl font-bold text-gray-300 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {slide.subtitle}
              </motion.p>

              {/* 설명 */}
              <motion.p
                className="text-base lg:text-lg text-gray-400 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {slide.description}
              </motion.p>

              {/* CTA 버튼들 */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link
                  href="/quote"
                  className="group relative px-8 py-4 text-base lg:text-lg font-bold text-black bg-green rounded-lg overflow-hidden shadow-glow-green-sm hover:shadow-glow-green transition-all duration-300"
                >
                  <span className="absolute inset-0 bg-green-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {slide.primaryCTA}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>

                <Link
                  href="/portfolio"
                  className="px-8 py-4 text-base lg:text-lg font-bold text-white border-2 border-green rounded-lg hover:bg-green/10 transition-all duration-300"
                >
                  {slide.secondaryCTA}
                </Link>
              </motion.div>

              {/* 통계 - 추후 실제 데이터로 교체 예정
              <motion.div
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {slide.stats.map((stat, index) => (
                  <StatCard key={index} stat={stat} index={index} />
                ))}
              </motion.div>
              */}
            </div>
          </div>

          {/* 아이콘 & 회전 장식 요소 (Yellopencil 스타일) */}
          <div className="hidden lg:block absolute top-1/2 right-[10%] -translate-y-1/2">
            {/* 회전하는 외부 원 */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-green/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-green/10 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />

            {/* SVG 아이콘 */}
            <motion.div
              className="relative z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: 0.3
              }}
            >
              {getIconComponent(slide.iconType, 280)}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 슬라이드 네비게이션 (하단 점) */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-green w-12'
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>

      {/* 스크롤 다운 인디케이터 */}
      <motion.div
        className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          className="flex flex-col items-center text-green cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-xs font-medium mb-2">SCROLL</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSlider;
