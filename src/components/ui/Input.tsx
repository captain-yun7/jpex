/**
 * Input 컴포넌트
 * 카카오 개발자 스타일 기반의 입력 컴포넌트
 */

import React from 'react';
import { cn } from '@/lib/utils';

// 입력 필드 변형 타입 정의
type InputVariant = 'default' | 'filled' | 'outlined';
type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  inputSize?: InputSize;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
}

/**
 * 입력 필드 변형별 스타일 정의
 */
const inputVariants = {
  default: [
    'bg-background-secondary',
    'border border-secondary',
    'focus:border-accent focus:ring-1 focus:ring-accent/50',
  ],
  filled: [
    'bg-secondary/20',
    'border border-transparent',
    'focus:bg-background-secondary focus:border-accent focus:ring-1 focus:ring-accent/50',
  ],
  outlined: [
    'bg-transparent',
    'border-2 border-secondary',
    'focus:border-accent',
  ],
};

/**
 * 입력 필드 크기별 스타일 정의
 */
const inputSizes = {
  sm: 'px-3 py-1.5 text-sm min-h-[32px]',
  md: 'px-4 py-2 text-base min-h-[40px]',
  lg: 'px-4 py-3 text-lg min-h-[48px]',
};

/**
 * Input 컴포넌트 메인
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      inputSize = 'md',
      error = false,
      errorMessage,
      helperText,
      leftIcon,
      rightIcon,
      label,
      required = false,
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    // 고유 ID 생성 (접근성을 위해)
    const generatedId = React.useId();
    const inputId = id || `input-${generatedId}`;
    const hasError = error || !!errorMessage;

    return (
      <div className={cn('space-y-1', fullWidth && 'w-full', className)}>
        {/* 라벨 */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        {/* 입력 필드 컨테이너 */}
        <div className="relative">
          {/* 왼쪽 아이콘 */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}

          {/* 입력 필드 */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              // 기본 스타일
              'w-full rounded-md font-medium',
              'text-text-primary placeholder:text-text-muted',
              'transition-all duration-normal',
              'focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-60',
              
              // 변형별 스타일
              inputVariants[variant],
              
              // 크기별 스타일
              inputSizes[inputSize],
              
              // 아이콘이 있을 때 패딩 조정
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              
              // 에러 상태
              hasError && [
                'border-error',
                'focus:border-error focus:ring-error/50',
              ],
              
              // 성공 상태 (에러가 없고 값이 있을 때)
              !hasError && props.value && [
                'border-success',
                'focus:border-success focus:ring-success/50',
              ]
            )}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : 
              helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {/* 오른쪽 아이콘 */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>

        {/* 에러 메시지 */}
        {hasError && errorMessage && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-error flex items-center space-x-1"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{errorMessage}</span>
          </p>
        )}

        {/* 도움말 텍스트 */}
        {!hasError && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-text-muted"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea 컴포넌트
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariant;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  resize?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'default',
      error = false,
      errorMessage,
      helperText,
      label,
      required = false,
      fullWidth = true,
      resize = true,
      className,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || `textarea-${generatedId}`;
    const hasError = error || !!errorMessage;

    return (
      <div className={cn('space-y-1', fullWidth && 'w-full', className)}>
        {/* 라벨 */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        {/* 텍스트 영역 */}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={cn(
            // 기본 스타일
            'w-full rounded-md font-medium',
            'text-text-primary placeholder:text-text-muted',
            'transition-all duration-normal',
            'focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-60',
            'px-4 py-3',
            
            // 리사이즈 설정
            resize ? 'resize-y' : 'resize-none',
            
            // 변형별 스타일
            inputVariants[variant],
            
            // 에러 상태
            hasError && [
              'border-error',
              'focus:border-error focus:ring-error/50',
            ],
            
            // 성공 상태
            !hasError && props.value && [
              'border-success',
              'focus:border-success focus:ring-success/50',
            ]
          )}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />

        {/* 에러 메시지 */}
        {hasError && errorMessage && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-error flex items-center space-x-1"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{errorMessage}</span>
          </p>
        )}

        {/* 도움말 텍스트 */}
        {!hasError && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-text-muted"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

/**
 * Select 컴포넌트
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: InputVariant;
  inputSize?: InputSize;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant = 'default',
      inputSize = 'md',
      error = false,
      errorMessage,
      helperText,
      label,
      required = false,
      fullWidth = true,
      placeholder,
      className,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || `select-${generatedId}`;
    const hasError = error || !!errorMessage;

    return (
      <div className={cn('space-y-1', fullWidth && 'w-full', className)}>
        {/* 라벨 */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        {/* 셀렉트 컨테이너 */}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={cn(
              // 기본 스타일
              'w-full rounded-md font-medium',
              'text-text-primary',
              'transition-all duration-normal',
              'focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-60',
              'appearance-none cursor-pointer',
              'pr-10', // 화살표 아이콘 공간
              
              // 변형별 스타일
              inputVariants[variant],
              
              // 크기별 스타일
              inputSizes[inputSize],
              
              // 에러 상태
              hasError && [
                'border-error',
                'focus:border-error focus:ring-error/50',
              ]
            )}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : 
              helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>

          {/* 화살표 아이콘 */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-text-muted">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* 에러 메시지 */}
        {hasError && errorMessage && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-error flex items-center space-x-1"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{errorMessage}</span>
          </p>
        )}

        {/* 도움말 텍스트 */}
        {!hasError && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-text-muted"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

/**
 * FormGroup 컴포넌트 (폼 필드들을 그룹핑)
 */
interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  spacing?: 'tight' | 'normal' | 'loose';
}

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
  orientation = 'vertical',
  spacing = 'normal',
}) => {
  const spacingClasses = {
    tight: orientation === 'vertical' ? 'space-y-2' : 'space-x-2',
    normal: orientation === 'vertical' ? 'space-y-4' : 'space-x-4',
    loose: orientation === 'vertical' ? 'space-y-6' : 'space-x-6',
  };

  return (
    <div
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-end',
        spacingClasses[spacing],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Input;