/**
 * Service Icons - 커스텀 SVG 아이콘 컴포넌트
 * 그린 테마로 통일된 전문적인 디자인
 */

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * 웹 개발 아이콘 - 글로브 & 코드
 */
export const WebDevIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* 외부 원 */}
    <circle
      cx="32"
      cy="32"
      r="30"
      stroke="url(#webGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="4 4"
      className="animate-spin-slow"
    />

    {/* 글로브 세로선 */}
    <ellipse
      cx="32"
      cy="32"
      rx="12"
      ry="28"
      stroke="url(#webGradient)"
      strokeWidth="2.5"
      fill="none"
    />

    {/* 글로브 가로선 */}
    <ellipse
      cx="32"
      cy="32"
      rx="28"
      ry="12"
      stroke="url(#webGradient)"
      strokeWidth="2.5"
      fill="none"
    />

    {/* 중앙 코드 브라켓 */}
    <path
      d="M 20 26 L 16 32 L 20 38"
      stroke="#00FF88"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]"
    />
    <path
      d="M 44 26 L 48 32 L 44 38"
      stroke="#00FF88"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]"
    />

    {/* 중앙 점 */}
    <circle cx="32" cy="32" r="3" fill="#00FF88" className="animate-pulse" />

    <defs>
      <linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FF88" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#00FF88" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00FF88" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * AI 솔루션 아이콘 - 뇌 & 회로
 */
export const AIIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* 외부 육각형 */}
    <path
      d="M 32 4 L 54 16 L 54 40 L 32 52 L 10 40 L 10 16 Z"
      stroke="url(#aiGradient)"
      strokeWidth="2"
      fill="none"
      strokeDasharray="6 6"
      className="animate-spin-slow"
    />

    {/* AI 뇌 형태 */}
    <path
      d="M 20 28 Q 20 20 26 18 Q 32 16 38 18 Q 44 20 44 28 Q 44 34 40 38 Q 36 42 32 42 Q 28 42 24 38 Q 20 34 20 28 Z"
      stroke="#00FF88"
      strokeWidth="2.5"
      fill="rgba(0, 255, 136, 0.1)"
    />

    {/* 신경망 연결선 */}
    <path
      d="M 26 24 L 32 28 L 38 24"
      stroke="#00FF88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]"
    />
    <path
      d="M 26 32 L 32 36 L 38 32"
      stroke="#00FF88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]"
    />

    {/* 노드들 */}
    <circle cx="26" cy="24" r="2.5" fill="#00FF88" className="animate-pulse" />
    <circle cx="32" cy="28" r="2.5" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
    <circle cx="38" cy="24" r="2.5" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
    <circle cx="26" cy="32" r="2.5" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
    <circle cx="32" cy="36" r="2.5" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
    <circle cx="38" cy="32" r="2.5" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '1s' }} />

    <defs>
      <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FF88" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#00FF88" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00FF88" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * 클라우드 인프라 아이콘 - 클라우드 & 서버
 */
export const CloudIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* 외부 원형 대시 */}
    <circle
      cx="32"
      cy="32"
      r="30"
      stroke="url(#cloudGradient)"
      strokeWidth="2"
      strokeDasharray="8 8"
      fill="none"
      className="animate-spin-slow"
    />

    {/* 클라우드 형태 */}
    <path
      d="M 16 32 Q 16 26 20 24 Q 22 20 28 20 Q 32 18 36 20 Q 42 20 44 24 Q 48 26 48 32 Q 48 36 44 38 L 20 38 Q 16 36 16 32 Z"
      stroke="#00FF88"
      strokeWidth="2.5"
      fill="rgba(0, 255, 136, 0.1)"
      className="drop-shadow-[0_0_12px_rgba(0,255,136,0.4)]"
    />

    {/* 서버 랙 라인들 */}
    <line x1="24" y1="28" x2="40" y2="28" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="32" x2="40" y2="32" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="36" x2="40" y2="36" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" />

    {/* 연결 노드들 */}
    <circle cx="20" cy="28" r="2" fill="#00FF88" className="animate-pulse" />
    <circle cx="44" cy="28" r="2" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
    <circle cx="20" cy="36" r="2" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
    <circle cx="44" cy="36" r="2" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.9s' }} />

    {/* 업로드/다운로드 화살표 */}
    <path
      d="M 28 44 L 28 48 M 26 46 L 28 48 L 30 46"
      stroke="#00FF88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-bounce"
    />
    <path
      d="M 36 16 L 36 12 M 34 14 L 36 12 L 38 14"
      stroke="#00FF88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-bounce"
      style={{ animationDelay: '0.5s' }}
    />

    <defs>
      <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FF88" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#00FF88" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00FF88" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * 앱 개발 아이콘 - 모바일 디바이스
 */
