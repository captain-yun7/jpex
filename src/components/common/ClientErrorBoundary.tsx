/**
 * ClientErrorBoundary 컴포넌트
 * 클라이언트 사이드에서만 ErrorBoundary를 렌더링하는 래퍼
 */

'use client';

import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface ClientErrorBoundaryProps {
  children: React.ReactNode;
}

export const ClientErrorBoundary: React.FC<ClientErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // 프로덕션에서는 로깅 서비스로 전송
        console.error('Global error:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ClientErrorBoundary;