/**
 * Quote 페이지
 * JPEX 견적 요청 및 프로젝트 계산기
 */

'use client';

import { useState, useEffect } from 'react';
import { Layout, Section } from '@/components/layout';

export default function Quote() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // 기본 정보
    name: '',
    email: '',
    phone: '',
    company: '',
    
    // 프로젝트 정보
    projectType: '',
    projectScope: '',
    features: [] as string[],
    design: '',
    responsive: false,
    cms: false,
    ecommerce: false,
    userAuth: false,
    api: false,
    realtime: false,
    
    // AI 관련
    aiFeatures: [] as string[],
    aiComplexity: '',
    
    // 기술 요구사항
    technologies: [] as string[],
    hosting: '',
    
    // 일정 및 예산
    timeline: '',
    budget: '',
    priority: '',
    
    // 추가 정보
    description: '',
    references: '',
    meeting: false,
    agreement: false
  });

  const steps = [
    { id: 1, title: '기본 정보', description: '연락처 및 회사 정보' },
    { id: 2, title: '프로젝트 유형', description: '개발할 서비스 종류' },
    { id: 3, title: '기능 및 요구사항', description: '필요한 기능 선택' },
    { id: 4, title: '일정', description: '프로젝트 일정' },
    { id: 5, title: '요청서 확인', description: '입력 정보 확인' }
  ];

  const projectTypes = [
    {
      id: 'landing',
      title: '랜딩 페이지',
      description: '간단한 회사 소개 페이지',
      icon: '📄'
    },
    {
      id: 'corporate',
      title: '기업 홈페이지',
      description: '회사 소개 및 서비스 홍보 사이트',
      icon: '🏢'
    },
    {
      id: 'ecommerce',
      title: '쇼핑몰',
      description: '온라인 상품 판매 플랫폼',
      icon: '🛒'
    },
    {
      id: 'webapp',
      title: '웹 애플리케이션',
      description: '복잡한 기능의 웹 서비스',
      icon: '💻'
    },
    {
      id: 'mobile',
      title: '모바일 앱',
      description: 'iOS/Android 네이티브 앱',
      icon: '📱'
    },
    {
      id: 'ai',
      title: 'AI 솔루션',
      description: '인공지능 기반 시스템',
      icon: '🤖'
    }
  ];

  const featureOptions = [
    { id: 'responsive', name: '반응형 디자인' },
    { id: 'cms', name: '관리자 시스템' },
    { id: 'userAuth', name: '회원가입/로그인' },
    { id: 'api', name: '외부 API 연동' },
    { id: 'realtime', name: '실시간 기능' },
    { id: 'payment', name: '결제 시스템' },
    { id: 'search', name: '검색 기능' },
    { id: 'notification', name: '알림 시스템' },
    { id: 'multilang', name: '다국어 지원' },
    { id: 'seo', name: 'SEO 최적화' }
  ];

  const aiFeatureOptions = [
    { id: 'chatbot', name: '챗봇' },
    { id: 'recommendation', name: '추천 시스템' },
    { id: 'analysis', name: '데이터 분석' },
    { id: 'nlp', name: '자연어 처리' },
    { id: 'computer-vision', name: '이미지 인식' },
    { id: 'automation', name: '업무 자동화' }
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

  const handleMultipleChoice = (name: string, value: string) => {
    setFormData(prev => {
      const currentArray = prev[name as keyof typeof prev] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [name]: newArray
      };
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateComplexity = (): number => {
    let score = 0;
    
    // 프로젝트 유형별 기본 점수
    const typeScores = {
      'landing': 1,
      'website': 2,
      'webapp': 4,
      'mobile': 5,
      'ai': 6
    };
    score += typeScores[formData.projectType as keyof typeof typeScores] || 0;
    
    // 프로젝트 규모별 점수
    const scopeScores = {
      'small': 1,
      'medium': 2,
      'large': 3,
      'enterprise': 4
    };
    score += scopeScores[formData.projectScope as keyof typeof scopeScores] || 0;
    
    // 기능별 점수 (각 기능당 0.5점)
    score += formData.features.length * 0.5;
    
    // 추가 기능별 점수
    if (formData.responsive) score += 0.5;
    if (formData.cms) score += 1;
    if (formData.ecommerce) score += 2;
    if (formData.userAuth) score += 1;
    if (formData.api) score += 1.5;
    if (formData.realtime) score += 2;
    
    // AI 기능 복잡도
    if (formData.aiFeatures.length > 0) {
      score += formData.aiFeatures.length * 1;
      
      const aiComplexityScores = {
        'basic': 1,
        'intermediate': 2,
        'advanced': 3
      };
      score += aiComplexityScores[formData.aiComplexity as keyof typeof aiComplexityScores] || 0;
    }
    
    // 기술 스택 복잡도 (각 기술당 0.3점)
    score += formData.technologies.length * 0.3;
    
    return Math.round(score); // 정수로 반올림
  };

  const handleSubmit = async () => {
    if (!formData.agreement) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: formData.projectType,
          projectScope: formData.projectScope,
          budgetRange: formData.budget,
          timeline: formData.timeline,
          requirements: JSON.stringify({
            features: formData.features,
            design: formData.design,
            responsive: formData.responsive,
            cms: formData.cms,
            ecommerce: formData.ecommerce,
            userAuth: formData.userAuth,
            api: formData.api,
            realtime: formData.realtime,
            aiFeatures: formData.aiFeatures,
            aiComplexity: formData.aiComplexity,
            technologies: formData.technologies,
            hosting: formData.hosting,
            priority: formData.priority,
            description: formData.description,
            references: formData.references
          }),
          complexityScore: calculateComplexity()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '견적 요청 접수에 실패했습니다.');
      }

      const result = await response.json();
      console.log('견적 요청 접수 성공:', result);
      
      // 견적서 상세 페이지로 이동
      if (result.data && result.data.id) {
        window.location.href = `/quote/${result.data.id}`;
      } else {
        alert('견적 요청이 성공적으로 전송되었습니다. 24시간 내에 상세한 견적서를 이메일로 발송해드리겠습니다.');
      }
      
    } catch (error) {
      console.error('견적 요청 접수 오류:', error);
      alert(error instanceof Error ? error.message : '견적 요청 접수 중 오류가 발생했습니다.');
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Section padding="xl" id="quote-hero">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
            프로젝트 <span className="text-accent">견적 요청</span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            프로젝트에 대한 정보를 입력해주시면 맞춤형 상담을 제공해드립니다.
            <br />
            24시간 내에 연락드리겠습니다.
          </p>
        </div>
      </Section>

      {/* 진행 단계 */}
      <Section background="secondary" padding="sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex items-center space-x-3 ${
                  currentStep >= step.id ? 'text-accent' : 'text-text-muted'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.id 
                      ? 'bg-accent text-white' 
                      : 'bg-background-secondary border border-secondary text-text-muted'
                  }`}>
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  <div className="hidden md:block">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-xs opacity-70">{step.description}</div>
                  </div>
                </div>
                
                {/* 연결선 */}
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-4 ${
                    currentStep > step.id ? 'bg-accent' : 'bg-secondary'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 양식 */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-background-secondary p-8 md:p-12 rounded-2xl border border-secondary">
            {/* Step 1: 기본 정보 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-bold text-text-primary">기본 정보</h2>
                  <p className="text-text-secondary">연락처 정보를 입력해주세요</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      이름 <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent outline-none"
                      placeholder="홍길동"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      이메일 <span className="text-error">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent outline-none"
                      placeholder="hong@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      전화번호
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent outline-none"
                      placeholder="010-1234-5678"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      회사명/단체명
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent outline-none"
                      placeholder="㈜예시회사"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: 프로젝트 유형 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-bold text-text-primary">프로젝트 유형</h2>
                  <p className="text-text-secondary">개발하고 싶은 서비스를 선택해주세요</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projectTypes.map(type => (
                    <div
                      key={type.id}
                      onClick={() => setFormData(prev => ({ ...prev, projectType: type.id }))}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        formData.projectType === type.id
                          ? 'border-accent bg-accent/10'
                          : 'border-secondary hover:border-accent/50'
                      }`}
                    >
                      <div className="text-center space-y-4">
                        <div className="text-4xl">{type.icon}</div>
                        <h3 className="font-semibold text-text-primary">{type.title}</h3>
                        <p className="text-sm text-text-secondary">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-text-primary">
                    프로젝트 규모
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: 'simple', label: '간단함', description: '기본 기능만' },
                      { value: 'complex', label: '복잡함', description: '다양한 기능' },
                      { value: 'enterprise', label: '대규모', description: '엔터프라이즈급' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="projectScope"
                          value={option.value}
                          checked={formData.projectScope === option.value}
                          onChange={handleInputChange}
                          className="text-accent focus:ring-accent"
                        />
                        <div>
                          <div className="font-medium text-text-primary">{option.label}</div>
                          <div className="text-xs text-text-secondary">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: 기능 및 요구사항 */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-bold text-text-primary">기능 및 요구사항</h2>
                  <p className="text-text-secondary">필요한 기능을 모두 선택해주세요</p>
                </div>
                
                {/* 일반 기능 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-text-primary">일반 기능</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featureOptions.map(feature => (
                      <label key={feature.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature.id)}
                          onChange={() => handleMultipleChoice('features', feature.id)}
                          className="text-accent focus:ring-accent"
                        />
                        <span className="text-text-primary">{feature.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* AI 기능 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-text-primary">AI 기능</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiFeatureOptions.map(feature => (
                      <label key={feature.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.aiFeatures.includes(feature.id)}
                          onChange={() => handleMultipleChoice('aiFeatures', feature.id)}
                          className="text-accent focus:ring-accent"
                        />
                        <span className="text-text-primary">{feature.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: 일정 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-bold text-text-primary">프로젝트 일정</h2>
                  <p className="text-text-secondary">희망하는 일정을 선택해주세요</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-3">
                      희망 완료 일정
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { value: '1-2weeks', label: '1-2주' },
                        { value: '1month', label: '1개월' },
                        { value: '2-3months', label: '2-3개월' },
                        { value: '3-6months', label: '3-6개월' },
                        { value: '6months+', label: '6개월 이상' },
                        { value: 'flexible', label: '유연하게' }
                      ].map(option => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="timeline"
                            value={option.value}
                            checked={formData.timeline === option.value}
                            onChange={handleInputChange}
                            className="text-accent focus:ring-accent"
                          />
                          <span className="text-text-primary">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      프로젝트 설명
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent outline-none resize-vertical"
                      placeholder="프로젝트에 대해 자세히 설명해주세요..."
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="meeting"
                      name="meeting"
                      checked={formData.meeting}
                      onChange={handleInputChange}
                      className="text-accent focus:ring-accent"
                    />
                    <label htmlFor="meeting" className="text-text-primary">
                      화상/대면 미팅 희망
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: 요청서 확인 */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-bold text-text-primary">요청서 확인</h2>
                  <p className="text-text-secondary">입력하신 정보를 확인해주세요</p>
                </div>
                
                {/* 요청 정보 요약 */}
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 p-8 rounded-2xl border border-accent/20">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-3">프로젝트 정보</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-text-secondary text-sm">프로젝트 유형</span>
                          <p className="text-text-primary font-medium">
                            {projectTypes.find(p => p.id === formData.projectType)?.title || '-'}
                          </p>
                        </div>
                        <div>
                          <span className="text-text-secondary text-sm">프로젝트 규모</span>
                          <p className="text-text-primary font-medium">
                            {formData.projectScope === 'simple' ? '간단함' : 
                             formData.projectScope === 'complex' ? '복잡함' : 
                             formData.projectScope === 'enterprise' ? '대규모' : '-'}
                          </p>
                        </div>
                        <div>
                          <span className="text-text-secondary text-sm">희망 일정</span>
                          <p className="text-text-primary font-medium">
                            {formData.timeline === '1-2weeks' ? '1-2주' :
                             formData.timeline === '1month' ? '1개월' :
                             formData.timeline === '2-3months' ? '2-3개월' :
                             formData.timeline === '3-6months' ? '3-6개월' :
                             formData.timeline === '6months+' ? '6개월 이상' :
                             formData.timeline === 'flexible' ? '유연하게' : '-'}
                          </p>
                        </div>
                        <div>
                          <span className="text-text-secondary text-sm">미팅 희망</span>
                          <p className="text-text-primary font-medium">{formData.meeting ? '예' : '아니오'}</p>
                        </div>
                      </div>
                    </div>
                    
                    {formData.features.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2">선택한 기능</h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.features.map(featureId => {
                            const feature = featureOptions.find(f => f.id === featureId);
                            return feature ? (
                              <span key={featureId} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                                {feature.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                    
                    {formData.aiFeatures.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2">AI 기능</h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.aiFeatures.map(featureId => {
                            const feature = aiFeatureOptions.find(f => f.id === featureId);
                            return feature ? (
                              <span key={featureId} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                {feature.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 안내사항 */}
                <div className="bg-background-primary p-6 rounded-xl border border-secondary">
                  <h4 className="font-semibold text-text-primary mb-3">📋 다음 단계</h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• 요청서가 접수되면 24시간 내에 연락드리겠습니다</li>
                    <li>• 상세한 상담을 통해 프로젝트 범위를 확정합니다</li>
                    <li>• 정확한 견적서는 상담 후 제공됩니다</li>
                    <li>• 프로젝트 시작 전 계약서를 작성합니다</li>
                  </ul>
                </div>
                
                {/* 개인정보 동의 */}
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
                    개인정보 수집 및 이용에 동의합니다. 수집된 정보는 견적 제공 및 상담 목적으로만 사용됩니다.
                  </label>
                </div>
              </div>
            )}

            {/* 버튼 */}
            <div className="flex justify-between pt-8 border-t border-secondary/30">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 text-text-primary border border-secondary rounded-lg hover:bg-background-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              
              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && (!formData.name || !formData.email)) ||
                    (currentStep === 2 && !formData.projectType)
                  }
                  className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.agreement}
                  className="px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  상담 요청하기
                </button>
              )}
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}