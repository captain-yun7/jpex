/**
 * 계약서 상세 조회 / 미리보기 페이지
 */

'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layout, Section } from '@/components/layout';
import { motion } from 'framer-motion';

interface ScopeOfWork {
  category?: string;
  name: string;
  description?: string;
}

interface PaymentSchedule {
  name: string;
  rate?: number;
  amount: number;
  due_date?: string;
  condition?: string;
}

interface ContractDocument {
  id: string;
  title: string;
  client_name?: string;
  client_address?: string;
  client_contact?: string;
  client_email?: string;
  project_name?: string;
  doc_number?: string;
  contract_date?: string;
  start_date?: string;
  end_date?: string;
  total_amount?: number;
  scope_of_work?: ScopeOfWork[];
  payment_schedule?: PaymentSchedule[];
  special_terms?: string;
  notes?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function ContractDocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [document, setDocument] = useState<ContractDocument | null>(null);
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
      const response = await fetch(`/api/admin/contract-documents/${id}`);
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
      signed: { text: '체결됨', color: 'bg-blue-500' },
      completed: { text: '완료', color: 'bg-green' },
      cancelled: { text: '해지', color: 'bg-red-500' }
    };

    const config = statusConfig[status] || { text: status, color: 'bg-gray-500' };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold text-black ${config.color}`}>
        {config.text}
      </span>
    );
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
            <p className="text-red-400 mb-4">{error || '계약서를 찾을 수 없습니다.'}</p>
            <Link
              href="/admin/contracts"
              className="inline-block px-6 py-3 bg-green text-black font-bold rounded-lg hover:bg-green-light transition-colors"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </Section>
      </Layout>
    );
  }

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
                href="/admin/contracts"
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
                <p className="text-gray-400 mt-1">계약서 미리보기</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors font-medium"
                >
                  인쇄 / PDF
                </button>
                <Link
                  href={`/admin/contracts/${id}/edit`}
                  className="px-4 py-2 bg-green/20 text-green border border-green/30 rounded-lg hover:bg-green/30 transition-colors font-medium"
                >
                  수정
                </Link>
              </div>
            </div>
          </motion.div>

          {/* 계약서 본문 (인쇄용) */}
          <div className="bg-white text-black rounded-xl overflow-hidden print:rounded-none print:shadow-none">
            {/* 계약서 헤더 */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8">
              <div className="text-center">
                <h1 className="text-4xl font-black mb-2">소프트웨어 개발 용역 계약서</h1>
                <p className="text-gray-400">SOFTWARE DEVELOPMENT CONTRACT</p>
              </div>
            </div>

            {/* 계약 당사자 */}
            <div className="p-8">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="border-2 border-gray-300 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">갑 (발주자)</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="py-1 text-gray-600 w-24">상호/성명</td>
                        <td className="py-1 font-medium">{document.client_name || '-'}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-600">주소</td>
                        <td className="py-1">{document.client_address || '-'}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-600">연락처</td>
                        <td className="py-1">{document.client_contact || '-'}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-600">이메일</td>
                        <td className="py-1">{document.client_email || '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">을 (수주자)</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="py-1 text-gray-600 w-24">상호</td>
                        <td className="py-1 font-medium">JPEX Studio</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-600">대표</td>
                        <td className="py-1">-</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-600">연락처</td>
                        <td className="py-1">-</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-600">이메일</td>
                        <td className="py-1">contact@jpex.kr</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 계약 개요 */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">계약 개요</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 bg-gray-100 font-medium w-40">문서번호</td>
                      <td className="border border-gray-300 px-4 py-3">{document.doc_number || '-'}</td>
                      <td className="border border-gray-300 px-4 py-3 bg-gray-100 font-medium w-40">프로젝트명</td>
                      <td className="border border-gray-300 px-4 py-3">{document.project_name || '-'}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 bg-gray-100 font-medium">계약 체결일</td>
                      <td className="border border-gray-300 px-4 py-3">{formatDate(document.contract_date)}</td>
                      <td className="border border-gray-300 px-4 py-3 bg-gray-100 font-medium">총 계약 금액</td>
                      <td className="border border-gray-300 px-4 py-3 font-bold text-blue-600">{formatNumber(document.total_amount)}원</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 bg-gray-100 font-medium">용역 시작일</td>
                      <td className="border border-gray-300 px-4 py-3">{formatDate(document.start_date)}</td>
                      <td className="border border-gray-300 px-4 py-3 bg-gray-100 font-medium">용역 종료일</td>
                      <td className="border border-gray-300 px-4 py-3">{formatDate(document.end_date)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 용역 범위 */}
              {document.scope_of_work && document.scope_of_work.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">용역 범위</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold w-32">카테고리</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold">항목</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold">설명</th>
                      </tr>
                    </thead>
                    <tbody>
                      {document.scope_of_work.map((scope, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-3">{scope.category || '-'}</td>
                          <td className="border border-gray-300 px-4 py-3 font-medium">{scope.name}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-600">{scope.description || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 대금 지급 일정 */}
              {document.payment_schedule && document.payment_schedule.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">대금 지급 일정</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold">구분</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-bold w-24">비율</th>
                        <th className="border border-gray-300 px-4 py-3 text-right font-bold w-36">금액</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold w-36">지급일</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold">조건</th>
                      </tr>
                    </thead>
                    <tbody>
                      {document.payment_schedule.map((payment, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-3 font-medium">{payment.name}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">{payment.rate || 0}%</td>
                          <td className="border border-gray-300 px-4 py-3 text-right font-medium">{formatNumber(payment.amount)}원</td>
                          <td className="border border-gray-300 px-4 py-3">{formatDate(payment.due_date)}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-600">{payment.condition || '-'}</td>
                        </tr>
                      ))}
                      <tr className="bg-blue-50 font-bold">
                        <td className="border border-gray-300 px-4 py-3">합계</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">100%</td>
                        <td className="border border-gray-300 px-4 py-3 text-right text-blue-600">{formatNumber(document.total_amount)}원</td>
                        <td colSpan={2} className="border border-gray-300 px-4 py-3"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* 특약 사항 */}
              {document.special_terms && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">특약 사항</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap text-gray-700">{document.special_terms}</p>
                  </div>
                </div>
              )}

              {/* 기타 사항 */}
              {document.notes && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">기타 사항</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap text-gray-700">{document.notes}</p>
                  </div>
                </div>
              )}

              {/* 서명란 */}
              <div className="border-t-2 border-gray-300 pt-8 mt-8">
                <p className="text-center text-gray-600 mb-8">
                  위 계약 내용에 대하여 갑과 을은 상호 합의하였으며, 이를 증명하기 위하여<br />
                  본 계약서 2부를 작성하여 각자 1부씩 보관한다.
                </p>
                <p className="text-center text-xl font-bold mb-8">{formatDate(document.contract_date)}</p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <p className="text-lg font-bold mb-4">갑 (발주자)</p>
                    <p className="text-gray-600 mb-2">{document.client_name || '________________'}</p>
                    <p className="text-sm text-gray-400">(인)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold mb-4">을 (수주자)</p>
                    <p className="text-gray-600 mb-2">JPEX Studio</p>
                    <p className="text-sm text-gray-400">(인)</p>
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
