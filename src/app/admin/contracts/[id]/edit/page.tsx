/**
 * 계약서 수정 페이지
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

export default function EditContractDocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // 폼 데이터
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectName, setProjectName] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [contractDate, setContractDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [specialTerms, setSpecialTerms] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('draft');
  const [scopeOfWork, setScopeOfWork] = useState<ScopeOfWork[]>([
    { category: '', name: '', description: '' }
  ]);
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentSchedule[]>([
    { name: '계약금', rate: 30, amount: 0, due_date: '', condition: '' }
  ]);

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

      const doc = result.data;
      setTitle(doc.title || '');
      setClientName(doc.client_name || '');
      setClientAddress(doc.client_address || '');
      setClientContact(doc.client_contact || '');
      setClientEmail(doc.client_email || '');
      setProjectName(doc.project_name || '');
      setDocNumber(doc.doc_number || '');
      setContractDate(doc.contract_date ? doc.contract_date.split('T')[0] : '');
      setStartDate(doc.start_date ? doc.start_date.split('T')[0] : '');
      setEndDate(doc.end_date ? doc.end_date.split('T')[0] : '');
      setTotalAmount(doc.total_amount || 0);
      setSpecialTerms(doc.special_terms || '');
      setNotes(doc.notes || '');
      setStatus(doc.status || 'draft');
      setScopeOfWork(doc.scope_of_work && doc.scope_of_work.length > 0 ? doc.scope_of_work : [{ category: '', name: '', description: '' }]);
      setPaymentSchedule(doc.payment_schedule && doc.payment_schedule.length > 0 ? doc.payment_schedule : [{ name: '계약금', rate: 30, amount: 0, due_date: '', condition: '' }]);
    } catch (err) {
      console.error('데이터 로딩 오류:', err);
      setError(err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 용역 범위 추가/삭제/수정
  const addScope = () => {
    setScopeOfWork([...scopeOfWork, { category: '', name: '', description: '' }]);
  };

  const removeScope = (index: number) => {
    if (scopeOfWork.length > 1) {
      setScopeOfWork(scopeOfWork.filter((_, i) => i !== index));
    }
  };

  const updateScope = (index: number, field: keyof ScopeOfWork, value: string) => {
    const newScope = [...scopeOfWork];
    newScope[index] = { ...newScope[index], [field]: value };
    setScopeOfWork(newScope);
  };

  // 대금 일정 추가/삭제/수정
  const addPayment = () => {
    setPaymentSchedule([...paymentSchedule, { name: '', rate: 0, amount: 0, due_date: '', condition: '' }]);
  };

  const removePayment = (index: number) => {
    if (paymentSchedule.length > 1) {
      setPaymentSchedule(paymentSchedule.filter((_, i) => i !== index));
    }
  };

  const updatePayment = (index: number, field: keyof PaymentSchedule, value: string | number) => {
    const newSchedule = [...paymentSchedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };

    if (field === 'rate') {
      newSchedule[index].amount = Math.round(totalAmount * (Number(value) / 100));
    }

    setPaymentSchedule(newSchedule);
  };

  // 총액 변경 시 대금 일정 금액 재계산
  useEffect(() => {
    setPaymentSchedule(prev => prev.map(p => ({
      ...p,
      amount: Math.round(totalAmount * ((p.rate || 0) / 100))
    })));
  }, [totalAmount]);

  // 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setError('계약서 제목을 입력해주세요.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/contract-documents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          client_name: clientName,
          client_address: clientAddress,
          client_contact: clientContact,
          client_email: clientEmail,
          project_name: projectName,
          doc_number: docNumber,
          contract_date: contractDate || null,
          start_date: startDate || null,
          end_date: endDate || null,
          total_amount: totalAmount,
          scope_of_work: scopeOfWork,
          payment_schedule: paymentSchedule,
          special_terms: specialTerms,
          notes,
          status
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      router.push('/admin/contracts');
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
                href="/admin/contracts"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-4xl lg:text-5xl font-black text-white">
                  계약서 <span className="text-green">수정</span>
                </h1>
                <p className="text-lg text-gray-400 mt-2">계약서를 수정합니다.</p>
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

          <form onSubmit={handleSubmit}>
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
                    계약서 제목 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">문서번호</label>
                  <input
                    type="text"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">프로젝트명</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">계약 체결일</label>
                  <input
                    type="date"
                    value={contractDate}
                    onChange={(e) => setContractDate(e.target.value)}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">총 계약 금액</label>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                  <p className="text-sm text-green mt-1">{formatNumber(totalAmount)}원</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">용역 시작일</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">용역 종료일</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
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
                    <option value="signed">체결됨</option>
                    <option value="completed">완료</option>
                    <option value="cancelled">해지</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* 갑 (발주자) 정보 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl p-6 mb-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">갑 (발주자) 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">상호/성명</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">연락처</label>
                  <input
                    type="text"
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">이메일</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">주소</label>
                  <input
                    type="text"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* 용역 범위 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">용역 범위</h3>
                <button
                  type="button"
                  onClick={addScope}
                  className="px-4 py-2 bg-green/20 text-green border border-green/30 rounded-lg hover:bg-green/30 transition-colors font-medium"
                >
                  + 항목 추가
                </button>
              </div>

              <div className="space-y-4">
                {scopeOfWork.map((scope, index) => (
                  <div key={index} className="bg-black border-2 border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-green">항목 {index + 1}</span>
                      {scopeOfWork.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeScope(index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">카테고리</label>
                        <input
                          type="text"
                          value={scope.category || ''}
                          onChange={(e) => updateScope(index, 'category', e.target.value)}
                          className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">항목명</label>
                        <input
                          type="text"
                          value={scope.name}
                          onChange={(e) => updateScope(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block text-xs text-gray-500 mb-1">세부 설명</label>
                      <input
                        type="text"
                        value={scope.description || ''}
                        onChange={(e) => updateScope(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 대금 지급 일정 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">대금 지급 일정</h3>
                <button
                  type="button"
                  onClick={addPayment}
                  className="px-4 py-2 bg-green/20 text-green border border-green/30 rounded-lg hover:bg-green/30 transition-colors font-medium"
                >
                  + 일정 추가
                </button>
              </div>

              <div className="space-y-4">
                {paymentSchedule.map((payment, index) => (
                  <div key={index} className="bg-black border-2 border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-green">지급 {index + 1}</span>
                      {paymentSchedule.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePayment(index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">명칭</label>
                        <input
                          type="text"
                          value={payment.name}
                          onChange={(e) => updatePayment(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">비율 (%)</label>
                        <input
                          type="number"
                          value={payment.rate || 0}
                          onChange={(e) => updatePayment(index, 'rate', e.target.value)}
                          className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">금액</label>
                        <input
                          type="number"
                          value={payment.amount}
                          onChange={(e) => updatePayment(index, 'amount', Number(e.target.value))}
                          className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">{formatNumber(payment.amount)}원</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">지급일</label>
                        <input
                          type="date"
                          value={payment.due_date || ''}
                          onChange={(e) => updatePayment(index, 'due_date', e.target.value)}
                          className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block text-xs text-gray-500 mb-1">지급 조건</label>
                      <input
                        type="text"
                        value={payment.condition || ''}
                        onChange={(e) => updatePayment(index, 'condition', e.target.value)}
                        className="w-full px-3 py-2 bg-black-light border border-gray-700 rounded text-white text-sm focus:border-green focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 특약 사항 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl p-6 mb-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">특약 사항</h3>
              <textarea
                value={specialTerms}
                onChange={(e) => setSpecialTerms(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none resize-none"
              />
            </motion.div>

            {/* 기타 사항 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-black-light border-2 border-gray-800 rounded-xl p-6 mb-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">기타 사항</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-black border-2 border-gray-800 rounded-lg text-white focus:border-green focus:outline-none resize-none"
              />
            </motion.div>

            {/* 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <Link
                href="/admin/contracts"
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
