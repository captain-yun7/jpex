/**
 * 관리자 페이지
 * JPEX 문의사항 및 견적 요청 관리
 */

'use client';

import { useState, useEffect } from 'react';
import { Layout, Section } from '@/components/layout';
import { motion, AnimatePresence } from 'framer-motion';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type: string;
  message: string;
  status: string;
  created_at: string;
}

interface Quote {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type: string;
  budget_range?: string;
  timeline?: string;
  requirements?: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'quotes'>('quotes');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState<Quote | Inquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      completed: { text: '완료', color: 'bg-green' },
      accepted: { text: '수락', color: 'bg-green' },
      rejected: { text: '거절', color: 'bg-red-500' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { text: status, color: 'bg-gray-500' };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold text-black ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const handleViewDetails = (item: Quote | Inquiry) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const getProjectTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      web: '웹사이트',
      mobile: '모바일앱',
      ai: 'AI 서비스',
      cloud: '클라우드 및 인프라',
      consulting: '컨설팅',
      education: '교육'
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <Layout>
        <Section padding="xl">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto mb-4"></div>
            <p className="text-gray-400">데이터를 불러오는 중...</p>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section padding="xl">
        <div className="max-w-7xl mx-auto">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">
              관리자 <span className="text-green">대시보드</span>
            </h1>
            <p className="text-lg text-gray-400">문의사항과 견적 요청을 관리하세요.</p>
          </motion.div>

          {/* 에러 메시지 */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-4 mb-6"
            >
              <p className="text-red-400 font-medium">{error}</p>
            </motion.div>
          )}

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl p-6 hover:border-green/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">견적 요청</p>
                  <p className="text-4xl font-black text-white">{quotes.length}</p>
                </div>
                <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">💰</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl p-6 hover:border-green/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">문의사항</p>
                  <p className="text-4xl font-black text-white">{inquiries.length}</p>
                </div>
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">💬</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 탭 네비게이션 */}
          <div className="border-b-2 border-gray-800 mb-8">
            <nav className="-mb-0.5 flex space-x-8">
              <button
                onClick={() => setActiveTab('quotes')}
                className={`py-3 px-1 border-b-2 font-bold text-base transition-colors ${
                  activeTab === 'quotes'
                    ? 'border-green text-green'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                견적 요청 ({quotes.length})
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`py-3 px-1 border-b-2 font-bold text-base transition-colors ${
                  activeTab === 'inquiries'
                    ? 'border-green text-green'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                문의사항 ({inquiries.length})
              </button>
            </nav>
          </div>

          {/* 견적 요청 테이블 */}
          {activeTab === 'quotes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl overflow-hidden"
            >
              <div className="px-6 py-5">
                <h3 className="text-2xl font-bold text-white mb-6">견적 요청 목록</h3>
                {quotes.length === 0 ? (
                  <p className="text-gray-400 text-center py-12">접수된 견적 요청이 없습니다.</p>
                ) : (
                  <div className="space-y-4">
                    {quotes.map((quote, index) => (
                      <motion.div
                        key={quote.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-black border-2 border-gray-800 rounded-xl p-6 hover:border-green/50 transition-all cursor-pointer"
                        onClick={() => handleViewDetails(quote)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-lg font-bold text-white">{quote.name}</h4>
                              {getStatusBadge(quote.status)}
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">📧</span>
                                <span className="text-gray-300">{quote.email}</span>
                              </div>
                              {quote.phone && (
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-gray-500">📞</span>
                                  <span className="text-gray-300">{quote.phone}</span>
                                </div>
                              )}
                              {quote.company && (
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-gray-500">🏢</span>
                                  <span className="text-gray-300">{quote.company}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="px-3 py-1 bg-green/10 text-green text-sm font-semibold rounded-full border border-green/30">
                              {getProjectTypeLabel(quote.project_type)}
                            </span>
                            {quote.budget_range && (
                              <span className="text-sm text-gray-400">{quote.budget_range}</span>
                            )}
                            {quote.timeline && (
                              <span className="text-sm text-gray-400">{quote.timeline}</span>
                            )}
                            <span className="text-xs text-gray-500">{formatDate(quote.created_at)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 문의사항 테이블 */}
          {activeTab === 'inquiries' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl overflow-hidden"
            >
              <div className="px-6 py-5">
                <h3 className="text-2xl font-bold text-white mb-6">문의사항 목록</h3>
                {inquiries.length === 0 ? (
                  <p className="text-gray-400 text-center py-12">접수된 문의사항이 없습니다.</p>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inquiry, index) => (
                      <motion.div
                        key={inquiry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-black border-2 border-gray-800 rounded-xl p-6 hover:border-green/50 transition-all cursor-pointer"
                        onClick={() => handleViewDetails(inquiry)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-lg font-bold text-white">{inquiry.name}</h4>
                              {getStatusBadge(inquiry.status)}
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">📧</span>
                                <span className="text-gray-300">{inquiry.email}</span>
                              </div>
                              {inquiry.phone && (
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-gray-500">📞</span>
                                  <span className="text-gray-300">{inquiry.phone}</span>
                                </div>
                              )}
                              {inquiry.company && (
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-gray-500">🏢</span>
                                  <span className="text-gray-300">{inquiry.company}</span>
                                </div>
                              )}
                              <p className="text-sm text-gray-400 mt-2 line-clamp-2">{inquiry.message}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm font-semibold rounded-full border border-blue-500/30">
                              {getProjectTypeLabel(inquiry.project_type)}
                            </span>
                            <span className="text-xs text-gray-500">{formatDate(inquiry.created_at)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 상세보기 모달 */}
          <AnimatePresence>
            {isModalOpen && selectedItem && (
              <>
                {/* 배경 오버레이 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeModal}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                />

                {/* 모달 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                  <div className="bg-black-light border-2 border-green/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {/* 모달 헤더 */}
                    <div className="sticky top-0 bg-black-light border-b-2 border-gray-800 px-6 py-4 flex items-center justify-between">
                      <h3 className="text-2xl font-black text-white">
                        {'budget_range' in selectedItem ? '견적 요청' : '문의사항'} <span className="text-green">상세</span>
                      </h3>
                      <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* 모달 바디 */}
                    <div className="px-6 py-6 space-y-6">
                      {/* 기본 정보 */}
                      <div>
                        <h4 className="text-sm font-bold text-green mb-3">기본 정보</h4>
                        <div className="space-y-3 bg-black border border-gray-800 rounded-lg p-4">
                          <div>
                            <label className="text-xs text-gray-500">이름</label>
                            <p className="text-white font-medium">{selectedItem.name}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">이메일</label>
                            <p className="text-white font-medium">{selectedItem.email}</p>
                          </div>
                          {selectedItem.phone && (
                            <div>
                              <label className="text-xs text-gray-500">전화번호</label>
                              <p className="text-white font-medium">{selectedItem.phone}</p>
                            </div>
                          )}
                          {selectedItem.company && (
                            <div>
                              <label className="text-xs text-gray-500">회사명</label>
                              <p className="text-white font-medium">{selectedItem.company}</p>
                            </div>
                          )}
                          <div>
                            <label className="text-xs text-gray-500">프로젝트 유형</label>
                            <p className="text-white font-medium">{getProjectTypeLabel(selectedItem.project_type)}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">상태</label>
                            <div className="mt-1">{getStatusBadge(selectedItem.status)}</div>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">접수일</label>
                            <p className="text-white font-medium">{formatDate(selectedItem.created_at)}</p>
                          </div>
                        </div>
                      </div>

                      {/* 견적 요청 추가 정보 */}
                      {'budget_range' in selectedItem && (
                        <>
                          {selectedItem.budget_range && (
                            <div>
                              <h4 className="text-sm font-bold text-green mb-3">예산 정보</h4>
                              <div className="bg-black border border-gray-800 rounded-lg p-4">
                                <p className="text-white font-medium">{selectedItem.budget_range}</p>
                              </div>
                            </div>
                          )}
                          {selectedItem.timeline && (
                            <div>
                              <h4 className="text-sm font-bold text-green mb-3">희망 일정</h4>
                              <div className="bg-black border border-gray-800 rounded-lg p-4">
                                <p className="text-white font-medium">{selectedItem.timeline}</p>
                              </div>
                            </div>
                          )}
                          {selectedItem.requirements && (
                            <div>
                              <h4 className="text-sm font-bold text-green mb-3">프로젝트 설명</h4>
                              <div className="bg-black border border-gray-800 rounded-lg p-4">
                                <p className="text-white whitespace-pre-wrap">{selectedItem.requirements}</p>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* 문의사항 메시지 */}
                      {'message' in selectedItem && (
                        <div>
                          <h4 className="text-sm font-bold text-green mb-3">문의 내용</h4>
                          <div className="bg-black border border-gray-800 rounded-lg p-4">
                            <p className="text-white whitespace-pre-wrap">{selectedItem.message}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 모달 푸터 */}
                    <div className="sticky bottom-0 bg-black-light border-t-2 border-gray-800 px-6 py-4">
                      <button
                        onClick={closeModal}
                        className="w-full px-6 py-3 bg-green text-black font-bold rounded-lg hover:bg-green-light transition-colors"
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </Section>
    </Layout>
  );
}
