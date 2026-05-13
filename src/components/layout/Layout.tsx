/**
 * Layout / Section / Container — 라이트 톤
 */

import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div className="min-h-screen bg-surface text-ink flex flex-col">
      {showHeader && <Header />}
      <main id="main-content" className={cn('flex-1', className)}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'surface' | 'alt';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  background = 'surface',
  padding = 'md',
  fullWidth = false,
  id,
}) => {
  const bg = background === 'alt' ? 'bg-surface-alt' : 'bg-surface';
  const pad = {
    none: '',
    sm: 'py-10',
    md: 'py-14 lg:py-20',
    lg: 'py-20 lg:py-28',
    xl: 'py-24 lg:py-32',
  }[padding];

  return (
    <section id={id} className={cn(bg, pad, className)}>
      <div className={cn(!fullWidth && 'container mx-auto')}>{children}</div>
    </section>
  );
};

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'lg',
}) => {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    full: 'max-w-container',
  };
  return (
    <div className={cn('mx-auto px-5 lg:px-8', sizeClasses[size], className)}>
      {children}
    </div>
  );
};

export default Layout;
