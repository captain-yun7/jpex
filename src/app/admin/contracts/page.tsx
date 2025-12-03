/**
 * 계약서 문서 관리 페이지
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layout, Section } from '@/components/layout';
import { motion, AnimatePresence } from 'framer-motion';

interface ContractDocument {
  id: string;
  title: string;
  client_name?: string;
  project_name?: string;
  doc_number?: string;
  contract_date?: string;
  start_date?: string;
  end_date?: string;
  total_amount?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface StaticContract {
  id: string;
  filename: string;
  title: string;
  date: string;
  url: string;
}

export default function ContractDocumentsPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<ContractDocument[]>([]);
  const [staticContracts, setStaticContracts] = useState<StaticContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<ContractDocument | null>(null);
  const [activeTab, setActiveTab] = useState<'db' | 'static'>('static');

  useEffect(() => {
    const token = localStorage.getItem('admin_session');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    fetchDocuments();
    fetchStaticContracts();
  }, [router]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/admin/contract-documents');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      setDocuments(result.data || []);
    } catch (err) {
      console.error('DB 계약서 로딩 오류:', err);
    }
  };

  const fetchStaticContracts = async () => {
    try {
      const response = await fetch('/api/admin/static-contracts');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      setStaticContracts(result.data || []);
    } catch (err) {
      console.error('정적 계약서 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount?: number) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('ko-KR').format(amount) + '원';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { text: string; color: string }> = {
      draft: { text: '작성중', color: 'bg-gray-500' },
      signed: { text: '체결됨', color: 'bg-blue-500' },
      completed: { text: '완료', color: 'bg-green' },
      cancelled: { text: '해지', color: 'bg-red-500' },
      static: { text: 'HTML', color: 'bg-orange-500' }
    };

    const config = statusConfig[status] || { text: status, color: 'bg-gray-500' };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold text-black ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const handleDelete = async () => {
    if (!documentToDelete) return;

    try {
      const response = await fetch(`/api/admin/contract-documents/${documentToDelete.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error);
      }

      setDocuments(documents.filter(d => d.id !== documentToDelete.id));
      setDeleteModalOpen(false);
      setDocumentToDelete(null);
    } catch (err) {
      console.error('삭제 오류:', err);
      setError(err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    router.push('/admin/login');
  };

  const totalCount = documents.length + staticContracts.length;

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
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">
                  계약서 <span className="text-green">관리</span>
                </h1>
                <p className="text-lg text-gray-400">계약서를 생성, 조회, 수정, 삭제하세요.</p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/admin"
                  className="px-4 py-2 bg-green/20 text-green border border-green/30 rounded-lg hover:bg-green/30 transition-colors font-medium"
                >
                  ← 대시보드
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium"
                >
                  로그아웃
                </button>
              </div>
            </div>
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

          {/* 통계 및 새 계약서 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="flex-1 bg-black-light border-2 border-gray-800 rounded-xl p-6 hover:border-green/30 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">총 계약서</p>
                  <p className="text-5xl font-black text-white">{totalCount}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    DB: {documents.length} / HTML: {staticContracts.length}
                  </p>
                </div>
                <div className="w-20 h-20 bg-green/10 rounded-full flex items-center justify-center">
                  <span className="text-5xl">📁</span>
                </div>
              </div>
            </div>
            <Link
              href="/admin/contracts/new"
              className="flex items-center justify-center gap-3 px-8 py-6 bg-green text-black font-bold text-xl rounded-xl hover:bg-green-light transition-colors"
            >
              <span className="text-2xl">+</span>
              새 계약서 작성
            </Link>
          </motion.div>

          {/* 탭 메뉴 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex gap-2 mb-4"
          >
            <button
              onClick={() => setActiveTab('static')}
              className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                activeTab === 'static'
                  ? 'bg-orange-500 text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              HTML 계약서 ({staticContracts.length})
            </button>
            <button
              onClick={() => setActiveTab('db')}
              className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                activeTab === 'db'
                  ? 'bg-green text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              DB 계약서 ({documents.length})
            </button>
          </motion.div>

          {/* 계약서 목록 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black-light border-2 border-gray-800 rounded-xl overflow-hidden"
          >
            <div className="px-6 py-5">
              <h3 className="text-2xl font-bold text-white mb-6">
                {activeTab === 'static' ? 'HTML 계약서 목록' : 'DB 계약서 목록'}
              </h3>

              {/* 정적 HTML 계약서 목록 */}
              {activeTab === 'static' && (
                <>
                  {staticContracts.length === 0 ? (
                    <p className="text-gray-400 text-center py-12">HTML 계약서가 없습니다.</p>
                  ) : (
                    <div className="space-y-4">
                      {staticContracts.map((contract, index) => (
                        <motion.div
                          key={contract.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="bg-black border-2 border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-all"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-lg font-bold text-white">{contract.title}</h4>
                                {getStatusBadge('static')}
                              </div>
                              <p className="text-sm text-gray-500">{contract.filename}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {contract.date && (
                                <span className="text-xs text-gray-500">{formatDate(contract.date)}</span>
                              )}
                              <div className="flex gap-2 mt-2">
                                <a
                                  href={contract.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium"
                                >
                                  보기
                                </a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* DB 계약서 목록 */}
              {activeTab === 'db' && (
                <>
                  {documents.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-400 mb-4">DB에 저장된 계약서가 없습니다.</p>
                      <Link
                        href="/admin/contracts/new"
                        className="inline-block px-6 py-3 bg-green text-black font-bold rounded-lg hover:bg-green-light transition-colors"
                      >
                        첫 계약서 작성하기
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {documents.map((doc, index) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-black border-2 border-gray-800 rounded-xl p-6 hover:border-green/50 transition-all"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h4 className="text-lg font-bold text-white">{doc.title}</h4>
                                {getStatusBadge(doc.status)}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                {doc.client_name && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-500">갑:</span>
                                    <span className="text-gray-300">{doc.client_name}</span>
                                  </div>
                                )}
                                {doc.project_name && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-500">프로젝트:</span>
                                    <span className="text-gray-300">{doc.project_name}</span>
                                  </div>
                                )}
                                {doc.doc_number && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-500">문서번호:</span>
                                    <span className="text-gray-300">{doc.doc_number}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="text-xl font-bold text-green">
                                {formatAmount(doc.total_amount)}
                              </span>
                              <span className="text-xs text-gray-500">{formatDate(doc.created_at)}</span>
                              <div className="flex gap-2 mt-2">
                                <Link
                                  href={`/admin/contracts/${doc.id}`}
                                  className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium"
                                >
                                  보기
                                </Link>
                                <Link
                                  href={`/admin/contracts/${doc.id}/edit`}
                                  className="px-3 py-1 bg-green/20 text-green border border-green/30 rounded-lg hover:bg-green/30 transition-colors text-sm font-medium"
                                >
                                  수정
                                </Link>
                                <button
                                  onClick={() => {
                                    setDocumentToDelete(doc);
                                    setDeleteModalOpen(true);
                                  }}
                                  className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                                >
                                  삭제
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* 삭제 확인 모달 */}
          <AnimatePresence>
            {deleteModalOpen && documentToDelete && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setDeleteModalOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                  <div className="bg-black-light border-2 border-red-500/30 rounded-2xl max-w-md w-full p-6">
                    <h3 className="text-2xl font-black text-white mb-4">
                      계약서 <span className="text-red-400">삭제</span>
                    </h3>
                    <p className="text-gray-400 mb-6">
                      &quot;{documentToDelete.title}&quot; 계약서를 삭제하시겠습니까?
                      <br />
                      <span className="text-red-400 text-sm">이 작업은 되돌릴 수 없습니다.</span>
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setDeleteModalOpen(false)}
                        className="flex-1 px-4 py-3 bg-gray-800 text-gray-300 font-bold rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex-1 px-4 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
                      >
                        삭제
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
