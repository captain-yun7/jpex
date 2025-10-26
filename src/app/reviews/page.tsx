/**
 * Reviews 페이지
 * JPEX 고객 후기 및 평가
 */

'use client';

import { Layout, Section } from '@/components/layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function Reviews() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'web', name: '웹/앱 개발' },
    { id: 'ai', name: 'AI 솔루션' },
    { id: 'consulting', name: '컨설팅' }
  ];

  const reviews = [
    {
      id: 1,
      category: 'web',
      client: '김민수',
      company: '테크스타트업 A',
      role: '대표',
      project: '기업 홈페이지 & 관리자 시스템',
      rating: 5,
      date: '2024.10',
      content: '처음 외주를 맡기는 거라 걱정이 많았는데, 정말 만족스러웠습니다. 특히 소통이 원활했고 요구사항을 정확히 이해하고 구현해주셔서 좋았습니다. 일정도 약속대로 지켜주셨고, 배포 후에도 세심하게 케어해주셔서 감사했습니다.',
      tags: ['Next.js', 'React', 'Node.js'],
      avatar: '👨‍💼'
    },
    {
      id: 2,
      category: 'ai',
      client: '박지영',
      company: '마케팅 에이전시 B',
      role: '팀장',
      project: 'AI 챗봇 & 자동화 시스템',
      rating: 5,
      date: '2024.09',
      content: 'GPT-4 기반 고객 상담 챗봇을 만들어주셨는데, 응답 정확도가 생각보다 훨씬 높아서 놀랐습니다. 덕분에 고객 문의 처리 시간이 70% 이상 단축됐어요. 비용 대비 효과가 정말 좋았습니다.',
      tags: ['OpenAI', 'LangChain', 'FastAPI'],
      avatar: '👩‍💼'
    },
    {
      id: 3,
      category: 'web',
      client: '이준호',
      company: '온라인 쇼핑몰 C',
      role: '운영팀',
      project: 'E-commerce 플랫폼 구축',
      rating: 5,
      date: '2024.08',
      content: '결제 연동부터 재고 관리까지 복잡한 기능들이 많았는데 모두 완벽하게 구현해주셨습니다. 특히 관리자 페이지가 직관적이어서 사용하기 편하고, 성능도 매우 빠릅니다. 적극 추천합니다!',
      tags: ['React', 'PostgreSQL', 'Stripe'],
      avatar: '👨‍💻'
    },
    {
      id: 4,
      category: 'consulting',
      client: '정서윤',
      company: 'SaaS 스타트업 D',
      role: 'CTO',
      project: '기술 아키텍처 설계',
      rating: 5,
      date: '2024.07',
      content: '레거시 시스템을 현대화하는 과정에서 도움을 받았습니다. 우리 비즈니스에 맞는 기술 스택을 제안해주시고, 마이그레이션 로드맵도 상세하게 작성해주셔서 팀 전체가 방향성을 잡는 데 큰 도움이 됐습니다.',
      tags: ['Architecture', 'AWS', 'Microservices'],
      avatar: '👩‍💻'
    },
    {
      id: 5,
      category: 'web',
      client: '최현우',
      company: '교육 플랫폼 E',
      role: '대표',
      project: '온라인 강의 플랫폼',
      rating: 5,
      date: '2024.06',
      content: '동영상 스트리밍부터 결제, 수강생 관리까지 모든 기능이 잘 작동합니다. 반응형으로 제작해주셔서 모바일에서도 문제없고, 로딩 속도도 빨라서 사용자들 만족도가 높습니다. 감사합니다!',
      tags: ['Next.js', 'Video Streaming', 'MongoDB'],
      avatar: '👨‍🏫'
    },
    {
      id: 6,
      category: 'ai',
      client: '강민지',
      company: '법률 서비스 F',
      role: '변호사',
      project: '문서 분석 AI 시스템',
      rating: 5,
      date: '2024.05',
      content: '방대한 법률 문서를 자동으로 분석하고 요약해주는 시스템을 구축해주셨습니다. 업무 효율이 엄청나게 올라갔고, 직원들도 매우 만족하고 있습니다. 기술력이 정말 뛰어나십니다.',
      tags: ['GPT-4', 'Document AI', 'Python'],
      avatar: '👩‍⚖️'
    }
  ];

  const stats = [
    { number: '200+', label: '완료 프로젝트' },
    { number: '98%', label: '고객 만족도' },
    { number: '100+', label: '5점 리뷰' },
    { number: '85%', label: '재의뢰율' }
  ];

  const filteredReviews = selectedCategory === 'all'
    ? reviews
    : reviews.filter(review => review.category === selectedCategory);

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
            고객 <span className="text-green">후기</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            실제 고객들의 생생한 경험을 확인하세요
          </p>
        </motion.div>
      </Section>

      {/* Stats Section */}
      <Section background="secondary" padding="lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-black-light rounded-xl border border-gray-800"
            >
              <div className="text-3xl md:text-4xl font-black text-green mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Filter Tabs */}
      <Section padding="sm">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-green text-black shadow-glow-green-sm'
                  : 'bg-black-light text-gray-400 border border-gray-800 hover:border-green'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Reviews Grid */}
      <Section background="secondary" padding="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="group bg-black-light p-6 lg:p-8 rounded-2xl border-2 border-gray-800 hover:border-green transition-all duration-300 hover:shadow-glow-green-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{review.avatar}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{review.client}</h3>
                      <span className="text-gray-500 text-sm">· {review.role}</span>
                    </div>
                    <p className="text-sm text-gray-400">{review.company}</p>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-green" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-500 ml-2">{review.date}</span>
              </div>

              {/* Project */}
              <div className="mb-4">
                <span className="text-sm font-semibold text-green">
                  프로젝트: {review.project}
                </span>
              </div>

              {/* Content */}
              <p className="text-gray-300 leading-relaxed mb-4">
                {review.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {review.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs bg-green/10 text-green rounded-full border border-green/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
            다음은 <span className="text-green">당신</span>의 차례입니다
          </h2>
          <p className="text-xl text-gray-400">
            성공적인 프로젝트 경험을 함께 만들어보세요
          </p>

          <Link
            href="/quote"
            className="group relative inline-flex px-8 py-4 text-lg font-bold text-black bg-green rounded-lg overflow-hidden shadow-glow-green-sm hover:shadow-glow-green transition-all duration-300"
          >
            <span className="absolute inset-0 bg-green-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative z-10 flex items-center gap-2">
              견적 문의하기
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          {/* Trust Badge */}
          <div className="pt-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green rounded-full animate-pulse shadow-glow-green-sm"></div>
              <span className="text-sm text-gray-400">실시간 문의 가능</span>
            </div>
            <p className="text-xs text-gray-500">
              평균 2시간 내 응답 · 무료 상담 제공
            </p>
          </div>
        </motion.div>
      </Section>
    </Layout>
  );
}
