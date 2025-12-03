/**
 * 견적서 상세 조회 / 미리보기 페이지
 */

'use client';

import { useState, useEffect, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layout, Section } from '@/components/layout';
import { motion } from 'framer-motion';

interface QuoteItem {
  category?: string;
  name: string;
  description?: string;
  quantity?: number;
  unit_price?: number;
  amount: number;
}

interface PaymentTerms {
  deposit_rate?: number;
  deposit_amount?: number;
  mid_rate?: number;
  mid_amount?: number;
  final_rate?: number;
  final_amount?: number;
  description?: string;
}

interface ExtraCost {
  name: string;
  amount: string;
  note?: string;
}

interface QuoteDocument {
  id: string;
  title: string;
  client_name?: string;
  project_name?: string;
  doc_number?: string;
  doc_date?: string;
  valid_days?: number;
  total_amount?: number;
  items?: QuoteItem[];
  payment_terms?: PaymentTerms;
  extra_costs?: ExtraCost[];
  notes?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function QuoteDocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);
  const [document, setDocument] = useState<QuoteDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_session');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    fetchDocument();
  }, [router, id]);

  const fetchDocument = async () => {
    try {
      const response = await fetch(`/api/admin/quote-documents/${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      setDocument(result.data);
    } catch (err) {
      console.error('데이터 로딩 오류:', err);
      setError(err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { text: string; color: string }> = {
      draft: { text: '작성중', color: 'bg-gray-500' },
      sent: { text: '발송완료', color: 'bg-blue-500' },
      accepted: { text: '수락됨', color: 'bg-green' },
      rejected: { text: '거절됨', color: 'bg-red-500' }
    };

    const config = statusConfig[status] || { text: status, color: 'bg-gray-500' };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold text-black ${config.color}`}>
        {config.text}
      </span>
    );
  };

  // 카테고리별 그룹핑
  const groupItemsByCategory = (items?: QuoteItem[]) => {
    if (!items) return {};
    return items.reduce((acc, item) => {
      const category = item.category || '기타';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, QuoteItem[]>);
  };

  if (loading || !isAuthenticated) {
    return (
      <Layout>
        <Section padding="xl">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto mb-4"></div>
            <p className="text-gray-400">로딩 중...</p>
          </div>
        </Section>
      </Layout>
    );
  }

  if (error || !document) {
    return (
      <Layout>
        <Section padding="xl">
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className="text-red-400 mb-4">{error || '견적서를 찾을 수 없습니다.'}</p>
            <Link
              href="/admin/quotes"
              className="inline-block px-6 py-3 bg-green text-black font-bold rounded-lg hover:bg-green-light transition-colors"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </Section>
      </Layout>
    );
  }

  const groupedItems = groupItemsByCategory(document.items);

  return (
    <Layout>
      <Section padding="xl">
        <div className="max-w-5xl mx-auto">
          {/* 헤더 (인쇄 시 숨김) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 print:hidden"
          >
            <div className="flex items-center gap-4 mb-3">
              <Link
                href="/admin/quotes"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black text-white">{document.title}</h1>
                  {getStatusBadge(document.status)}
                </div>
                <p className="text-gray-400 mt-1">견적서 미리보기</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors font-medium"
                >
                  인쇄 / PDF
                </button>
                <Link
                  href={`/admin/quotes/${id}/edit`}
                  className="px-4 py-2 bg-green/20 text-green border border-green/30 rounded-lg hover:bg-green/30 transition-colors font-medium"
                >
                  수정
                </Link>
              </div>
            </div>
          </motion.div>

          {/* 견적서 본문 (인쇄용) */}
          <div ref={printRef} className="bg-white text-black rounded-xl overflow-hidden print:rounded-none print:shadow-none">
            {/* 견적서 헤더 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
              <div className="text-center">
                <h1 className="text-4xl font-black mb-2">견 적 서</h1>
                <p className="text-blue-200">QUOTATION</p>
              </div>
            </div>

            {/* 기본 정보 */}
            <div className="p-8">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">수신</h3>
                  <p className="text-xl font-bold">{document.client_name || '-'}</p>
                  {document.project_name && (
                    <p className="text-gray-600 mt-2">프로젝트: {document.project_name}</p>
                  )}
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">발신</h3>
                  <p className="text-xl font-bold">JPEX Studio</p>
                  <p className="text-gray-600 mt-2">문서번호: {document.doc_number || '-'}</p>
                  <p className="text-gray-600">작성일: {formatDate(document.doc_date)}</p>
                  <p className="text-gray-600">유효기간: {document.valid_days || 30}일</p>
                </div>
              </div>

              {/* 총 금액 */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-800">총 견적 금액</span>
                  <span className="text-3xl font-black text-blue-600">
                    {formatNumber(document.total_amount)}원
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-right">(VAT 별도)</p>
              </div>

              {/* 견적 항목 */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">견적 내역</h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">카테고리</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">항목</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-bold w-20">수량</th>
                      <th className="border border-gray-300 px-4 py-3 text-right font-bold w-32">단가</th>
                      <th className="border border-gray-300 px-4 py-3 text-right font-bold w-32">금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(groupedItems).map(([category, items]) => (
                      items.map((item, index) => (
                        <tr key={`${category}-${index}`} className="hover:bg-gray-50">
                          {index === 0 && (
                            <td
                              className="border border-gray-300 px-4 py-3 font-medium bg-gray-50"
                              rowSpan={items.length}
                            >
                              {category}
                            </td>
                          )}
                          <td className="border border-gray-300 px-4 py-3">
                            <div>{item.name}</div>
                            {item.description && (
                              <div className="text-sm text-gray-500">{item.description}</div>
                            )}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            {item.quantity || 1}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-right">
                            {formatNumber(item.unit_price)}원
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-right font-medium">
                            {formatNumber(item.amount)}원
                          </td>
                        </tr>
                      ))
                    ))}
                    <tr className="bg-blue-50 font-bold">
                      <td colSpan={4} className="border border-gray-300 px-4 py-3 text-right">
                        합계
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-blue-600">
                        {formatNumber(document.total_amount)}원
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 결제 조건 */}
              {document.payment_terms && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">결제 조건</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {document.payment_terms.deposit_rate !== undefined && document.payment_terms.deposit_rate > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-500 mb-1">계약금 ({document.payment_terms.deposit_rate}%)</p>
                        <p className="text-xl font-bold">{formatNumber(document.payment_terms.deposit_amount)}원</p>
                      </div>
                    )}
                    {document.payment_terms.mid_rate !== undefined && document.payment_terms.mid_rate > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-500 mb-1">중도금 ({document.payment_terms.mid_rate}%)</p>
                        <p className="text-xl font-bold">{formatNumber(document.payment_terms.mid_amount)}원</p>
                      </div>
                    )}
                    {document.payment_terms.final_rate !== undefined && document.payment_terms.final_rate > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-500 mb-1">잔금 ({document.payment_terms.final_rate}%)</p>
                        <p className="text-xl font-bold">{formatNumber(document.payment_terms.final_amount)}원</p>
                      </div>
                    )}
                  </div>
                  {document.payment_terms.description && (
                    <p className="text-gray-600 mt-4">{document.payment_terms.description}</p>
                  )}
                </div>
              )}

              {/* 별도 비용 */}
              {document.extra_costs && document.extra_costs.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">별도 비용</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold">항목</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold w-40">금액/내용</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      {document.extra_costs.map((cost, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">{cost.name}</td>
                          <td className="border border-gray-300 px-4 py-3">{cost.amount}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-500">{cost.note || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 기타 사항 */}
              {document.notes && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">기타 사항</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap text-gray-700">{document.notes}</p>
                  </div>
                </div>
              )}

              {/* 서명란 */}
              <div className="border-t-2 border-gray-300 pt-8 mt-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-500">위 금액으로 견적을 드리오니 검토 부탁드립니다.</p>
                    <p className="text-sm text-gray-500 mt-1">문의사항이 있으시면 연락주시기 바랍니다.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold mb-2">JPEX Studio</p>
                    <p className="text-gray-600">contact@jpex.kr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 인쇄용 스타일 */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </Layout>
  );
}
