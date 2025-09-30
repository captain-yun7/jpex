/**
 * JPEX 프로젝트 공통 타입 정의
 * 카카오 개발자 스타일 기반 프리랜싱 웹사이트
 */

// ============================================================================
// 기본 공통 타입
// ============================================================================

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}

// ============================================================================
// 프로젝트 관련 타입
// ============================================================================

export type ProjectCategory = 'web' | 'mobile' | 'ai' | 'consulting';
export type ProjectStatus = 'published' | 'draft' | 'archived';

export interface Project extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  content?: string; // Markdown 형식
  category: ProjectCategory;
  technologies: string[];
  image_url?: string;
  gallery_urls: string[];
  project_url?: string;
  github_url?: string;
  demo_url?: string;
  
  // 성과 지표
  metrics?: {
    revenue_increase?: number;
    user_growth?: number;
    performance_improvement?: number;
    [key: string]: number | undefined;
  };
  
  // 클라이언트 정보
  client_name?: string;
  client_company?: string;
  client_testimonial?: string;
  client_rating?: number; // 1-5
  
  // 프로젝트 메타 정보
  project_duration?: string;
  team_size: number;
  project_budget_range?: string;
  
  // 상태 및 표시 옵션
  is_featured: boolean;
  is_published: boolean;
  view_count: number;
}

// 프로젝트 목록용 간소화된 타입
export interface ProjectListItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  image_url?: string;
  client_name?: string;
  client_rating?: number;
  metrics?: Project['metrics'];
  is_featured: boolean;
  view_count: number;
  created_at: string;
}

// ============================================================================
// 문의 및 견적 관련 타입
// ============================================================================

export type InquiryStatus = 'new' | 'read' | 'in_progress' | 'replied' | 'completed' | 'archived';
export type InquiryPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface Inquiry extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type?: ProjectCategory | 'other';
  subject: string;
  message: string;
  budget_range?: string;
  timeline?: string;
  priority: InquiryPriority;
  status: InquiryStatus;
  admin_notes?: string;
  replied_at?: string;
  source: string; // 'website', 'referral' 등
  user_agent?: string;
  ip_address?: string;
}

export type QuoteStatus = 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'rejected' | 'expired';
export type ProjectScope = 'small' | 'medium' | 'large' | 'enterprise';
export type DesignPreference = 'minimal' | 'modern' | 'corporate' | 'creative';

export interface Quote extends BaseEntity {
  quote_number: string; // QUO-2024-001 형식
  
  // 연락처 정보
  name: string;
  email: string;
  phone?: string;
  company?: string;
  
  // 프로젝트 정보
  project_type: ProjectCategory;
  project_title: string;
  project_description: string;
  project_scope?: ProjectScope;
  
  // 요구사항
  features: string[];
  integrations?: string[];
  design_preference?: DesignPreference;
  
  // 예산 및 일정
  budget_range?: string;
  timeline?: string;
  start_date?: string;
  deadline?: string;
  
  // 첨부 파일
  attachments?: {
    name: string;
    url: string;
    size: number;
    type: string;
  }[];
  
  // 견적 정보
  estimated_cost?: number;
  estimated_hours?: number;
  proposal_sent: boolean;
  proposal_url?: string;
  
  // 상태 관리
  status: QuoteStatus;
  admin_notes?: string;
  source: string;
  conversion_source?: string;
  expires_at: string;
}

// ============================================================================
// 블로그 관련 타입
// ============================================================================

export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt?: string;
  content: string; // Markdown 형식
  category: string;
  tags: string[];
  featured_image?: string;
  seo_title?: string;
  seo_description?: string;
  published: boolean;
  featured: boolean;
  view_count: number;
  read_time: number; // 예상 읽기 시간 (분)
  published_at?: string;
}

// ============================================================================
// 고객 후기 관련 타입
// ============================================================================

export interface Testimonial extends BaseEntity {
  client_name: string;
  client_position?: string;
  company?: string;
  company_logo?: string;
  content: string;
  rating: number; // 1-5
  project_id?: string;
  is_featured: boolean;
  is_approved: boolean;
  source: 'direct' | 'email' | 'form';
}

// ============================================================================
// 사이트 설정 관련 타입
// ============================================================================

export type AvailabilityStatus = 'available' | 'busy' | 'unavailable';

export interface SiteSettings {
  site_title: string;
  site_description: string;
  contact_email: string;
  business_hours: {
    [key: string]: string; // "monday": "09:00-18:00"
  };
  availability_status: AvailabilityStatus;
  current_projects: number;
  max_projects: number;
  response_time: string;
  social_links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
}

// ============================================================================
// 분석 관련 타입
// ============================================================================

export type AnalyticsEventType = 'page_view' | 'form_submit' | 'project_view' | 'download' | 'click';

export interface AnalyticsEvent {
  event_type: AnalyticsEventType;
  page_url?: string;
  event_data?: {
    element_id?: string;
    element_text?: string;
    project_id?: string;
    form_type?: string;
    [key: string]: string | number | undefined;
  };
  user_agent?: string;
  referrer?: string;
  session_id?: string;
  ip_address?: string;
  timestamp: string;
}

// ============================================================================
// UI 컴포넌트 관련 타입
// ============================================================================

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'glass';

export interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

// ============================================================================
// 폼 관련 타입
// ============================================================================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type?: ProjectCategory | 'other';
  subject: string;
  message: string;
  budget_range?: string;
  timeline?: string;
  honeypot?: string; // 스팸 방지
  captcha_token?: string;
}

export interface QuoteFormData {
  // 연락처 정보
  name: string;
  email: string;
  phone?: string;
  company?: string;
  
  // 프로젝트 정보
  project_type: ProjectCategory;
  project_title: string;
  project_description: string;
  project_scope?: ProjectScope;
  
  // 요구사항
  features: string[];
  integrations?: string[];
  design_preference?: DesignPreference;
  
  // 예산 및 일정
  budget_range?: string;
  timeline?: string;
  start_date?: string;
  deadline?: string;
  
  // 추가 정보
  additional_requirements?: string;
  reference_urls?: string[];
  attachment_ids?: string[];
}

// ============================================================================
// 검색 및 필터링 관련 타입
// ============================================================================

export interface ProjectFilters {
  category?: ProjectCategory;
  technologies?: string[];
  featured?: boolean;
  search?: string;
}

export interface BlogFilters {
  category?: string;
  tags?: string[];
  featured?: boolean;
  search?: string;
}

export type SortOrder = 'asc' | 'desc';
export type ProjectSortBy = 'newest' | 'oldest' | 'popular' | 'rating';
export type BlogSortBy = 'newest' | 'oldest' | 'popular';

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: ProjectSortBy | BlogSortBy;
  order?: SortOrder;
}

// ============================================================================
// 에러 관련 타입
// ============================================================================

export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// ============================================================================
// 유틸리티 타입
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// 데이터베이스 생성을 위한 타입 (id, created_at, updated_at 제외)
export type CreateInput<T extends BaseEntity> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
export type UpdateInput<T extends BaseEntity> = Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>;

// 환경 변수 타입
export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  NEXTAUTH_URL?: string;
  NEXTAUTH_SECRET?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
}