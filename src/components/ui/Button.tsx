/**
 * Button 컴포넌트
 * 카카오 개발자 스타일 기반의 버튼 컴포넌트
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// 버튼 변형 타입 정의
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}

/**
 * 버튼 기본 스타일 정의
 */
const buttonVariants = {
  primary: [
    'bg-accent text-white',
    'hover:bg-accent-600 active:bg-accent-700',
    'focus:ring-2 focus:ring-accent/50',
    'disabled:bg-secondary disabled:text-text-muted',
    'shadow-sm hover:shadow-md',
    'transition-all duration-normal',
  ],
  secondary: [
    'bg-background-secondary text-text-primary',
    'border border-secondary',
    'hover:bg-secondary-light hover:border-secondary-light',
    'focus:ring-2 focus:ring-accent/50',
    'disabled:bg-secondary disabled:text-text-muted disabled:border-secondary',
    'transition-all duration-normal',
  ],
  outline: [
    'bg-transparent text-accent',
    'border border-accent',
    'hover:bg-accent hover:text-white',
    'focus:ring-2 focus:ring-accent/50',
    'disabled:border-secondary disabled:text-text-muted',
    'transition-all duration-normal',
  ],
  ghost: [
    'bg-transparent text-text-primary',
    'hover:bg-background-secondary',
    'focus:ring-2 focus:ring-accent/50',
    'disabled:text-text-muted',
    'transition-all duration-normal',
  ],
  link: [
    'bg-transparent text-accent p-0',
    'hover:text-accent-hover hover:underline',
    'focus:ring-2 focus:ring-accent/50',
    'disabled:text-text-muted disabled:no-underline',
    'transition-all duration-normal',
  ],
  danger: [
    'bg-error text-white',
    'hover:bg-error/90 active:bg-error/80',
    'focus:ring-2 focus:ring-error/50',
    'disabled:bg-secondary disabled:text-text-muted',
    'shadow-sm hover:shadow-md',
    'transition-all duration-normal',
  ],
};

/**
 * 버튼 크기별 스타일 정의
 */
const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm font-medium min-h-[32px]',
  md: 'px-4 py-2 text-base font-medium min-h-[40px]',
  lg: 'px-6 py-3 text-lg font-semibold min-h-[48px]',
  xl: 'px-8 py-4 text-xl font-semibold min-h-[56px]',
};

/**
 * 로딩 스피너 컴포넌트
 */
const LoadingSpinner: React.FC<{ size: ButtonSize }> = ({ size }) => {
  const spinnerSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  return (
    <svg
      className={cn('animate-spin', spinnerSizes[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

/**
 * Button 컴포넌트 메인
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    children,
    href,
    onClick,
    ...props
  }, ref) => {
    const baseClasses = cn(
      // 기본 스타일
      'inline-flex items-center justify-center',
      'rounded-md font-medium',
      'focus:outline-none focus:ring-offset-2 focus:ring-offset-background-primary',
      'relative overflow-hidden',
      'transition-all duration-normal',
      'disabled:cursor-not-allowed disabled:opacity-60',
      
      // 변형별 스타일
      buttonVariants[variant],
      
      // 크기별 스타일
      variant !== 'link' && buttonSizes[size],
      
      // 전체 너비
      fullWidth && 'w-full',
      
      // 커스텀 클래스
      className
    );

    const content = (
      <>
        {/* 왼쪽 아이콘 */}
        {leftIcon && !loading && (
          <span className={cn('flex-shrink-0', children && 'mr-2')}>
            {leftIcon}
          </span>
        )}

        {/* 로딩 스피너 */}
        {loading && (
          <span className={cn('flex-shrink-0', children && 'mr-2')}>
            <LoadingSpinner size={size} />
          </span>
        )}

        {/* 버튼 텍스트 */}
        {children && (
          <span className={loading ? 'opacity-70' : undefined}>
            {children}
          </span>
        )}

        {/* 오른쪽 아이콘 */}
        {rightIcon && !loading && (
          <span className={cn('flex-shrink-0', children && 'ml-2')}>
            {rightIcon}
          </span>
        )}

        {/* 호버 효과를 위한 오버레이 */}
        <span
          className={cn(
            'absolute inset-0 rounded-md',
            'bg-gradient-to-r from-transparent via-white/10 to-transparent',
            'translate-x-[-100%] hover:translate-x-[100%]',
            'transition-transform duration-700 ease-in-out',
            variant === 'primary' && 'opacity-30',
            variant === 'danger' && 'opacity-30'
          )}
        />
      </>
    );

    // href가 있으면 Link로 감싸기
    if (href) {
      return (
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      );
    }

    // 일반 버튼
    return (
      <button
        ref={ref}
        className={baseClasses}
        onClick={onClick}
        disabled={loading || props.disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * 버튼 그룹 컴포넌트
 */
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'tight' | 'normal' | 'loose';
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  orientation = 'horizontal',
  spacing = 'normal',
}) => {
  const spacingClasses = {
    tight: orientation === 'horizontal' ? 'space-x-1' : 'space-y-1',
    normal: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    loose: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
  };

  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
        spacingClasses[spacing],
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * 아이콘 버튼 컴포넌트
 */
interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = 'ghost', size = 'md', className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn('aspect-square p-0', className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default Button;