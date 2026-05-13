/**
 * About 페이지 — 노트폴리오 톤
 */

import { Layout } from '@/components/layout';
import Link from 'next/link';

const skills = [
  {
    category: 'Frontend',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'REST API', 'GraphQL'],
  },
  {
    category: 'AI & ML',
    technologies: ['OpenAI GPT', 'LangChain', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
  },
  {
    category: 'DevOps & Cloud',
    technologies: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Vercel', 'GitHub Actions'],
  },
  {
    category: 'Tools',
    technologies: ['Git', 'Figma', 'VS Code', 'Postman', 'Notion'],
  },
];

const values = [
  { title: '혁신적 사고', description: '최신 기술 트렌드를 빠르게 습득하고 창의적인 솔루션을 제안합니다.' },
  { title: '품질 중심', description: '코드 품질과 성능 최적화를 통해 장기적으로 유지보수가 용이한 시스템을 구축합니다.' },
  { title: '소통과 협업', description: '클라이언트와의 원활한 소통을 통해 요구사항을 정확히 파악하고 구현합니다.' },
  { title: '신속한 개발', description: '효율적인 개발 프로세스로 빠른 프로토타이핑과 안정적인 배포를 실현합니다.' },
];

export default function About() {
  return (
    <Layout>
      {/* 인트로 */}
      <section className="container mx-auto pt-20 lg:pt-32 pb-16 lg:pb-20">
        <p className="inline-flex items-center gap-2 font-display text-[12.5px] font-semibold tracking-[0.25em] text-ink uppercase mb-7"><span className="inline-block w-1.5 h-1.5 rounded-full bg-accent align-middle" /> 
          About
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-[52px] font-semibold text-ink leading-[1.2] tracking-tight max-w-4xl">
          5년차 <span className="text-accent-underline">풀스택 개발자</span>, JPEX입니다.
        </h1>
        <p className="text-[16.5px] text-ink-muted mt-8 max-w-2xl leading-relaxed">
          웹·앱부터 AI 솔루션, 클라우드 인프라까지. 클라이언트의 비즈니스
          성장을 위해 최신 기술과 창의적 아이디어로 최적의 결과를 만들어냅니다.
        </p>
      </section>

      {/* 핵심 가치 */}
      <section className="border-t border-line">
        <div className="container mx-auto py-20 lg:py-24">
          <p className="text-[12.5px] font-semibold tracking-[0.2em] text-ink-subtle uppercase mb-10">
            Core Values
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
            {values.map((v) => (
              <div key={v.title} className="bg-surface p-8 lg:p-10">
                <h3 className="text-[17px] font-semibold text-ink mb-3">
                  {v.title}
                </h3>
                <p className="text-[15px] text-ink-muted leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 기술 스택 */}
      <section className="border-t border-line bg-surface-alt">
        <div className="container mx-auto py-20 lg:py-24">
          <p className="text-[12.5px] font-semibold tracking-[0.2em] text-ink-subtle uppercase mb-10">
            Tech Stack
          </p>
          <div className="space-y-1">
            {skills.map((s) => (
              <div
                key={s.category}
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-10 py-7 lg:py-8 border-b border-line last:border-0"
              >
                <h3 className="text-[17px] font-medium text-ink">{s.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-[14px] text-ink-muted bg-surface border border-line rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <div className="container mx-auto py-20 lg:py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-ink">
              함께 프로젝트를 시작해볼까요?
            </h2>
            <p className="text-[15.5px] text-ink-muted mt-2">
              아이디어를 현실로 만들어드리겠습니다.
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
