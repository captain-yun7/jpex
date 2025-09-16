/**
 * 관리자 페이지
 * JPEX 문의사항 및 견적 요청 관리
 */

'use client';

import { useState, useEffect } from 'react';
import { Layout, Section } from '@/components/layout';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type: string;
  message: string;
  status: 'new' | 'in_progress' | 'completed';
  created_at: string;
}

interface Quote {
  id: string;
  name: string;
  email: string;
  company?: string;
  project_type: string;
  project_scope: string;
  budget_range: string;
  timeline: string;
  requirements: string;
  estimated_cost?: number;
  status: 'pending' | 'reviewed' | 'sent' | 'accepted' | 'rejected';
  created_at: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'quotes'>('inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 문의사항 데이터 가져오기
      const inquiriesResponse = await fetch('/api/admin/inquiries');
      const inquiriesResult = await inquiriesResponse.json();
      
      if (!inquiriesResponse.ok) {
        throw new Error(inquiriesResult.error);
      }
      
      // 견적 요청 데이터 가져오기
      const quotesResponse = await fetch('/api/admin/quotes');
      const quotesResult = await quotesResponse.json();
      
      if (!quotesResponse.ok) {
        throw new Error(quotesResult.error);
      }
      
      setInquiries(inquiriesResult.data || []);
      setQuotes(quotesResult.data || []);
      setError('');
    } catch (err) {
      console.error('데이터 로딩 오류:', err);
      setError(err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { text: '신규', color: 'bg-blue-500' },
      pending: { text: '대기', color: 'bg-yellow-500' },
      in_progress: { text: '진행중', color: 'bg-orange-500' },
      reviewed: { text: '검토완료', color: 'bg-purple-500' },
      sent: { text: '발송완료', color: 'bg-indigo-500' },
      completed: { text: '완료', color: 'bg-green-500' },
      accepted: { text: '수락', color: 'bg-green-500' },
      rejected: { text: '거절', color: 'bg-red-500' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { text: status, color: 'bg-gray-500' };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <Layout>
        <Section padding="xl">
          <div className="text-center">
            <p className="text-text-secondary">데이터를 불러오는 중...</p>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section padding="xl">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">관리자 대시보드</h1>
            <p className="text-text-secondary">문의사항과 견적 요청을 관리하세요.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* 탭 네비게이션 */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'inquiries'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                }`}
              >
                문의사항 ({inquiries.length})
              </button>
              <button
                onClick={() => setActiveTab('quotes')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'quotes'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                }`}
              >
                견적 요청 ({quotes.length})
              </button>
            </nav>
          </div>

          {/* 문의사항 테이블 */}
          {activeTab === 'inquiries' && (
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">문의사항 목록</h3>
                {inquiries.length === 0 ? (
                  <p className="text-text-secondary text-center py-8">접수된 문의사항이 없습니다.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            이름/회사
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            연락처
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            프로젝트 유형
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상태
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            접수일
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {inquiries.map((inquiry) => (
                          <tr key={inquiry.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                                {inquiry.company && (
                                  <div className="text-sm text-gray-500">{inquiry.company}</div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{inquiry.email}</div>
                              {inquiry.phone && (
                                <div className="text-sm text-gray-500">{inquiry.phone}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {inquiry.project_type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(inquiry.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(inquiry.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 견적 요청 테이블 */}
          {activeTab === 'quotes' && (
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">견적 요청 목록</h3>
                {quotes.length === 0 ? (
                  <p className="text-text-secondary text-center py-8">접수된 견적 요청이 없습니다.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            이름/회사
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            프로젝트
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            예산/일정
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            예상 견적
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상태
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            접수일
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {quotes.map((quote) => (
                          <tr key={quote.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{quote.name}</div>
                                {quote.company && (
                                  <div className="text-sm text-gray-500">{quote.company}</div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{quote.project_type}</div>
                              <div className="text-sm text-gray-500">{quote.project_scope}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{quote.budget_range}</div>
                              <div className="text-sm text-gray-500">{quote.timeline}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {quote.estimated_cost ? `${quote.estimated_cost.toLocaleString()}만원` : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(quote.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(quote.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Section>
    </Layout>
  );
}