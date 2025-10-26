/**
 * Process 페이지
 * JPEX 프로젝트 진행 프로세스
 */

'use client';

import { Layout, Section } from '@/components/layout';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Process() {
  const processSteps = [
    {
      step: '01',
      title: '상담 & 분석',
      duration: '1-3일',
      description: '프로젝트 목표와 요구사항을 상세히 파악합니다',
      details: [
        '무료 초기 상담 (온라인/오프라인)',
        '비즈니스 목표 및 타겟 분석',
        '기술적 요구사항 정의',
        '예산 및 일정 협의'
      ],
      icon: '💬'
    },
    {
      step: '02',
      title: '제안 & 계약',
      duration: '2-5일',
      description: '최적의 솔루션과 견적을 제안드립니다',
      details: [
        '기술 스택 및 아키텍처 제안',
        '상세 견적서 제공',
        '개발 일정 수립',
        '계약서 작성 및 착수금 (40%)'
      ],
      icon: '📋'
    },
    {
      step: '03',
      title: '설계 & 기획',
      duration: '3-7일',
      description: '프로젝트의 청사진을 구체화합니다',
      details: [
        'UI/UX 와이어프레임 제작',
        '데이터베이스 스키마 설계',
        'API 명세서 작성',
        '기능 명세서 확정'
      ],
      icon: '🎨'
    },
    {
      step: '04',
      title: '개발 & 구현',
      duration: '2-8주',
      description: '본격적인 개발이 진행됩니다',
      details: [
        '애자일 방식의 반복 개발',
        '주간 단위 진행상황 공유',
        '중간 결과물 검토 및 피드백',
        '지속적인 소통 및 개선'
      ],
      icon: '⚡'
    },
    {
      step: '05',
      title: '테스트 & 수정',
      duration: '1-2주',
      description: '완벽한 품질을 위한 검증 단계',
      details: [
        '기능 테스트 및 버그 수정',
        '크로스 브라우저 & 디바이스 테스트',
        '성능 최적화',
        '고객 UAT (사용자 승인 테스트)'
      ],
      icon: '🔍'
    },
    {
      step: '06',
      title: '배포 & 런칭',
      duration: '2-5일',
      description: '프로젝트를 세상에 공개합니다',
      details: [
        '프로덕션 환경 배포',
        '도메인 연결 및 SSL 인증서',
        '모니터링 시스템 구축',
        '잔금 (60%) 및 프로젝트 인수인계'
      ],
      icon: '🚀'
    },
    {
      step: '07',
      title: '유지보수',
      duration: '지속적',
      description: '안정적인 서비스 운영을 지원합니다',
      details: [
        '1-3개월 무상 유지보수',
        '긴급 버그 수정',
        '성능 모니터링',
        '기능 개선 및 업데이트 협의'
      ],
      icon: '🛠️'
    }
  ];

  const payment = [
    { stage: '착수금', amount: '40%', timing: '계약 체결 시' },
    { stage: '잔금', amount: '60%', timing: '프로젝트 완료 및 배포 후' }
  ];

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
            진행 <span className="text-green">프로세스</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            체계적이고 투명한 프로세스로<br />
            프로젝트의 성공을 보장합니다
          </p>
        </motion.div>
      </Section>

      {/* Process Steps */}
      <Section background="secondary" padding="xl">
        <div className="max-w-5xl mx-auto space-y-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group bg-black-light p-6 lg:p-8 rounded-2xl border-2 border-gray-800 hover:border-green transition-all duration-300 hover:shadow-glow-green-sm">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left: Step Number & Icon */}
                  <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:gap-3 lg:min-w-[120px]">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green/10 rounded-2xl flex items-center justify-center border-2 border-green/30 group-hover:border-green group-hover:bg-green/20 transition-all duration-300">
                      <span className="text-2xl lg:text-3xl font-black text-green">{step.step}</span>
                    </div>
                    <div className="text-4xl lg:text-5xl">{step.icon}</div>
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-green transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 text-lg">
                      {step.description}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-500">
                          <span className="text-green mt-1">✓</span>
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Payment Structure */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
              결제 <span className="text-green">구조</span>
            </h2>
            <p className="text-gray-400 text-lg">
              단계별 분할 결제로 부담을 줄이고 안전하게 진행합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {payment.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black-light p-6 rounded-xl border-2 border-gray-800 hover:border-green transition-all duration-300 text-center space-y-3"
              >
                <div className="text-5xl font-black text-green">
                  {item.amount}
                </div>
                <h4 className="text-xl font-bold text-white">
                  {item.stage}
                </h4>
                <p className="text-gray-500 text-sm">
                  {item.timing}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="secondary" padding="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
            프로젝트를 <span className="text-green">시작</span>하세요
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            명확한 프로세스와 투명한 커뮤니케이션으로<br />
            성공적인 프로젝트를 함께 만들어갑니다
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
        </motion.div>
      </Section>
    </Layout>
  );
}