export const AppDevIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* 외부 사각형 회전 */}
    <rect
      x="6"
      y="6"
      width="52"
      height="52"
      stroke="url(#appGradient)"
      strokeWidth="2"
      rx="8"
      fill="none"
      strokeDasharray="6 6"
      className="animate-spin-slow"
      style={{ transformOrigin: 'center' }}
    />

    {/* 스마트폰 아웃라인 */}
    <rect
      x="20"
      y="12"
      width="24"
      height="40"
      rx="3"
      stroke="#00FF88"
      strokeWidth="2.5"
      fill="rgba(0, 255, 136, 0.1)"
      className="drop-shadow-[0_0_12px_rgba(0,255,136,0.4)]"
    />

    {/* 상단 스피커 */}
    <line x1="28" y1="16" x2="36" y2="16" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" />

    {/* 화면 영역 */}
    <rect
      x="22"
      y="20"
      width="20"
      height="26"
      rx="2"
      stroke="#00FF88"
      strokeWidth="1.5"
      fill="none"
    />

    {/* 화면 내부 UI 요소 */}
    <line x1="24" y1="24" x2="32" y2="24" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="24" y1="28" x2="38" y2="28" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="24" y1="32" x2="34" y2="32" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />

    {/* 앱 아이콘들 */}
    <rect x="24" y="36" width="4" height="4" rx="1" fill="#00FF88" className="animate-pulse" />
    <rect x="30" y="36" width="4" height="4" rx="1" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
    <rect x="36" y="36" width="4" height="4" rx="1" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
    <rect x="24" y="41" width="4" height="4" rx="1" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
    <rect x="30" y="41" width="4" height="4" rx="1" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.8s' }} />

    {/* 하단 홈 버튼 */}
    <circle cx="32" cy="49" r="2" fill="#00FF88" className="animate-pulse" />

    <defs>
      <linearGradient id="appGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FF88" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#00FF88" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00FF88" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * 빠른 속도 아이콘 - 번개
 */
export const SpeedIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M 24 4 L 16 24 L 26 24 L 20 44 L 34 20 L 24 20 Z"
      fill="url(#speedGradient)"
      stroke="#00FF88"
      strokeWidth="2"
      strokeLinejoin="round"
      className="drop-shadow-[0_0_12px_rgba(0,255,136,0.6)]"
    />
    <defs>
      <linearGradient id="speedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00FF88" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00FF88" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * 타겟 아이콘 - 비즈니스 중심
 */
export const TargetIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="24" cy="24" r="20" stroke="#00FF88" strokeWidth="2" strokeOpacity="0.3" />
    <circle cx="24" cy="24" r="14" stroke="#00FF88" strokeWidth="2" strokeOpacity="0.5" />
    <circle cx="24" cy="24" r="8" stroke="#00FF88" strokeWidth="2" strokeOpacity="0.7" />
    <circle
      cx="24"
      cy="24"
      r="4"
      fill="#00FF88"
      className="drop-shadow-[0_0_12px_rgba(0,255,136,0.8)] animate-pulse"
    />
  </svg>
);

/**
 * 검증 아이콘 - 체크마크 & 배지
 */
export const VerifiedIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M 24 4 L 28 8 L 34 6 L 36 12 L 42 14 L 40 20 L 44 24 L 40 28 L 42 34 L 36 36 L 34 42 L 28 40 L 24 44 L 20 40 L 14 42 L 12 36 L 6 34 L 8 28 L 4 24 L 8 20 L 6 14 L 12 12 L 14 6 L 20 8 Z"
      fill="rgba(0, 255, 136, 0.2)"
      stroke="#00FF88"
      strokeWidth="2"
      className="drop-shadow-[0_0_12px_rgba(0,255,136,0.4)]"
    />
    <path
      d="M 16 24 L 22 30 L 34 18"
      stroke="#00FF88"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]"
    />
  </svg>
);

/**
 * 파트너십 아이콘 - 핸드셰이크
 */
export const PartnershipIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M 12 24 L 16 20 L 20 24 L 24 20 L 28 24 L 32 20 L 36 24"
      stroke="#00FF88"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      className="drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]"
    />
    <circle cx="16" cy="20" r="3" fill="#00FF88" className="animate-pulse" />
    <circle cx="24" cy="20" r="3" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
    <circle cx="32" cy="20" r="3" fill="#00FF88" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
    <path
      d="M 10 28 Q 24 32 38 28"
      stroke="#00FF88"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
    />
  </svg>
);

/**
 * 교육 아이콘 - 졸업모자와 책
 */
export const EducationIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* 책 */}
    <rect
      x="12"
      y="28"
      width="20"
      height="24"
      rx="2"
      stroke="#00FF88"
      strokeWidth="2.5"
      fill="rgba(0, 255, 136, 0.1)"
      className="drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]"
    />
    <line x1="22" y1="28" x2="22" y2="52" stroke="#00FF88" strokeWidth="2" opacity="0.5" />
    <line x1="16" y1="34" x2="28" y2="34" stroke="#00FF88" strokeWidth="1.5" opacity="0.7" />
    <line x1="16" y1="38" x2="28" y2="38" stroke="#00FF88" strokeWidth="1.5" opacity="0.7" />
    <line x1="16" y1="42" x2="28" y2="42" stroke="#00FF88" strokeWidth="1.5" opacity="0.7" />

    {/* 졸업모자 */}
    <path
      d="M 32 18 L 52 24 L 32 30 L 12 24 L 32 18 Z"
      stroke="#00FF88"
      strokeWidth="2.5"
      fill="rgba(0, 255, 136, 0.2)"
      strokeLinejoin="round"
      className="drop-shadow-[0_0_10px_rgba(0,255,136,0.8)]"
    />
    <rect
      x="31"
      y="24"
      width="2"
      height="16"
      fill="#00FF88"
      opacity="0.8"
    />
    <circle
      cx="32"
      cy="42"
      r="2.5"
      fill="#00FF88"
      className="animate-pulse"
    />

    {/* 장식 라인 */}
    <path
      d="M 48 26 L 48 36 Q 48 38 46 38 L 38 38"
      stroke="#00FF88"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
    />
  </svg>
);

export default {
  WebDevIcon,
  AIIcon,
  CloudIcon,
  AppDevIcon,
  SpeedIcon,
  TargetIcon,
  VerifiedIcon,
  PartnershipIcon,
  EducationIcon,
};
