/**
 * About 페이지
 * JPEX 회사 소개 및 개발자 정보
 */

import { Layout, Section } from '@/components/layout';
import Link from 'next/link';

export default function About() {
  const skills = [
    {
      category: 'Frontend',
      icon: '🎨',
      technologies: [
        'React', 'Next.js', 'TypeScript', 'JavaScript',
        'Tailwind CSS', 'Material-UI', 'Styled Components',
        'HTML5', 'CSS3', 'SASS/SCSS'
      ]
    },
    {
      category: 'Backend',
      icon: '⚙️',
      technologies: [
        'Node.js', 'Express.js', 'Python', 'FastAPI',
        'Django', 'PostgreSQL', 'MongoDB', 'Redis',
        'REST API', 'GraphQL', 'JWT Authentication'
      ]
    },
    {
      category: 'AI & ML',
      icon: '🤖',
      technologies: [
        'OpenAI GPT API', 'LangChain', 'Python',
        'TensorFlow', 'PyTorch', 'Scikit-learn',
        'Natural Language Processing', 'Computer Vision'
      ]
    },
    {
      category: 'DevOps & Cloud',
      icon: '☁️',
      technologies: [
        'AWS', 'Google Cloud', 'Docker', 'Kubernetes',
        'Vercel', 'Netlify', 'CI/CD', 'GitHub Actions',
        'Linux', 'Nginx', 'PM2'
      ]
    },
    {
      category: 'Tools & Others',
      icon: '🛠️',
      technologies: [
        'Git', 'GitHub', 'VS Code', 'Figma',
        'Postman', 'Jira', 'Slack', 'Notion',
        'Adobe Creative Suite', 'Webpack', 'Vite'
      ]
    }
  ];

  const values = [
    {
      icon: '💡',
      title: '혁신적 사고',
      description: '최신 기술 트렌드를 빠르게 습득하고 창의적인 솔루션을 제안합니다.'
    },
    {
      icon: '🎯',
      title: '품질 중심',
      description: '코드 품질과 성능 최적화를 통해 장기적으로 유지보수가 용이한 시스템을 구축합니다.'
    },
    {
      icon: '🤝',
      title: '소통과 협업',
      description: '클라이언트와의 원활한 소통을 통해 요구사항을 정확히 파악하고 구현합니다.'
    },
    {
      icon: '⚡',
      title: '신속한 개발',
      description: '효율적인 개발 프로세스로 빠른 프로토타이핑과 안정적인 배포를 실현합니다.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Section padding="xl" id="about-hero">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              안녕하세요, <span className="text-accent">JPEX</span>입니다
            </h1>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              5년차 풀스택 개발자로서 <span className="text-accent font-semibold">현대적이고 혁신적인 디지털 솔루션</span>을 
              제공하는 프리랜서입니다. 클라이언트의 비즈니스 성장을 위해 
              <span className="text-accent font-semibold"> 최신 기술과 창의적인 아이디어</span>로 
              최적의 결과를 만들어냅니다.
            </p>
          </div>
        </div>
      </Section>

      {/* 핵심 가치 */}
      <Section background="secondary" padding="xl">
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              핵심 가치
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              저의 개발 철학과 업무 방식을 이끌어가는 핵심 가치들입니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-background-primary p-8 rounded-2xl border border-secondary hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-2"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 기술 스택 */}
      <Section padding="xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              기술 스택
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              다양한 프로젝트 경험을 통해 축적한 기술들입니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-background-secondary p-8 rounded-2xl border border-secondary hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">{skill.icon}</div>
                  <h3 className="text-2xl font-semibold text-text-primary">
                    {skill.category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-accent/10 text-accent rounded-full hover:bg-accent/20 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="xl">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            함께 프로젝트를 시작해보세요
          </h2>
          
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            여러분의 아이디어를 현실로 만들어드리겠습니다. 
            언제든지 편하게 연락주세요!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold min-h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              연락하기
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold min-h-12 bg-transparent text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              견적 요청하기
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
}