/**
 * Quote 페이지
 * JPEX 견적 문의 - 간소화 버전
 */

'use client';

import { useState } from 'react';
import { Layout, Section } from '@/components/layout';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    agreement: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    { id: 'web', name: '웹사이트', icon: '🌐', desc: '반응형 웹사이트' },
    { id: 'mobile', name: '모바일앱', icon: '📱', desc: 'iOS/Android' },
    { id: 'ai', name: 'AI 서비스', icon: '🤖', desc: 'AI 기반 서비스' },
    { id: 'cloud', name: '클라우드 및 인프라 구축', icon: '☁️', desc: '클라우드 아키텍처' },
    { id: 'consulting', name: '컨설팅', icon: '💼', desc: '기술 컨설팅' },
    { id: 'education', name: '교육', icon: '📚', desc: '개발 교육' }
  ];

  const budgetRanges = [
    '100만원 미만',
    '100만원 - 300만원',
    '300만원 - 500만원',
    '500만원 - 1,000만원',
    '1,000만원 이상',
    '협의 필요'
  ];

  const timelines = [
    '1-2주 이내',
    '1개월 이내',
    '2-3개월',
    '3개월 이상',
    '협의 필요'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreement) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType,
          budgetRange: formData.budget,
          timeline: formData.timeline,
          requirements: formData.description
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '견적 요청 접수에 실패했습니다.');
      }

      const result = await response.json();

      // 성공 메시지 표시
      alert('견적 요청이 접수되었습니다!\n24시간 내에 연락드리겠습니다.');

      // 폼 초기화
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: '',
        agreement: false
      });

    } catch (error) {
      console.error('견적 요청 접수 오류:', error);
      alert(error instanceof Error ? error.message : '견적 요청 접수 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.projectType && formData.agreement;

  return (
    <Layout>
      {/* Hero Section */}
      <Section padding="xl" className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
            견적 <span className="text-green">문의</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            간단한 정보만 입력하시면<br />
            24시간 내에 맞춤 견적을 보내드립니다
          </p>
        </motion.div>
      </Section>

      {/* Form Section */}
      <Section background="secondary" padding="xl">
        <div className="max-w-3xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-black-light p-8 lg:p-12 rounded-2xl border-2 border-gray-800 space-y-8"
          >
            {/* 기본 정보 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-green">01</span> 연락처 정보
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    이름 <span className="text-green text-base">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border-2 border-gray-800 text-white placeholder-gray-600 focus:border-green focus:shadow-[0_0_0_3px_rgba(0,255,136,0.1)] outline-none transition-all duration-300"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    이메일 <span className="text-green text-base">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border-2 border-gray-800 text-white placeholder-gray-600 focus:border-green focus:shadow-[0_0_0_3px_rgba(0,255,136,0.1)] outline-none transition-all duration-300"
                    placeholder="hong@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    전화번호
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-black border-2 border-gray-800 text-white placeholder-gray-600 focus:border-green outline-none transition-colors duration-300"
                    placeholder="010-1234-5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    회사명 (선택)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-black border-2 border-gray-800 text-white placeholder-gray-600 focus:border-green outline-none transition-colors duration-300"
                    placeholder="㈜예시회사"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800"></div>

            {/* 프로젝트 정보 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-green">02</span> 프로젝트 정보
              </h2>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-3">
                  프로젝트 유형 <span className="text-green text-base">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {projectTypes.map(type => (
                    <motion.button
                      key={type.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData(prev => ({ ...prev, projectType: type.id }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        formData.projectType === type.id
                          ? 'border-green bg-green/10 shadow-glow-green-sm'
                          : 'border-gray-800 hover:border-green/50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <div className="text-sm font-bold text-white">{type.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{type.desc}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    예산 범위
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-black border-2 border-gray-800 text-white focus:border-green outline-none transition-colors duration-300"
                  >
                    <option value="">선택해주세요</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    희망 일정
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-black border-2 border-gray-800 text-white focus:border-green outline-none transition-colors duration-300"
                  >
                    <option value="">선택해주세요</option>
                    {timelines.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  프로젝트 설명
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-black border-2 border-gray-800 text-white placeholder-gray-600 focus:border-green outline-none transition-colors duration-300 resize-none"
                  placeholder="예시: 온라인 쇼핑몰을 만들고 싶습니다. 결제 기능과 재고 관리가 필요합니다."
                />
              </div>
            </div>

            <div className="border-t border-gray-800"></div>

            {/* 안내사항 */}
            <div className="bg-green/10 border border-green/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green mb-3">📋 진행 프로세스</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5">1.</span>
                  <span>견적 요청서 접수 (즉시)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5">2.</span>
                  <span>담당자 확인 및 연락 (24시간 내)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5">3.</span>
                  <span>온라인/오프라인 미팅 진행 (무료)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-0.5">4.</span>
                  <span>상세 견적서 발송 (2-3일)</span>
                </li>
              </ul>
            </div>

            {/* 동의 */}
            <div className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-800 hover:border-green/30 transition-colors duration-300">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={formData.agreement}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 text-green bg-black border-gray-800 rounded focus:ring-green focus:ring-2 cursor-pointer"
              />
              <label htmlFor="agreement" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
                <span className="text-green font-semibold">*</span> 개인정보 수집 및 이용에 동의합니다.
                수집된 정보는 견적 제공 및 상담 목적으로만 사용되며, 프로젝트 종료 후 즉시 파기됩니다.
              </label>
            </div>

            {/* 비활성화 상태 안내 */}
            {!isFormValid && (
              <div className="text-sm text-center space-y-2 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                <p className="text-gray-400 font-medium">아래 필수 항목을 입력해주세요</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {!formData.name && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/40">
                      • 이름
                    </span>
                  )}
                  {!formData.email && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/40">
                      • 이메일
                    </span>
                  )}
                  {!formData.projectType && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/40">
                      • 프로젝트 유형
                    </span>
                  )}
                  {!formData.agreement && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full border border-red-500/40">
                      • 개인정보 동의
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 제출 버튼 */}
            <motion.button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              whileHover={isFormValid ? { scale: 1.02 } : {}}
              whileTap={isFormValid ? { scale: 0.98 } : {}}
              className="w-full group relative px-8 py-4 text-lg font-bold text-black bg-green rounded-lg overflow-hidden shadow-glow-green-sm hover:shadow-glow-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-glow-green-sm"
            >
              <span className="absolute inset-0 bg-green-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? '제출 중...' : !isFormValid ? '필수 항목을 입력해주세요' : '무료 견적 받기'}
                {!isSubmitting && isFormValid && (
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </span>
            </motion.button>
          </motion.form>
        </div>
      </Section>

      {/* Contact Info */}
      <Section background="secondary" padding="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h3 className="text-xl font-bold text-white">
            급하신가요? 바로 연락주세요
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400">
            <a href="tel:010-2174-5072" className="flex items-center gap-2 hover:text-green transition-colors">
              <span>📞</span>
              <span className="font-semibold">010-2174-5072</span>
            </a>
            <span className="hidden sm:block">|</span>
            <a href="mailto:jslovejs182@gmail.com" className="flex items-center gap-2 hover:text-green transition-colors">
              <span>✉️</span>
              <span className="font-semibold">jslovejs182@gmail.com</span>
            </a>
          </div>
        </motion.div>
      </Section>
    </Layout>
  );
}
