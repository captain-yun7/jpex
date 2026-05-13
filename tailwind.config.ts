import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 포인트 컬러 (인디고)
        accent: {
          DEFAULT: '#4F46E5',
          hover: '#4338CA',
          light: '#EEF2FF',
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },

        // 무채색 — 라이트 베이스 (가독성 위해 muted 약간 진하게)
        ink: {
          DEFAULT: '#111111',  // 본문 1차
          muted: '#555555',    // 본문 2차 (가독성↑)
          subtle: '#888888',   // 보조
        },

        surface: {
          DEFAULT: '#FFFFFF',  // 메인 배경
          alt: '#FAFAFA',      // 카드/구분 배경
          hover: '#F5F5F5',    // 호버 상태
        },

        line: {
          DEFAULT: '#EEEEEE',  // 보더
          strong: '#DDDDDD',   // 강조 보더
        },

        // 그레이스케일 (보조)
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },

        // 상태색 (필요 시)
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },

      fontFamily: {
        sans: [
          'Pretendard',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'sans-serif',
        ],
        // 영문/숫자 전용 (라벨, 숫자, 코드)
        display: [
          'Inter',
          'Pretendard',
          '-apple-system',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'monospace'],
      },

      fontSize: {
        // 가독성 강화 — 한 단계씩 키우고 line-height도 여유
        'xs': ['0.8125rem', { lineHeight: '1.5' }],   // 13px — 메타
        'sm': ['0.9375rem', { lineHeight: '1.6' }],   // 15px — 카드 라벨/메타
        'base': ['1rem', { lineHeight: '1.7' }],      // 16px — 본문 기본
        'lg': ['1.125rem', { lineHeight: '1.7' }],    // 18px
        'xl': ['1.375rem', { lineHeight: '1.5' }],    // 22px
        '2xl': ['1.75rem', { lineHeight: '1.4' }],    // 28px
        '3xl': ['2.125rem', { lineHeight: '1.3' }],   // 34px
        '4xl': ['2.625rem', { lineHeight: '1.2' }],   // 42px
        '5xl': ['3.25rem', { lineHeight: '1.15' }],   // 52px
        '6xl': ['4rem', { lineHeight: '1.1' }],       // 64px
      },

      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      maxWidth: {
        'container': '1440px',
      },

      borderRadius: {
        'sm': '4px',
        DEFAULT: '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        'full': '9999px',
      },

      boxShadow: {
        // mobbin식 부드러운 그림자
        'card': '0 1px 2px rgba(17, 17, 17, 0.04)',
        'card-hover': '0 8px 24px -4px rgba(17, 17, 17, 0.08), 0 2px 6px -1px rgba(17, 17, 17, 0.04)',
        'lift': '0 12px 32px -8px rgba(17, 17, 17, 0.10), 0 4px 8px -2px rgba(17, 17, 17, 0.04)',
        'pill': '0 1px 2px rgba(17, 17, 17, 0.06), inset 0 0 0 1px rgba(17, 17, 17, 0.04)',
        'header': '0 1px 0 #EEEEEE',
      },

      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      transitionDuration: {
        DEFAULT: '200ms',
      },

      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },

      container: {
        center: true,
        padding: {
          DEFAULT: '20px',
          lg: '32px',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
    },
  },
  plugins: [],
};

export default config;
