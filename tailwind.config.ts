import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors (JPEX 그린 - 확장)
        green: {
          DEFAULT: '#00FF88',    // 메인 그린
          light: '#33ffaa',      // 밝은 그린
          dark: '#00cc6f',       // 어두운 그린
          50: '#e6fff5',
          100: '#ccffeb',
          200: '#99ffd6',
          300: '#66ffc2',
          400: '#33ffaa',
          500: '#00FF88',        // 기본
          600: '#00cc6f',
          700: '#009954',
          800: '#006638',
          900: '#00331c',
        },

        // Background Colors (현재 유지)
        black: {
          DEFAULT: '#151517',    // 메인 배경
          light: '#1a1a1c',      // 카드 배경
          lighter: '#2a2a2a',    // 호버 상태
          dark: '#0f0f10',       // 더 어두운 배경
        },

        // Grayscale
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#888888',       // 현재 사용 중
          600: '#737373',
          700: '#525252',
          800: '#404040',
          900: '#262626',
        },

        // Text Colors
        white: {
          DEFAULT: '#ffffff',
          off: '#cccccc',        // 보조 텍스트
        },

        // Legacy compatibility (기존 컬러 유지)
        primary: {
          DEFAULT: '#151517',
        },
        secondary: {
          DEFAULT: '#2a2a2a',
        },
        accent: {
          DEFAULT: '#00A0FF',    // 카카오 블루 (유지)
        },
        success: {
          DEFAULT: '#00FF88',    // 그린
          dark: '#00cc6f',
        },
        warning: {
          DEFAULT: '#FFB800',
          dark: '#e6a600',
        },
        error: {
          DEFAULT: '#FF4444',
          dark: '#e63939',
        },
        background: {
          primary: '#151517',
          secondary: '#1a1a1c',
          tertiary: '#f7fafc',
        },
        text: {
          primary: '#ffffff',
          secondary: '#cccccc',
          muted: '#888888',
          dark: '#1a202c',
        }
      },

      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Malgun Gothic', 'Apple SD Gothic Neo', 'sans-serif'],
        mono: ['Fira Code', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'monospace'],
        numeric: ['SF Pro Display', '-apple-system', 'sans-serif'],
      },

      fontSize: {
        // 기본 크기
        'xs': ['0.75rem', { lineHeight: '1.2' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.4' }],     // 14px
        'base': ['1rem', { lineHeight: '1.6' }],       // 16px
        'lg': ['1.125rem', { lineHeight: '1.6' }],     // 18px
        'xl': ['1.25rem', { lineHeight: '1.5' }],      // 20px
        // Yellopencil 스타일 대형 타이틀
        '2xl': ['1.75rem', { lineHeight: '1.4' }],     // 28px
        '3xl': ['2.25rem', { lineHeight: '1.3' }],     // 36px
        '4xl': ['3rem', { lineHeight: '1.2' }],        // 48px
        '5xl': ['4rem', { lineHeight: '1.1' }],        // 64px
        '6xl': ['5rem', { lineHeight: '1.1' }],        // 80px
        '7xl': ['6rem', { lineHeight: '1' }],          // 96px
      },

      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        black: '900',  // Yellopencil 대형 타이틀용
      },

      spacing: {
        'xs': '0.25rem',   // 4px
        'sm': '0.5rem',    // 8px
        'md': '1rem',      // 16px
        'lg': '1.5rem',    // 24px
        'xl': '2rem',      // 32px
        '2xl': '3rem',     // 48px
        '3xl': '4rem',     // 64px
        '4xl': '6rem',     // 96px
        // Yellopencil 추가 여백
        '15': '3.75rem',   // 60px
        '18': '4.5rem',    // 72px
        '22': '5.5rem',    // 88px (헤더 높이 근처)
        '26': '6.5rem',    // 104px
        '30': '7.5rem',    // 120px
      },

      maxWidth: {
        'container': '88.75rem',  // 1420px (Yellopencil)
      },

      borderRadius: {
        'xs': '0.125rem',  // 2px
        'sm': '0.25rem',   // 4px
        'md': '0.375rem',  // 6px
        'lg': '0.5rem',    // 8px
        'xl': '0.75rem',   // 12px
        '2xl': '1rem',     // 16px
        '3xl': '1.5rem',   // 24px
      },

      boxShadow: {
        // 그린 글로우 효과
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.3)',
        'glow-green-sm': '0 0 10px rgba(0, 255, 136, 0.2)',
        'glow-green-lg': '0 0 40px rgba(0, 255, 136, 0.4)',
        'card-green': '0 10px 25px rgba(0, 255, 136, 0.1)',
        'card-green-hover': '0 20px 40px rgba(0, 255, 136, 0.15)',
        // Legacy (블루 글로우 유지)
        'glow': '0 0 20px rgba(0, 160, 255, 0.3)',
        'glow-sm': '0 0 10px rgba(0, 160, 255, 0.2)',
        'card': '0 10px 25px rgba(0, 160, 255, 0.1)',
        'card-hover': '0 20px 40px rgba(0, 160, 255, 0.15)',
      },

      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 1.5s infinite',
        // Yellopencil 애니메이션
        'spin-slow': 'spin 20s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(2rem)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        // Yellopencil 애니메이션
        slideUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },

      transitionDuration: {
        'fast': '0.15s',
        'normal': '0.3s',
        'smooth': '0.3s',  // Yellopencil 기본값
        'slow': '0.6s',
      },

      transitionTimingFunction: {
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',      // 767px 이하 = 모바일 (Yellopencil)
        'lg': '992px',      // 992px 이상 = 데스크톱 (Yellopencil)
        'xl': '1280px',
        '2xl': '1420px',    // Container 최대 너비
        '3xl': '1600px',
      },

      container: {
        center: true,
        padding: {
          DEFAULT: '15px',      // 모바일 (Yellopencil)
          lg: '2rem',           // 32px 데스크톱 (Yellopencil)
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '992px',
          xl: '1280px',
          '2xl': '1420px',     // 최대 너비 (Yellopencil)
        },
      },
    },
  },
  plugins: [],
};

export default config;
