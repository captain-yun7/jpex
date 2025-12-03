/**
 * 견적서 수정 페이지
 */

'use client';

import { useState, useEffect, use } from 'react';
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

export default function EditQuoteDocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // 폼 데이터
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [docDate, setDocDate] = useState('');
  const [validDays, setValidDays] = useState(30);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('draft');
  const [items, setItems] = useState<QuoteItem[]>([
    { category: '', name: '', description: '', quantity: 1, unit_price: 0, amount: 0 }
  ]);
  const [paymentTerms, setPaymentTerms] = useState<PaymentTerms>({
    deposit_rate: 30,
    mid_rate: 40,
    final_rate: 30,
    description: ''
  });
  const [extraCosts, setExtraCosts] = useState<ExtraCost[]>([]);

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

      const doc = result.data;
      setTitle(doc.title || '');
      setClientName(doc.client_name || '');
      setProjectName(doc.project_name || '');
      setDocNumber(doc.doc_number || '');
      setDocDate(doc.doc_date ? doc.doc_date.split('T')[0] : '');
      setValidDays(doc.valid_days || 30);
      setNotes(doc.notes || '');
      setStatus(doc.status || 'draft');
      setItems(doc.items && doc.items.length > 0 ? doc.items : [{ category: '', name: '', description: '', quantity: 1, unit_price: 0, amount: 0 }]);
      setPaymentTerms(doc.payment_terms || { deposit_rate: 30, mid_rate: 40, final_rate: 30, description: '' });
      setExtraCosts(doc.extra_costs || []);
    } catch (err) {
      console.error('데이터 로딩 오류:', err);
      setError(err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 총 금액 계산
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  // 항목 추가
  const addItem = () => {
    setItems([...items, { category: '', name: '', description: '', quantity: 1, unit_price: 0, amount: 0 }]);
  };

  // 항목 삭제
  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // 항목 수정
  const updateItem = (index: number, field: keyof QuoteItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    if (field === 'quantity' || field === 'unit_price') {
      const quantity = field === 'quantity' ? Number(value) : newItems[index].quantity || 1;
      const unitPrice = field === 'unit_price' ? Number(value) : newItems[index].unit_price || 0;
      newItems[index].amount = quantity * unitPrice;
    }

    setItems(newItems);
  };

  // 별도 비용 추가
  const addExtraCost = () => {
    setExtraCosts([...extraCosts, { name: '', amount: '', note: '' }]);
  };

  // 별도 비용 삭제
  const removeExtraCost = (index: number) => {
    setExtraCosts(extraCosts.filter((_, i) => i !== index));
  };

  // 별도 비용 수정
  const updateExtraCost = (index: number, field: keyof ExtraCost, value: string) => {
    const newCosts = [...extraCosts];
    newCosts[index] = { ...newCosts[index], [field]: value };
    setExtraCosts(newCosts);
  };

  // 결제 조건 금액 계산
  useEffect(() => {
    const total = calculateTotal();
    setPaymentTerms(prev => ({
      ...prev,
      deposit_amount: Math.round(total * (prev.deposit_rate || 0) / 100),
      mid_amount: Math.round(total * (prev.mid_rate || 0) / 100),
      final_amount: Math.round(total * (prev.final_rate || 0) / 100)
    }));
  }, [items, paymentTerms.deposit_rate, paymentTerms.mid_rate, paymentTerms.final_rate]);

  // 제출
  const handleSubmit = async (e: React.FormEvent, newStatus?: string) => {
    e.preventDefault();

    if (!title) {
      setError('견적서 제목을 입력해주세요.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/quote-documents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          client_name: clientName,
          project_name: projectName,
          doc_number: docNumber,
          doc_date: docDate,
          valid_days: validDays,
          total_amount: calculateTotal(),
          items,
          payment_terms: paymentTerms,
          extra_costs: extraCosts,
          notes,
          status: newStatus || status
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      router.push('/admin/quotes');
    } catch (err) {
      console.error('저장 오류:', err);
      setError(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
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

  return (
    <Layout>
      <Section padding="xl">
        <div className="max-w-5xl mx-auto">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
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
              <div>
                <h1 className="text-4xl lg:text-5xl font-black text-white">
                  견적서 <span className="text-green">수정</span>
                </h1>
                <p className="text-lg text-gray-400 mt-2">견적서를 수정합니다.</p>
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

          <form onSubmit={(e) => handleSubmit(e)}>
            {/* 기본 정보 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl p-6 mb-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">기본 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    견적서 제목 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="예: 미쓰비시엘리베이터 기업홈페이지 견적서"
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-green focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">수신처 (고객명)</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="예: 담당자님"
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">프로젝트명</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="예: 기업 홈페이지 리뉴얼"
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">문서번호</label>
                  <input
                    type="text"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                    placeholder="예: JPEX-2024-001"
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">작성일</label>
                  <input
                    type="date"
                    value={docDate}
                    onChange={(e) => setDocDate(e.target.value)}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">유효기간 (일)</label>
                  <input
                    type="number"
                    value={validDays}
                    onChange={(e) => setValidDays(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">상태</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  >
                    <option value="draft">작성중</option>
                    <option value="sent">발송완료</option>
                    <option value="accepted">수락됨</option>
                    <option value="rejected">거절됨</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* 견적 항목 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">견적 항목</h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="px-4 py-2 bg-green/20 text-green border border-green/30 rounded-lg hover:bg-green/30 transition-colors font-medium"
                >
                  + 항목 추가
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="bg-black border-2 border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-green">항목 {index + 1}</span>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">카테고리</label>
                        <input
                          type="text"
                          value={item.category || ''}
                          onChange={(e) => updateItem(index, 'category', e.target.value)}
                          placeholder="기획"
                          className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">항목명</label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateItem(index, 'name', e.target.value)}
                          placeholder="메인페이지 기획"
                          className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">수량</label>
                        <input
                          type="number"
                          value={item.quantity || 1}
                          onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                          className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">단가</label>
                        <input
                          type="number"
                          value={item.unit_price || 0}
                          onChange={(e) => updateItem(index, 'unit_price', e.target.value)}
                          className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">금액</label>
                        <input
                          type="number"
                          value={item.amount || 0}
                          onChange={(e) => updateItem(index, 'amount', Number(e.target.value))}
                          className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block text-xs text-gray-500 mb-1">세부내용</label>
                      <input
                        type="text"
                        value={item.description || ''}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        placeholder="세부 설명"
                        className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* 총 금액 */}
              <div className="mt-6 p-4 bg-green/10 border-2 border-green/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">총 금액</span>
                  <span className="text-2xl font-black text-green">
                    {formatNumber(calculateTotal())}원
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 결제 조건 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl p-6 mb-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">결제 조건</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">계약금 (%)</label>
                  <input
                    type="number"
                    value={paymentTerms.deposit_rate || 0}
                    onChange={(e) => setPaymentTerms({ ...paymentTerms, deposit_rate: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formatNumber(paymentTerms.deposit_amount || 0)}원
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">중도금 (%)</label>
                  <input
                    type="number"
                    value={paymentTerms.mid_rate || 0}
                    onChange={(e) => setPaymentTerms({ ...paymentTerms, mid_rate: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formatNumber(paymentTerms.mid_amount || 0)}원
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">잔금 (%)</label>
                  <input
                    type="number"
                    value={paymentTerms.final_rate || 0}
                    onChange={(e) => setPaymentTerms({ ...paymentTerms, final_rate: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formatNumber(paymentTerms.final_amount || 0)}원
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">결제 조건 설명</label>
                <input
                  type="text"
                  value={paymentTerms.description || ''}
                  onChange={(e) => setPaymentTerms({ ...paymentTerms, description: e.target.value })}
                  placeholder="예: 계약금은 계약 체결 후 3일 이내 입금"
                  className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-green focus:outline-none"
                />
              </div>
            </motion.div>

            {/* 별도 비용 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">별도 비용</h3>
                <button
                  type="button"
                  onClick={addExtraCost}
                  className="px-4 py-2 bg-green/20 text-green border border-green/30 rounded-lg hover:bg-green/30 transition-colors font-medium"
                >
                  + 비용 추가
                </button>
              </div>

              {extraCosts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">별도 비용 항목이 없습니다.</p>
              ) : (
                <div className="space-y-3">
                  {extraCosts.map((cost, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={cost.name}
                          onChange={(e) => updateExtraCost(index, 'name', e.target.value)}
                          placeholder="항목명"
                          className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                      <div className="w-40">
                        <input
                          type="text"
                          value={cost.amount}
                          onChange={(e) => updateExtraCost(index, 'amount', e.target.value)}
                          placeholder="금액/내용"
                          className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={cost.note || ''}
                          onChange={(e) => updateExtraCost(index, 'note', e.target.value)}
                          placeholder="비고"
                          className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeExtraCost(index)}
                        className="text-red-400 hover:text-red-300 px-2 py-2"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* 기타 사항 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl p-6 mb-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">기타 사항</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="추가 안내사항이나 특이사항을 입력하세요."
                rows={5}
                className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-600 focus:border-green focus:outline-none resize-none"
              />
            </motion.div>

            {/* 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              <Link
                href="/admin/quotes"
                className="flex-1 px-6 py-4 bg-gray-800 text-gray-300 font-bold text-center rounded-xl hover:bg-gray-700 transition-colors"
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-2 px-6 py-4 bg-green text-black font-bold rounded-xl hover:bg-green-light transition-colors disabled:opacity-50"
              >
                {saving ? '저장 중...' : '저장'}
              </button>
            </motion.div>
          </form>
        </div>
      </Section>
    </Layout>
  );
}
