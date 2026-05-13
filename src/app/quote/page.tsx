/**
 * Quote 페이지 — 견적 문의 (라이트 톤)
 */

'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout';
import { cn } from '@/lib/utils';

const projectTypes = [
  { id: 'web', name: '웹사이트', desc: '반응형 웹사이트' },
  { id: 'mobile', name: '모바일앱', desc: 'iOS / Android' },
  { id: 'ai', name: 'AI 서비스', desc: 'AI 기반 서비스' },
  { id: 'cloud', name: '클라우드/인프라', desc: '클라우드 아키텍처' },
  { id: 'consulting', name: '컨설팅', desc: '기술 컨설팅' },
  { id: 'education', name: '교육', desc: '개발 교육' },
];

const budgetRanges = [
  '100만원 미만',
  '100만원 - 300만원',
  '300만원 - 500만원',
  '500만원 - 1,000만원',
  '1,000만원 이상',
  '협의 필요',
];

const timelines = ['1-2주 이내', '1개월 이내', '2-3개월', '3개월 이상', '협의 필요'];

const inputClass =
  'w-full px-3.5 py-2.5 text-[15.5px] text-ink bg-surface border border-line rounded-md placeholder:text-ink-subtle focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all';

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
    agreement: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType,
          budgetRange: formData.budget,
          timeline: formData.timeline,
          requirements: formData.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '견적 요청 접수에 실패했습니다.');
      }

      await response.json();
      alert('견적 요청이 접수되었습니다!\n24시간 내에 연락드리겠습니다.');

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: '',
        agreement: false,
      });
    } catch (error) {
      console.error('견적 요청 접수 오류:', error);
      alert(error instanceof Error ? error.message : '견적 요청 접수 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name && formData.email && formData.projectType && formData.agreement;

  return (
    <Layout>
      {/* 인트로 */}
      <section className="container mx-auto pt-20 lg:pt-32 pb-16 lg:pb-20">
        <div className="inline-flex items-center gap-2 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <p className="font-display text-[12.5px] font-semibold tracking-[0.25em] text-ink uppercase">
            Get a Quote
          </p>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-[52px] font-semibold text-ink leading-[1.2] tracking-tight max-w-4xl">
          <span className="text-accent-underline">견적 문의</span>를
          남겨주세요.
        </h1>
        <p className="text-[16px] text-ink-muted mt-8 max-w-2xl leading-relaxed">
          간단한 정보만 입력하시면 24시간 내에 맞춤 견적을 보내드립니다.
        </p>
      </section>

      {/* 폼 */}
      <section className="border-t border-line bg-surface-alt">
        <div className="container mx-auto py-20 lg:py-24">
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-surface border border-line rounded-lg p-8 md:p-12 lg:p-14 space-y-14"
          >
            {/* 01. 연락처 */}
            <fieldset className="space-y-7">
              <legend className="flex items-baseline gap-2 mb-4">
                <span className="text-[13px] font-semibold tracking-[0.2em] text-accent uppercase">
                  01
                </span>
                <span className="text-[17px] font-semibold text-ink">연락처 정보</span>
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13.5px] font-medium text-ink-muted mb-2">
                    이름 <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-[13.5px] font-medium text-ink-muted mb-1.5">
                    이메일 <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    placeholder="hong@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[13.5px] font-medium text-ink-muted mb-1.5">
                    전화번호
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-[13.5px] font-medium text-ink-muted mb-1.5">
                    회사명 (선택)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="㈜예시회사"
                  />
                </div>
              </div>
            </fieldset>

            <hr className="border-line" />

            {/* 02. 프로젝트 정보 */}
            <fieldset className="space-y-7">
              <legend className="flex items-baseline gap-2 mb-4">
                <span className="text-[13px] font-semibold tracking-[0.2em] text-accent uppercase">
                  02
                </span>
                <span className="text-[17px] font-semibold text-ink">프로젝트 정보</span>
              </legend>

              <div>
                <label className="block text-[13.5px] font-medium text-ink-muted mb-2.5">
                  프로젝트 유형 <span className="text-accent">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                  {projectTypes.map((type) => {
                    const selected = formData.projectType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, projectType: type.id }))
                        }
                        className={cn(
                          'text-left p-3.5 rounded-md border transition-all',
                          selected
                            ? 'border-accent bg-accent-light text-accent'
                            : 'border-line bg-surface text-ink hover:border-ink-subtle'
                        )}
                      >
                        <div className="text-[15.5px] font-medium">{type.name}</div>
                        <div className="text-[12.5px] text-ink-muted mt-0.5">
                          {type.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13.5px] font-medium text-ink-muted mb-1.5">
                    예산 범위
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="">선택해주세요</option>
                    {budgetRanges.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13.5px] font-medium text-ink-muted mb-1.5">
                    희망 일정
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="">선택해주세요</option>
                    {timelines.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13.5px] font-medium text-ink-muted mb-1.5">
                  프로젝트 설명
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className={cn(inputClass, 'resize-none leading-relaxed')}
                  placeholder="예시: 온라인 쇼핑몰을 만들고 싶습니다. 결제 기능과 재고 관리가 필요합니다."
                />
              </div>
            </fieldset>

            <hr className="border-line" />

            {/* 진행 안내 */}
            <div className="bg-surface-alt border border-line rounded-md p-5">
              <h3 className="text-[15.5px] font-semibold text-ink mb-3">진행 프로세스</h3>
              <ol className="space-y-1.5 text-[14.5px] text-ink-muted">
                <li>
                  <span className="text-accent font-medium mr-2 tabular-nums">1.</span>
                  견적 요청서 접수 (즉시)
                </li>
                <li>
                  <span className="text-accent font-medium mr-2 tabular-nums">2.</span>
                  담당자 확인 및 연락 (24시간 내)
                </li>
                <li>
                  <span className="text-accent font-medium mr-2 tabular-nums">3.</span>
                  온라인/오프라인 미팅 (무료)
                </li>
                <li>
                  <span className="text-accent font-medium mr-2 tabular-nums">4.</span>
                  상세 견적서 발송 (2-3일)
                </li>
              </ol>
            </div>

            {/* 동의 */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleInputChange}
                className="mt-0.5 w-4 h-4 accent-accent cursor-pointer"
              />
              <span className="text-[14.5px] text-ink-muted leading-relaxed">
                <span className="text-accent font-medium">*</span> 개인정보 수집 및 이용에 동의합니다.
                수집된 정보는 견적 제공 및 상담 목적으로만 사용되며, 프로젝트 종료 후 즉시 파기됩니다.
              </span>
            </label>

            {/* 미입력 안내 */}
            {!isFormValid && (
              <div className="rounded-md border border-line bg-surface-alt p-4 text-[14.5px] text-ink-muted">
                <p className="font-medium text-ink mb-1.5">필수 항목을 입력해주세요</p>
                <div className="flex flex-wrap gap-1.5">
                  {!formData.name && (
                    <span className="px-2 py-0.5 text-[12.5px] text-ink-muted bg-surface border border-line rounded">
                      이름
                    </span>
                  )}
                  {!formData.email && (
                    <span className="px-2 py-0.5 text-[12.5px] text-ink-muted bg-surface border border-line rounded">
                      이메일
                    </span>
                  )}
                  {!formData.projectType && (
                    <span className="px-2 py-0.5 text-[12.5px] text-ink-muted bg-surface border border-line rounded">
                      프로젝트 유형
                    </span>
                  )}
                  {!formData.agreement && (
                    <span className="px-2 py-0.5 text-[12.5px] text-ink-muted bg-surface border border-line rounded">
                      개인정보 동의
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 제출 */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15.5px] font-medium text-white bg-accent rounded-md hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '제출 중...' : '무료 견적 받기'}
              {!isSubmitting && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* 직접 연락 */}
      <section className="border-t border-line">
        <div className="container mx-auto py-12 text-center">
          <p className="text-[15.5px] text-ink-muted mb-3">급하신가요? 바로 연락주세요.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[15.5px]">
            <a
              href="tel:010-2174-5072"
              className="text-ink font-medium hover:text-accent transition-colors"
            >
              010-2174-5072
            </a>
            <span className="hidden sm:block text-line-strong">·</span>
            <a
              href="mailto:jslovejs182@gmail.com"
              className="text-ink font-medium hover:text-accent transition-colors"
            >
              jslovejs182@gmail.com
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
