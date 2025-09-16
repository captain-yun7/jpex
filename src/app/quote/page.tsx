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
  
  const [estimatedCost, setEstimatedCost] = useState({
    min: 0,
    max: 0,
    timeline: '',
    breakdown: [] as Array<{category: string, cost: number, description: string}>
  });

  const steps = [
    { id: 1, title: '기본 정보', description: '연락처 및 회사 정보' },
    { id: 2, title: '프로젝트 유형', description: '개발할 서비스 종류' },
    { id: 3, title: '기능 및 요구사항', description: '필요한 기능 선택' },
    { id: 4, title: '기술 스택', description: '선호하는 기술' },
    { id: 5, title: '일정 및 예산', description: '프로젝트 조건' },
    { id: 6, title: '견적서', description: '예상 비용 확인' }
  ];

  const projectTypes = [
    {
      id: 'landing',
      title: '랜딩 페이지',
      description: '간단한 회사 소개 페이지',
      basePrice: 100,
      icon: '📄'
    },
    {
      id: 'corporate',
      title: '기업 홈페이지',
      description: '회사 소개 및 서비스 홍보 사이트',
      basePrice: 200,
      icon: '🏢'
    },
    {
      id: 'ecommerce',
      title: '쇼핑몰',
      description: '온라인 상품 판매 플랫폼',
      basePrice: 500,
      icon: '🛒'
    },
    {
      id: 'webapp',
      title: '웹 애플리케이션',
      description: '복잡한 기능의 웹 서비스',
      basePrice: 800,
      icon: '💻'
    },
    {
      id: 'mobile',
      title: '모바일 앱',
      description: 'iOS/Android 네이티브 앱',
      basePrice: 1000,
      icon: '📱'
    },
    {
      id: 'ai',
      title: 'AI 솔루션',
      description: '인공지능 기반 시스템',
      basePrice: 600,
      icon: '🤖'
    }
  ];

  const featureOptions = [
    { id: 'responsive', name: '반응형 디자인', cost: 50 },
    { id: 'cms', name: '관리자 시스템', cost: 200 },
    { id: 'userAuth', name: '회원가입/로그인', cost: 150 },
    { id: 'api', name: '외부 API 연동', cost: 100 },
    { id: 'realtime', name: '실시간 기능', cost: 300 },
    { id: 'payment', name: '결제 시스템', cost: 200 },
    { id: 'search', name: '검색 기능', cost: 100 },
    { id: 'notification', name: '알림 시스템', cost: 150 },
    { id: 'multilang', name: '다국어 지원', cost: 100 },
    { id: 'seo', name: 'SEO 최적화', cost: 100 }
  ];

  const aiFeatureOptions = [
    { id: 'chatbot', name: '챗봇', cost: 300 },
    { id: 'recommendation', name: '추천 시스템', cost: 400 },
    { id: 'analysis', name: '데이터 분석', cost: 500 },
    { id: 'nlp', name: '자연어 처리', cost: 400 },
    { id: 'computer-vision', name: '이미지 인식', cost: 600 },
    { id: 'automation', name: '업무 자동화', cost: 300 }
  ];

  const technologiesOptions = [
    'React', 'Next.js', 'Vue.js', 'Node.js', 'Python',
    'WordPress', 'Laravel', 'Django', 'AWS', 'Google Cloud'
  ];

  // 견적 계산
  useEffect(() => {
    calculateEstimate();
  }, [formData]);

  const calculateEstimate = () => {
    let baseCost = 0;
    let additionalCost = 0;
    const breakdown: Array<{category: string, cost: number, description: string}> = [];

    // 기본 프로젝트 비용
    const projectType = projectTypes.find(p => p.id === formData.projectType);
    if (projectType) {
      baseCost = projectType.basePrice;
      breakdown.push({
        category: '기본 개발',
        cost: baseCost,
        description: projectType.title
      });
    }

    // 기능별 추가 비용
    let featureCost = 0;
    formData.features.forEach(featureId => {
      const feature = featureOptions.find(f => f.id === featureId);
      if (feature) {
        featureCost += feature.cost;
      }
    });

    if (featureCost > 0) {
      breakdown.push({
        category: '추가 기능',
        cost: featureCost,
        description: `${formData.features.length}개 기능`
      });
      additionalCost += featureCost;
    }

    // AI 기능 비용
    let aiCost = 0;
    formData.aiFeatures.forEach(aiFeatureId => {
      const aiFeature = aiFeatureOptions.find(f => f.id === aiFeatureId);
      if (aiFeature) {
        aiCost += aiFeature.cost;
      }
    });

    if (aiCost > 0) {
      breakdown.push({
        category: 'AI 기능',
        cost: aiCost,
        description: `${formData.aiFeatures.length}개 AI 기능`
      });
      additionalCost += aiCost;
    }

    // 복잡도에 따른 조정
    let complexityMultiplier = 1;
    if (formData.projectScope === 'complex') complexityMultiplier = 1.5;
    else if (formData.projectScope === 'enterprise') complexityMultiplier = 2;

    const totalBase = (baseCost + additionalCost) * complexityMultiplier;
    
    // 일정에 따른 조정
    let urgencyMultiplier = 1;
    if (formData.timeline === '1-2weeks') urgencyMultiplier = 1.5;
    else if (formData.timeline === '1month') urgencyMultiplier = 1.2;

    const finalCost = totalBase * urgencyMultiplier;

    setEstimatedCost({
      min: Math.round(finalCost * 0.8),
      max: Math.round(finalCost * 1.2),
      timeline: getTimelineDescription(formData.timeline),
      breakdown
    });
  };

  const getTimelineDescription = (timeline: string) => {
    const timelineMap: Record<string, string> = {
      '1-2weeks': '1-2주',
      '1month': '1개월',
      '2-3months': '2-3개월',
      '3-6months': '3-6개월',
      '6months+': '6개월 이상'
    };
    return timelineMap[timeline] || '협의';
  };

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

  const handleSubmit = async () => {
    // 실제 구현에서는 API 호출
    console.log('Quote submitted:', { formData, estimatedCost });
    alert('견적 요청이 전송되었습니다. 곧 연락드리겠습니다.');
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
            몇 가지 질문에 답하시면 즉시 예상 견적을 확인하실 수 있습니다.
            <br />
            정확한 견적은 상담을 통해 제공해드립니다.
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
                        <div className="text-accent font-bold">{type.basePrice}만원~</div>
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
                        <div className="flex-1 flex justify-between">
                          <span className="text-text-primary">{feature.name}</span>
                          <span className="text-accent font-medium">+{feature.cost}만원</span>
                        </div>
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
                        <div className="flex-1 flex justify-between">
                          <span className="text-text-primary">{feature.name}</span>
                          <span className="text-accent font-medium">+{feature.cost}만원</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: 기술 스택 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-bold text-text-primary">기술 스택</h2>
                  <p className="text-text-secondary">선호하는 기술이 있다면 선택해주세요</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-3">
                      선호 기술 (선택사항)
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {technologiesOptions.map(tech => (
                        <label key={tech} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.technologies.includes(tech)}
                            onChange={() => handleMultipleChoice('technologies', tech)}
                            className="text-accent focus:ring-accent"
                          />
                          <span className="text-text-primary px-3 py-1 bg-background-primary rounded-full text-sm">
                            {tech}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      호스팅 환경
                    </label>
                    <select
                      name="hosting"
                      value={formData.hosting}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent outline-none"
                    >
                      <option value="">선택해주세요</option>
                      <option value="vercel">Vercel (추천)</option>
                      <option value="aws">AWS</option>
                      <option value="google-cloud">Google Cloud</option>
                      <option value="azure">Microsoft Azure</option>
                      <option value="other">기타/협의</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: 일정 및 예산 */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-bold text-text-primary">일정 및 예산</h2>
                  <p className="text-text-secondary">프로젝트 조건을 선택해주세요</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-3">
                      희망 완료 일정
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { value: '1-2weeks', label: '1-2주 (긴급)', extra: '+50%' },
                        { value: '1month', label: '1개월', extra: '+20%' },
                        { value: '2-3months', label: '2-3개월', extra: '표준' },
                        { value: '3-6months', label: '3-6개월', extra: '' },
                        { value: '6months+', label: '6개월 이상', extra: '' },
                        { value: 'flexible', label: '유연하게', extra: '' }
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
                          <div>
                            <div className="text-text-primary">{option.label}</div>
                            {option.extra && (
                              <div className="text-xs text-accent">{option.extra}</div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      예상 예산 범위
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-secondary bg-background-primary text-text-primary focus:border-accent outline-none"
                    >
                      <option value="">선택해주세요</option>
                      <option value="under-200">200만원 미만</option>
                      <option value="200-500">200-500만원</option>
                      <option value="500-1000">500-1000만원</option>
                      <option value="1000-2000">1000-2000만원</option>
                      <option value="over-2000">2000만원 이상</option>
                      <option value="discuss">협의</option>
                    </select>
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

            {/* Step 6: 견적서 */}
            {currentStep === 6 && (
              <div className="space-y-8">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-2xl font-bold text-text-primary">예상 견적서</h2>
                  <p className="text-text-secondary">아래는 입력하신 정보를 바탕으로 한 예상 견적입니다</p>
                </div>
                
                {/* 견적 요약 */}
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 p-8 rounded-2xl border border-accent/20">
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-semibold text-text-primary">예상 개발 비용</h3>
                    <div className="text-4xl font-bold text-accent">
                      {estimatedCost.min.toLocaleString()}만원 - {estimatedCost.max.toLocaleString()}만원
                    </div>
                    <div className="text-text-secondary">
                      예상 개발 기간: {estimatedCost.timeline}
                    </div>
                  </div>
                </div>
                
                {/* 견적 상세 */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-text-primary">비용 상세</h4>
                  <div className="space-y-3">
                    {estimatedCost.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-secondary/30">
                        <div>
                          <div className="font-medium text-text-primary">{item.category}</div>
                          <div className="text-sm text-text-secondary">{item.description}</div>
                        </div>
                        <div className="font-semibold text-accent">
                          {item.cost.toLocaleString()}만원
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 주의사항 */}
                <div className="bg-background-primary p-6 rounded-xl border border-secondary">
                  <h4 className="font-semibold text-text-primary mb-3">📋 안내사항</h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• 위 견적은 예상 견적으로, 정확한 견적은 상담 후 제공됩니다</li>
                    <li>• 프로젝트 복잡도에 따라 비용이 달라질 수 있습니다</li>
                    <li>• 디자인 비용은 별도로 산정됩니다</li>
                    <li>• 유지보수 및 호스팅 비용은 포함되어 있지 않습니다</li>
                    <li>• 견적서 유효기간은 30일입니다</li>
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
                  견적 요청하기
                </button>
              )}
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}