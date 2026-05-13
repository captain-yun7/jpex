/**
 * 견적서 상세 페이지
 * 고객이 요청한 견적서의 상세 정보를 확인할 수 있는 페이지
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Layout, Section } from '@/components/layout';
import Link from 'next/link';

interface RequirementsData {
  features?: string[];
  aiFeatures?: string[];
  technologies?: string[];
  description?: string;
}

interface EstimatedCostBreakdown {
  category: string;
  description?: string;
  cost?: number;
}

interface EstimatedCostData {
  min?: number;
  max?: number;
  timeline?: string;
  breakdown?: EstimatedCostBreakdown[];
}

interface QuoteData {
  id: string;
  name: string;
  email: string;
  company: string;
  project_type: string;
  project_scope: string;
  budget_range: string;
  timeline: string;
  requirements: RequirementsData | string;
  estimated_cost: EstimatedCostData | string;
  complexity_score: number;
  urgency_multiplier: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function QuoteDetail() {
  const params = useParams();
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchQuote(params.id as string);
    }
  }, [params.id]);

  const fetchQuote = async (id: string) => {
    try {
      const response = await fetch(`/api/quote/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('견적서를 찾을 수 없습니다.');
        } else {
          setError('견적서를 불러오는 중 오류가 발생했습니다.');
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      setQuote(data);
      setLoading(false);
    } catch (error) {
      console.error('견적서 조회 오류:', error);
      setError('견적서를 불러오는 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  const getProjectTypeName = (type: string) => {
    const types: Record<string, string> = {
      'landing': '랜딩 페이지',
      'corporate': '기업 홈페이지',
      'ecommerce': '쇼핑몰',
      'webapp': '웹 애플리케이션',
      'mobile': '모바일 앱',
      'ai': 'AI 솔루션'
    };
    return types[type] || type;
  };

  const getProjectScopeName = (scope: string) => {
    const scopes: Record<string, string> = {
      'simple': '간단함',
      'complex': '복잡함',
      'enterprise': '대규모'
    };
    return scopes[scope] || scope;
  };

  const getTimelineName = (timeline: string) => {
    const timelines: Record<string, string> = {
      '1-2weeks': '1-2주',
      '1month': '1개월',
      '2-3months': '2-3개월',
      '3-6months': '3-6개월',
      '6months+': '6개월 이상',
      'flexible': '유연하게'
    };
    return timelines[timeline] || timeline;
  };

  const getBudgetRangeName = (budget: string) => {
    const budgets: Record<string, string> = {
      'under-200': '200만원 미만',
      '200-500': '200-500만원',
      '500-1000': '500-1000만원',
      '1000-2000': '1000-2000만원',
      'over-2000': '2000만원 이상',
      'discuss': '협의'
    };
    return budgets[budget] || budget;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      'pending': { label: '검토 대기', className: 'bg-yellow-100 text-yellow-800' },
      'reviewed': { label: '검토 완료', className: 'bg-blue-100 text-blue-800' },
      'sent': { label: '견적서 발송', className: 'bg-green-100 text-green-800' },
      'accepted': { label: '승인됨', className: 'bg-emerald-100 text-emerald-800' },
      'rejected': { label: '거절됨', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Layout>
        <Section padding="lg">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
              <p className="text-ink-muted">견적서를 불러오는 중...</p>
            </div>
          </div>
        </Section>
      </Layout>
    );
  }

  if (error || !quote) {
    return (
      <Layout>
        <Section padding="lg">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="text-6xl">😔</div>
              <h2 className="text-2xl font-bold text-ink">
                {error || '견적서를 찾을 수 없습니다'}
              </h2>
              <p className="text-ink-muted">
                요청하신 견적서를 찾을 수 없습니다. URL을 확인해주세요.
              </p>
              <Link href="/quote" className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors">
                새 견적 요청하기
              </Link>
            </div>
          </div>
        </Section>
      </Layout>
    );
  }

  const requirements: RequirementsData = typeof quote.requirements === 'string' 
    ? JSON.parse(quote.requirements) 
    : quote.requirements;

  const estimatedCost: EstimatedCostData = typeof quote.estimated_cost === 'string'
    ? JSON.parse(quote.estimated_cost)
    : quote.estimated_cost || {};

  return (
    <Layout>
      {/* 헤더 */}
      <Section padding="lg" background="alt">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-ink mb-2">
                견적서 상세
              </h1>
              <p className="text-ink-muted">
                견적 번호: {quote.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {getStatusBadge(quote.status)}
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
              >
                🖨️ 인쇄
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* 견적서 내용 */}
      <Section padding="lg">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 고객 정보 */}
          <div className="bg-surface-alt p-6 rounded-xl border border-line">
            <h2 className="text-xl font-semibold text-ink mb-4">고객 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-ink-muted text-sm">이름</span>
                <p className="text-ink font-medium">{quote.name}</p>
              </div>
              <div>
                <span className="text-ink-muted text-sm">이메일</span>
                <p className="text-ink font-medium">{quote.email}</p>
              </div>
              {quote.company && (
                <div>
                  <span className="text-ink-muted text-sm">회사명</span>
                  <p className="text-ink font-medium">{quote.company}</p>
                </div>
              )}
              <div>
                <span className="text-ink-muted text-sm">요청일</span>
                <p className="text-ink font-medium">{formatDate(quote.created_at)}</p>
              </div>
            </div>
          </div>

          {/* 프로젝트 정보 */}
          <div className="bg-surface-alt p-6 rounded-xl border border-line">
            <h2 className="text-xl font-semibold text-ink mb-4">프로젝트 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-ink-muted text-sm">프로젝트 유형</span>
                <p className="text-ink font-medium">{getProjectTypeName(quote.project_type)}</p>
              </div>
              <div>
                <span className="text-ink-muted text-sm">프로젝트 규모</span>
                <p className="text-ink font-medium">{getProjectScopeName(quote.project_scope)}</p>
              </div>
              <div>
                <span className="text-ink-muted text-sm">희망 일정</span>
                <p className="text-ink font-medium">{getTimelineName(quote.timeline)}</p>
              </div>
              <div>
                <span className="text-ink-muted text-sm">예산 범위</span>
                <p className="text-ink font-medium">{getBudgetRangeName(quote.budget_range)}</p>
              </div>
              <div>
                <span className="text-ink-muted text-sm">복잡도 점수</span>
                <p className="text-ink font-medium">{quote.complexity_score}점</p>
              </div>
              <div>
                <span className="text-ink-muted text-sm">긴급도 계수</span>
                <p className="text-ink font-medium">x{quote.urgency_multiplier}</p>
              </div>
            </div>
          </div>

          {/* 요구사항 */}
          <div className="bg-surface-alt p-6 rounded-xl border border-line">
            <h2 className="text-xl font-semibold text-ink mb-4">요구사항</h2>
            
            {requirements.features && requirements.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-ink mb-2">선택 기능</h3>
                <div className="flex flex-wrap gap-2">
                  {requirements.features.map((feature: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {requirements.aiFeatures && requirements.aiFeatures.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-ink mb-2">AI 기능</h3>
                <div className="flex flex-wrap gap-2">
                  {requirements.aiFeatures.map((feature: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {requirements.technologies && requirements.technologies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-ink mb-2">선호 기술</h3>
                <div className="flex flex-wrap gap-2">
                  {requirements.technologies.map((tech: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {requirements.description && (
              <div>
                <h3 className="text-lg font-medium text-ink mb-2">프로젝트 설명</h3>
                <p className="text-ink-muted whitespace-pre-wrap">{requirements.description}</p>
              </div>
            )}
          </div>

          {/* 예상 비용 */}
          {estimatedCost.min && estimatedCost.max && (
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 p-6 rounded-xl border border-accent/20">
              <h2 className="text-xl font-semibold text-ink mb-4">예상 비용</h2>
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold text-accent">
                  {estimatedCost.min?.toLocaleString()}만원 - {estimatedCost.max?.toLocaleString()}만원
                </div>
                {estimatedCost.timeline && (
                  <p className="text-ink-muted">예상 개발 기간: {estimatedCost.timeline}</p>
                )}
              </div>
              
              {estimatedCost.breakdown && estimatedCost.breakdown.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h3 className="text-lg font-medium text-ink">비용 상세</h3>
                  {estimatedCost.breakdown.map((item: EstimatedCostBreakdown, index: number) => (
                    <div key={index} className="flex justify-between py-2 border-b border-line/30">
                      <div>
                        <span className="text-ink">{item.category}</span>
                        {item.description && (
                          <span className="text-ink-muted text-sm ml-2">({item.description})</span>
                        )}
                      </div>
                      <span className="font-medium text-accent">{item.cost?.toLocaleString()}만원</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 안내사항 */}
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h3 className="font-semibold text-yellow-900 mb-3">📋 안내사항</h3>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li>• 본 견적서는 예상 견적으로, 정확한 견적은 상담 후 제공됩니다</li>
              <li>• 프로젝트 복잡도에 따라 비용이 달라질 수 있습니다</li>
              <li>• 디자인 비용은 별도로 산정됩니다</li>
              <li>• 유지보수 및 호스팅 비용은 포함되어 있지 않습니다</li>
              <li>• 견적서 유효기간은 생성일로부터 30일입니다</li>
            </ul>
          </div>

          {/* 액션 버튼 */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors text-center font-semibold"
            >
              상담 요청하기
            </Link>
            <Link 
              href="/quote" 
              className="px-8 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors text-center font-semibold"
            >
              새 견적 요청
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
}