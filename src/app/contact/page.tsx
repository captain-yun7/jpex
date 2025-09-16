/**
 * Contact 페이지
 * JPEX 연락처 및 문의 양식
 */

'use client';

import { useState } from 'react';
import { Layout, Section } from '@/components/layout';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    agreement: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const projectTypes = [
    { value: 'web-development', label: '웹/앱 개발' },
    { value: 'ai-solution', label: 'AI 솔루션' },
    { value: 'consulting', label: '기술 컨설팅' },
    { value: 'maintenance', label: '유지보수' },
    { value: 'other', label: '기타' }
  ];

  const budgetRanges = [
    { value: 'under-100', label: '100만원 미만' },
    { value: '100-300', label: '100-300만원' },
    { value: '300-500', label: '300-500만원' },
    { value: '500-1000', label: '500-1000만원' },
    { value: 'over-1000', label: '1000만원 이상' },
    { value: 'discuss', label: '협의' }
  ];

  const timelineOptions = [
    { value: '1-2weeks', label: '1-2주' },
    { value: '1month', label: '1개월' },
    { value: '2-3months', label: '2-3개월' },
    { value: '3-6months', label: '3-6개월' },
    { value: '6months+', label: '6개월 이상' },
    { value: 'flexible', label: '유연하게' }
  ];

  const contactMethods = [
    {
      icon: '📞',
      title: '전화 상담',
      description: '빠른 상담을 원하신다면',
      value: CONTACT_INFO.phone,
      link: `tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`,
      available: '평일 9:00-18:00'
    },
    {
      icon: '✉️',
      title: '이메일',
      description: '상세한 문의는 이메일로',
      value: CONTACT_INFO.email,
      link: `mailto:${CONTACT_INFO.email}`,
      available: '24시간 접수'
    },
    {
      icon: '💬',
      title: '카카오톡',
      description: '간편하게 연락하기',
      value: '@JPEX_DEV',
      link: 'https://open.kakao.com/o/s123456789',
      available: '평일 9:00-18:00'
    },
    {
      icon: '📍',
      title: '오프라인 미팅',
      description: '직접 만나서 상담',
      value: CONTACT_INFO.address,
      link: '#',
      available: '사전 예약 필요'
    }
  ];

  const faqs = [
    {
      question: '프로젝트 진행 과정은 어떻게 되나요?',
      answer: '요구사항 분석 → 기술 설계 → 프로토타입 개발 → 반복적 개발 → 테스트 & 배포 → 유지보수 순으로 진행됩니다. 각 단계마다 고객과 소통하여 피드백을 반영합니다.'
    },
    {
      question: '프로젝트 비용은 어떻게 산정되나요?',
      answer: '프로젝트 복잡도, 개발 기간, 사용 기술 등을 종합적으로 고려하여 산정합니다. 무료 상담을 통해 정확한 견적을 제공해드립니다.'
    },
    {
      question: '유지보수는 어떻게 진행되나요?',
      answer: '프로젝트 완료 후 1-3개월간 무료 유지보수를 제공하며, 이후에는 월 단위 또는 건별로 유지보수 서비스를 제공합니다.'
    },
    {
      question: 'AI 기술 도입이 처음인데 가능한가요?',
      answer: '네, 가능합니다. AI 기술 도입부터 운영까지 전 과정을 지원하며, 직원 교육과 기술 문서 제공도 포함됩니다.'
    },
    {
      question: '소스코드 소유권은 어떻게 되나요?',
      answer: '프로젝트 완료 후 모든 소스코드와 관련 문서의 소유권은 고객에게 이전됩니다. 명확한 계약서를 통해 보장해드립니다.'
    }
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
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
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
          message: formData.message
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '문의사항 접수에 실패했습니다.');
      }

      const result = await response.json();
      console.log('문의사항 접수 성공:', result);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
        agreement: false
      });
    } catch (error) {
      console.error('문의사항 접수 오류:', error);
      setSubmitStatus('error');
      alert(error instanceof Error ? error.message : '문의사항 접수 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Section padding="xl" id="contact-hero">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
            <span className="text-accent">연락하기</span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            프로젝트 아이디어가 있으시나요? 언제든지 편하게 연락주세요.
            <br />
            무료 상담을 통해 최적의 솔루션을 제안해드리겠습니다.
          </p>
          
          <div className="inline-flex items-center space-x-2 bg-success/20 text-success px-4 py-2 rounded-full">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">현재 새로운 프로젝트 문의 받고 있습니다</span>
          </div>
        </div>
      </Section>

      {/* 연락 방법 */}
      <Section background="secondary" padding="xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              연락 방법
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              편하신 방법으로 연락주세요. 빠르고 정확한 답변을 약속드립니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="group bg-background-primary p-6 rounded-2xl border border-secondary hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1"
              >
                <div className="text-center space-y-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                      {method.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-2">
                      {method.description}
                    </p>
                    <p className="text-accent font-medium text-sm break-all">
                      {method.value}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t border-secondary/50">
                    <span className="text-xs text-text-muted">
                      {method.available}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* 문의 양식 */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              프로젝트 문의
            </h2>
            <p className="text-lg text-text-secondary">
              상세한 정보를 입력해주시면 더욱 정확한 상담을 받으실 수 있습니다.
            </p>
          </div>
          
          <div className="bg-background-secondary p-8 md:p-12 rounded-2xl border border-secondary">
            {submitStatus === 'success' ? (
              <div className="text-center space-y-6">
                <div className="text-6xl">✅</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-text-primary">문의가 성공적으로 전송되었습니다!</h3>
                  <p className="text-text-secondary">
                    빠른 시일 내에 연락드리겠습니다. 감사합니다.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-3 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors"
                >
                  새로운 문의 작성하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 이름 */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary">
                      이름 <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition-colors"
                      placeholder="홍길동"
                    />
                  </div>
                  
                  {/* 이메일 */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                      이메일 <span className="text-error">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition-colors"
                      placeholder="hong@example.com"
                    />
                  </div>
                  
                  {/* 전화번호 */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-text-primary">
                      전화번호
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition-colors"
                      placeholder="010-1234-5678"
                    />
                  </div>
                  
                  {/* 회사명 */}
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-text-primary">
                      회사명/단체명
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition-colors"
                      placeholder="㈜예시회사"
                    />
                  </div>
                  
                  {/* 프로젝트 유형 */}
                  <div className="space-y-2">
                    <label htmlFor="projectType" className="block text-sm font-medium text-text-primary">
                      프로젝트 유형 <span className="text-error">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition-colors"
                    >
                      <option value="">선택해주세요</option>
                      {projectTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* 예산 */}
                  <div className="space-y-2">
                    <label htmlFor="budget" className="block text-sm font-medium text-text-primary">
                      예상 예산
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition-colors"
                    >
                      <option value="">선택해주세요</option>
                      {budgetRanges.map(budget => (
                        <option key={budget.value} value={budget.value}>{budget.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* 희망 일정 */}
                <div className="space-y-2">
                  <label htmlFor="timeline" className="block text-sm font-medium text-text-primary">
                    희망 완료 일정
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {timelineOptions.map(option => (
                      <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="timeline"
                          value={option.value}
                          checked={formData.timeline === option.value}
                          onChange={handleInputChange}
                          className="text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-text-primary">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* 메시지 */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary">
                    프로젝트 설명 <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none transition-colors resize-vertical"
                    placeholder="프로젝트에 대해 자세히 설명해주세요. 목표, 요구사항, 기능, 참고 사이트 등을 포함해주시면 더욱 정확한 상담이 가능합니다."
                  />
                </div>
                
                {/* 개인정보 동의 */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreement"
                      name="agreement"
                      checked={formData.agreement}
                      onChange={handleInputChange}
                      className="mt-1 text-accent focus:ring-accent"
                    />
                    <label htmlFor="agreement" className="text-sm text-text-secondary">
                      <span className="text-error">*</span> 개인정보 수집 및 이용에 동의합니다. 
                      수집된 정보는 문의 응답 및 상담 목적으로만 사용되며, 
                      별도 동의 없이 제3자에게 제공되지 않습니다.
                    </label>
                  </div>
                </div>
                
                {/* 제출 버튼 */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover focus:ring-2 focus:ring-accent/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>전송 중...</span>
                      </span>
                    ) : (
                      '문의 전송하기'
                    )}
                  </button>
                </div>
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-error/10 border border-error/30 rounded-lg text-error text-center">
                    문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* 자주 묻는 질문 */}
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              자주 묻는 질문
            </h2>
            <p className="text-lg text-text-secondary">
              고객들이 자주 문의하시는 내용들입니다
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-background-primary p-6 rounded-xl border border-secondary"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  Q. {faq.question}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  A. {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 소셜 미디어 */}
      <Section padding="xl">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            소셜 미디어에서도 만나요
          </h2>
          
          <div className="flex justify-center space-x-6">
            {Object.entries(SOCIAL_LINKS).map(([key, social]) => (
              <a
                key={key}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-background-secondary rounded-xl border border-secondary hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {key === 'github' && '📚'}
                  {key === 'linkedin' && '💼'}
                  {key === 'twitter' && '🐦'}
                  {key === 'instagram' && '📸'}
                </div>
                <div className="mt-2 text-sm text-text-primary font-medium">
                  {social.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>
    </Layout>
  );
}