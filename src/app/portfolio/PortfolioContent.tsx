/**
 * Portfolio 콘텐츠 컴포넌트 (클라이언트)
 * 인터랙티브 필터링 및 애니메이션 처리
 */

'use client';

import { useState } from 'react';
import { Layout, Section } from '@/components/layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { categories, projects } from './data';

export default function PortfolioContent() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

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
            홈페이지 제작 <span className="text-green">포트폴리오</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            회사 홈페이지 제작, 병원 홈페이지 제작, 쇼핑몰 제작 등<br />
            다양한 분야의 성공적인 웹 개발 프로젝트를 확인해보세요
          </p>
        </motion.div>
      </Section>

      {/* Filter Tabs */}
      <Section background="secondary" padding="sm">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-green text-black shadow-glow-green-sm'
                  : 'bg-black-light text-gray-400 border border-gray-800 hover:border-green'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Projects Grid */}
      <Section padding="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="group bg-black-light p-6 lg:p-8 rounded-2xl border-2 border-gray-800 hover:border-green transition-all duration-300 hover:shadow-glow-green-sm"
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              {/* Project Image */}
              <div className="relative mb-6">
                <div className="aspect-video bg-gradient-to-br from-green/10 to-green/5 rounded-xl overflow-hidden border border-gray-800 group-hover:border-green transition-all duration-300">
                  <div className="relative w-full h-full bg-gray-900">
                    <Image
                      src={project.image}
                      alt={`${project.title} - ${project.description}`}
                      fill
                      className="object-cover"
                      itemProp="image"
                    />
                  </div>
                </div>

                {/* Year Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-black-light/90 text-gray-400 text-xs font-semibold rounded-full border border-gray-800">
                    <time itemProp="dateCreated">{project.year}</time>
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                {/* Category & Duration */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-green/10 text-green text-sm font-medium rounded-full border border-green/30">
                    {categories.find(cat => cat.id === project.category)?.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {project.duration}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-green transition-colors duration-300" itemProp="name">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed" itemProp="description">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">기술 스택</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs bg-green/10 text-green rounded-full border border-green/20"
                        itemProp="keywords"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">주요 기능</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-green text-sm mt-0.5">✓</span>
                        <span className="text-sm text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="pt-4 border-t border-gray-800">
                  <h3 className="text-sm font-semibold text-green mb-3">주요 성과</h3>
                  <div className="space-y-2">
                    {project.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-green">🎯</span>
                        <span className="text-sm font-medium text-gray-300">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                {(project.liveUrl || project.githubUrl) && (
                  <div className="pt-4 border-t border-gray-800 flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green text-black font-semibold rounded-lg hover:bg-green-light transition-all duration-300 group/btn"
                        itemProp="url"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>사이트 보기</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
            다음 프로젝트의 주인공은 <span className="text-green">당신</span>입니다
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            회사 홈페이지 제작, 병원 홈페이지 제작, 쇼핑몰 개발 등<br />
            성공적인 프로젝트 경험을 바탕으로 여러분의 아이디어를 현실로 만들어드리겠습니다
          </p>

          <Link
            href="/quote"
            className="group relative inline-flex px-8 py-4 text-lg font-bold text-black bg-green rounded-lg overflow-hidden shadow-glow-green-sm hover:shadow-glow-green transition-all duration-300"
          >
            <span className="absolute inset-0 bg-green-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative z-10 flex items-center gap-2">
              무료 견적 문의하기
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </Section>
    </Layout>
  );
}
