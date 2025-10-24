/**
 * JP Logo - JPEX Studio 로고 컴포넌트
 * 그린 테마 전문적인 디자인
 */

import React from 'react';

interface JPLogoProps {
  className?: string;
  size?: number;
}

export const JPLogo: React.FC<JPLogoProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* 배경 육각형 */}
    <path
      d="M32 4 L52 16 L52 40 L32 52 L12 40 L12 16 Z"
      fill="url(#logoGradient)"
      opacity="0.15"
    />

    {/* 외곽 육각형 테두리 */}
    <path
      d="M32 4 L52 16 L52 40 L32 52 L12 40 L12 16 Z"
      stroke="url(#logoStroke)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* J 문자 - 모던하고 날카로운 디자인 */}
    <path
      d="M 26 18 L 26 32 Q 26 36 22 36 L 20 36"
      stroke="#00FF88"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      className="drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]"
    />

    {/* J 상단 점 */}
    <circle
      cx="26"
      cy="15"
      r="2"
      fill="#00FF88"
      className="drop-shadow-[0_0_6px_rgba(0,255,136,0.6)]"
    />

    {/* P 문자 - 모던하고 기하학적 디자인 */}
    <path
      d="M 38 18 L 38 38"
      stroke="#00FF88"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
      className="drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]"
    />

    {/* P 상단 원형 부분 */}
    <path
      d="M 38 18 L 44 18 Q 48 18 48 23 Q 48 28 44 28 L 38 28"
      stroke="#00FF88"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      className="drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]"
    />

    {/* 장식 요소 - 코너 */}
    <circle cx="32" cy="32" r="1.5" fill="#00FF88" opacity="0.5" />

    {/* 하단 라인 장식 */}
    <path
      d="M 16 44 L 32 44 L 48 44"
      stroke="#00FF88"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.3"
    />

    <defs>
      {/* 배경 그라디언트 */}
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FF88" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#00cc6f" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#00FF88" stopOpacity="0.8" />
      </linearGradient>

      {/* 테두리 그라디언트 */}
      <linearGradient id="logoStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FF88" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#00FF88" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00FF88" stopOpacity="0.4" />
      </linearGradient>
    </defs>
  </svg>
);

export default JPLogo;
