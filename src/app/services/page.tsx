/**
 * Services 페이지 — 노트폴리오 톤
 */

import { Layout } from '@/components/layout';
import Link from 'next/link';

const services = [
  {
    id: 'web',
    title: '웹/앱 개발',
    description:
      'React, Next.js 기반의 현대적이고 반응형 웹 애플리케이션 및 모바일 앱 개발',
    features: [
      '반응형 웹 디자인 (Mobile First)',
      'SEO 최적화 및 성능 튜닝',
      'Progressive Web App (PWA)',
      '실시간 데이터 처리 및 WebSocket',
      '타사 API 연동 및 결제 시스템',
      '관리자 대시보드 구축',
    ],
    technologies: [
      'React', 'Next.js', 'TypeScript', 'Tailwind CSS',
      'Node.js', 'Express', 'PostgreSQL', 'MongoDB',
    ],
  },
  {
    id: 'ai',
    title: 'AI 솔루션',
    description:
      'OpenAI API 및 최신 AI 기술을 활용한 맞춤형 자동화 및 지능형 시스템 개발',
    features: [
      '챗봇 개발 및 고도화',
      '문서 자동 분석 및 요약',
      '이미지/음성 인식 시스템',
      '자동 콘텐츠 생성',
      '개인화 추천 엔진',
      'AI 기반 업무 자동화',
    ],
    technologies: [
      'OpenAI GPT-4', 'LangChain', 'Python', 'FastAPI',
      'TensorFlow', 'PyTorch', 'Hugging Face', 'Pinecone',
    ],
  },
  {
    id: 'cloud',
    title: '클라우드 & DevOps',
    description: '클라우드 인프라 구축, 자동화 배포, 시스템 모니터링 및 성능 최적화',
    features: [
      '클라우드 아키텍처 설계 (AWS, GCP)',
      '컨테이너화 및 오케스트레이션',
      'CI/CD 파이프라인 구축',
      '자동화 배포 시스템',
      '모니터링 및 로그 관리',
      '성능 분석 및 최적화',
    ],
    technologies: [
      'AWS', 'Google Cloud', 'Docker', 'Kubernetes',
      'Terraform', 'Jenkins', 'GitHub Actions',
    ],
  },
  {
    id: 'consulting',
    title: '교육 & 컨설팅',
    description:
      '웹/앱부터 AI, 클라우드까지 전 분야를 아우르는 실무 중심 교육 및 기술 컨설팅',
    features: [
      '풀스택 개발 (Frontend/Backend)',
      'AI/ML 실무 활용 교육',
      '클라우드 & DevOps 구축',
      '프로젝트 기반 실전 교육',
      '기술 아키텍처 설계 컨설팅',
      '기업 맞춤형 기술 교육 프로그램',
    ],
    technologies: ['Web/App Dev', 'AI/ML', 'Cloud/DevOps', 'React', 'Next.js', 'Python'],
  },
];

export default function Services() {
  return (
    <Layout>
      {/* 인트로 */}
      <section className="container mx-auto pt-20 lg:pt-32 pb-16 lg:pb-20">
        <p className="inline-flex items-center gap-2 font-display text-[12.5px] font-semibold tracking-[0.25em] text-ink uppercase mb-7"><span className="inline-block w-1.5 h-1.5 rounded-full bg-accent align-middle" /> 
          Services
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-[52px] font-semibold text-ink leading-[1.2] tracking-tight max-w-4xl">
          제공하는 <span className="text-accent-underline">서비스</span>를 모았습니다.
        </h1>
        <p className="text-[16.5px] text-ink-muted mt-8 max-w-2xl leading-relaxed">
          최신 기술과 풍부한 경험을 바탕으로 고품질의 디지털 솔루션을 제공합니다.
        </p>
      </section>

      {/* 서비스 상세 */}
      <section className="border-t border-line">
        <div className="container mx-auto">
          {services.map((s, idx) => (
            <article
              key={s.id}
              id={s.id}
              className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-20 py-20 lg:py-28 border-b border-line last:border-0"
            >
              <div>
                <p className="text-[12.5px] font-semibold tracking-[0.2em] text-accent uppercase mb-4">
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-4">
                  {s.title}
                </h2>
                <p className="text-[15.5px] text-ink-muted leading-relaxed">
                  {s.description}
                </p>
              </div>
              <div className="space-y-12">
                <div>
                  <h3 className="text-[12.5px] font-semibold tracking-widest text-ink-subtle uppercase mb-6">
                    주요 서비스
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="text-[15px] text-ink-muted flex items-start gap-3"
                      >
                        <span className="text-accent mt-[9px] w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[12.5px] font-semibold tracking-widest text-ink-subtle uppercase mb-6">
                    사용 기술
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {s.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 text-[14px] text-ink-muted bg-surface-alt border border-line rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-surface-alt">
        <div className="container mx-auto py-20 lg:py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-ink">
              맞춤형 견적이 필요하신가요?
            </h2>
            <p className="text-[15.5px] text-ink-muted mt-4 max-w-xl">
              모든 프로젝트는 고유한 요구사항이 있습니다. 정확한 견적은 상담을 통해 제공합니다.
            </p>
          </div>
          <Link
            href="/quote"
            className="group/btn inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-medium text-white bg-ink rounded-full hover:bg-ink/85 shadow-card hover:shadow-lift transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            견적 문의하기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
