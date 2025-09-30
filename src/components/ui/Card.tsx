/**
 * Card 컴포넌트
 * 카카오 개발자 스타일 기반의 카드 컴포넌트
 */

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// 카드 변형 타입 정의
type CardVariant = 'default' | 'outlined' | 'elevated' | 'glass' | 'gradient';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * 카드 변형별 스타일 정의
 */
const cardVariants = {
  default: [
    'bg-background-secondary',
    'border border-secondary',
  ],
  outlined: [
    'bg-transparent',
    'border-2 border-secondary',
  ],
  elevated: [
    'bg-background-secondary',
    'border border-secondary/50',
    'shadow-lg',
  ],
  glass: [
    'bg-background-secondary/80',
    'backdrop-blur-sm',
    'border border-secondary/30',
  ],
  gradient: [
    'bg-gradient-to-br from-background-secondary to-background-secondary/80',
    'border border-secondary/50',
  ],
};

/**
 * 카드 패딩 크기별 스타일 정의
 */
const cardPadding = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

/**
 * Card 컴포넌트 메인
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const isInteractive = clickable || onClick;

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          // 기본 스타일
          'rounded-lg transition-all duration-normal',
          
          // 변형별 스타일
          cardVariants[variant],
          
          // 패딩
          cardPadding[padding],
          
          // 인터랙티브 스타일
          hoverable && [
            'hover:border-accent/50',
            'hover:shadow-card',
            'hover:-translate-y-1',
          ],
          
          // 클릭 가능한 경우
          isInteractive && [
            'cursor-pointer',
            'hover:border-accent/50',
            'active:scale-[0.98]',
            'focus:outline-none focus:ring-2 focus:ring-accent/50',
          ],
          
          // 커스텀 클래스
          className
        )}
        tabIndex={isInteractive ? 0 : undefined}
        role={isInteractive ? 'button' : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader 컴포넌트
 */
interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => {
  return (
    <div className={cn('flex flex-col space-y-1.5', className)}>
      {children}
    </div>
  );
};

/**
 * CardTitle 컴포넌트
 */
interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle: React.FC<CardTitleProps> = ({ 
  className, 
  children, 
  as: Component = 'h3' 
}) => {
  return (
    <Component className={cn(
      'text-xl font-semibold leading-none tracking-tight text-text-primary',
      className
    )}>
      {children}
    </Component>
  );
};

/**
 * CardDescription 컴포넌트
 */
interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ 
  className, 
  children 
}) => {
  return (
    <p className={cn('text-sm text-text-secondary leading-relaxed', className)}>
      {children}
    </p>
  );
};

/**
 * CardContent 컴포넌트
 */
interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className, children }) => {
  return (
    <div className={cn('pt-4', className)}>
      {children}
    </div>
  );
};

/**
 * CardFooter 컴포넌트
 */
interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className, children }) => {
  return (
    <div className={cn(
      'flex items-center pt-4 mt-4 border-t border-secondary/50',
      className
    )}>
      {children}
    </div>
  );
};

/**
 * ProjectCard 컴포넌트 (특화된 카드)
 */
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  clientName?: string;
  rating?: number;
  className?: string;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  clientName,
  rating,
  className,
  onClick,
}) => {
  return (
    <Card
      variant="default"
      hoverable
      clickable
      onClick={onClick}
      className={cn('overflow-hidden', className)}
    >
      {/* 프로젝트 이미지 */}
      {imageUrl && (
        <div className="relative w-full h-48 -mx-4 -mt-4 mb-4">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {/* 기술 스택 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-md"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-2 py-1 text-xs font-medium bg-secondary text-text-muted rounded-md">
              +{technologies.length - 4}
            </span>
          )}
        </div>
      </CardContent>

      {(clientName || rating) && (
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            {clientName && (
              <span className="text-sm text-text-secondary">
                {clientName}
              </span>
            )}
            {rating && (
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < rating ? 'text-warning fill-current' : 'text-secondary'
                    )}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

/**
 * ServiceCard 컴포넌트 (서비스용 특화 카드)
 */
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  price?: string;
  className?: string;
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  features,
  price,
  className,
  onClick,
}) => {
  return (
    <Card
      variant="elevated"
      hoverable
      clickable={!!onClick}
      onClick={onClick}
      className={cn('h-full', className)}
    >
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent/10 rounded-lg text-accent text-2xl">
            {icon}
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            {price && (
              <p className="text-sm font-medium text-accent mt-1">{price}</p>
            )}
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm">
              <svg
                className="w-4 h-4 text-success mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Card;