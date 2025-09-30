/**
 * JPEX 프로젝트 유틸리티 함수들
 * 공통적으로 사용되는 헬퍼 함수들을 정의
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ============================================================================
// 클래스 이름 유틸리티
// ============================================================================

/**
 * Tailwind CSS 클래스 이름을 조건부로 병합하는 함수
 * clsx와 tailwind-merge를 조합하여 중복 클래스 제거
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// 문자열 유틸리티
// ============================================================================

/**
 * 문자열을 슬러그 형태로 변환
 * 예: "Hello World!" -> "hello-world"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // 공백을 하이픈으로
    .replace(/[^\w\-가-힣]+/g, '')  // 영문, 숫자, 하이픈, 한글만 허용
    .replace(/\-\-+/g, '-')         // 연속된 하이픈 제거
    .replace(/^-+/, '')             // 시작 하이픈 제거
    .replace(/-+$/, '');            // 끝 하이픈 제거
}

/**
 * 문자열을 제한된 길이로 자르고 말줄임표 추가
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

/**
 * 첫 글자를 대문자로 변환
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * 카멜케이스를 케밥케이스로 변환
 * 예: "backgroundColor" -> "background-color"
 */
export function camelToKebab(text: string): string {
  return text.replace(/([A-Z])/g, '-$1').toLowerCase();
}

// ============================================================================
// 숫자 유틸리티
// ============================================================================

/**
 * 숫자를 한국어 형식으로 포맷팅
 * 예: 1000000 -> "1,000,000"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}

/**
 * 숫자를 축약 형태로 포맷팅
 * 예: 1000 -> "1K", 1000000 -> "1M"
 */
export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * 퍼센티지를 포맷팅
 * 예: 0.15 -> "15%"
 */
export function formatPercentage(num: number, decimals: number = 0): string {
  return `${(num * 100).toFixed(decimals)}%`;
}

/**
 * 통화를 포맷팅 (한국 원화)
 * 예: 1000000 -> "₩1,000,000"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
}

// ============================================================================
// 날짜 유틸리티
// ============================================================================

/**
 * 날짜를 한국 형식으로 포맷팅
 * 예: "2024-03-15" -> "2024년 3월 15일"
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * 상대적 시간 포맷팅
 * 예: "2시간 전", "3일 전"
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  
  const rtf = new Intl.RelativeTimeFormat('ko-KR', { numeric: 'auto' });
  
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  
  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, 'minute');
  } else if (diffInHours < 24) {
    return rtf.format(-diffInHours, 'hour');
  } else if (diffInDays < 7) {
    return rtf.format(-diffInDays, 'day');
  } else if (diffInWeeks < 4) {
    return rtf.format(-diffInWeeks, 'week');
  } else {
    return rtf.format(-diffInMonths, 'month');
  }
}

/**
 * 읽기 시간 계산 (분 단위)
 * 평균 읽기 속도: 분당 200단어
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes); // 최소 1분
}

// ============================================================================
// 배열 유틸리티
// ============================================================================

/**
 * 배열을 무작위로 섞기 (Fisher-Yates 알고리즘)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 배열에서 고유한 값들만 추출
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * 배열을 특정 크기의 청크로 나누기
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// ============================================================================
// 객체 유틸리티
// ============================================================================

/**
 * 객체에서 빈 값들을 제거
 */
export function removeEmpty<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const cleaned: Partial<T> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined && value !== '') {
      cleaned[key as keyof T] = value as T[keyof T];
    }
  }
  
  return cleaned;
}

/**
 * 깊은 객체 복사
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (typeof obj === 'object') {
    const cloned: Record<string, unknown> = {};
    for (const key in obj) {
      cloned[key] = deepClone(obj[key]);
    }
    return cloned as T;
  }
  return obj;
}

// ============================================================================
// URL 및 경로 유틸리티
// ============================================================================

/**
 * URL이 유효한지 검증
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 이메일 주소가 유효한지 검증
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 한국 전화번호 형식인지 검증
 */
export function isValidKoreanPhone(phone: string): boolean {
  const phoneRegex = /^(010|011|016|017|018|019)-?\d{3,4}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * 전화번호를 포맷팅
 * 예: "01012345678" -> "010-1234-5678"
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('010')) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

// ============================================================================
// 이미지 유틸리티
// ============================================================================

/**
 * 이미지 URL에서 파일 확장자 추출
 */
export function getImageExtension(url: string): string {
  const match = url.match(/\.([^.?]+)(\?|$)/);
  return match ? match[1].toLowerCase() : '';
}

/**
 * 이미지가 유효한 형식인지 검증
 */
export function isValidImageFormat(filename: string): boolean {
  const validFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const extension = getImageExtension(filename);
  return validFormats.includes(extension);
}

/**
 * 파일 크기를 읽기 쉬운 형태로 포맷팅
 * 예: 1024 -> "1 KB"
 */
export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  
  return `${size.toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

// ============================================================================
// 색상 유틸리티
// ============================================================================

/**
 * 헥스 색상 코드가 유효한지 검증
 */
export function isValidHexColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
}

/**
 * 색상의 밝기 계산 (0-255)
 */
export function getColorBrightness(hexColor: string): number {
  const color = hexColor.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // 휘도 계산 공식
  return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * 색상이 밝은지 어두운지 판단
 */
export function isLightColor(hexColor: string): boolean {
  return getColorBrightness(hexColor) > 128;
}

// ============================================================================
// 성능 유틸리티
// ============================================================================

/**
 * 디바운스 함수
 * 연속된 호출을 방지하여 성능 최적화
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * 스로틀 함수
 * 일정 시간 간격으로만 함수 실행 허용
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================================================
// 로컬 스토리지 유틸리티
// ============================================================================

/**
 * 안전한 로컬 스토리지 설정
 */
export function setLocalStorage(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn('localStorage 설정 실패:', error);
    return false;
  }
}

/**
 * 안전한 로컬 스토리지 조회
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('localStorage 조회 실패:', error);
    return defaultValue;
  }
}

/**
 * 로컬 스토리지 항목 제거
 */
export function removeLocalStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn('localStorage 제거 실패:', error);
    return false;
  }
}

// ============================================================================
// SEO 유틸리티
// ============================================================================

/**
 * 메타 디스크립션 생성 (160자 이내)
 */
export function generateMetaDescription(content: string): string {
  // HTML 태그 제거
  const plainText = content.replace(/<[^>]*>/g, '');
  // 연속된 공백 제거
  const cleaned = plainText.replace(/\s+/g, ' ').trim();
  // 160자로 제한
  return truncate(cleaned, 160);
}

/**
 * JSON-LD 구조화 데이터 생성
 */
export function generateJsonLd(type: string, data: Record<string, unknown>): string {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
  
  return JSON.stringify(jsonLd);
}