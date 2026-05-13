/**
 * Process 페이지 — 노트폴리오 톤
 */

import { Layout } from '@/components/layout';
import Link from 'next/link';

const steps = [
  {
    step: '01',
    title: '상담 & 분석',
    duration: '1-3일',
    description: '프로젝트 목표와 요구사항을 상세히 파악합니다.',
    details: [
      '무료 초기 상담 (온라인/오프라인)',
      '비즈니스 목표 및 타겟 분석',
      '기술적 요구사항 정의',
      '예산 및 일정 협의',
    ],
  },
  {
    step: '02',
    title: '제안 & 계약',
    duration: '2-5일',
    description: '최적의 솔루션과 견적을 제안드립니다.',
    details: [
      '기술 스택 및 아키텍처 제안',
      '상세 견적서 제공',
      '개발 일정 수립',
      '계약서 작성 및 착수금 (40%)',
    ],
  },
  {
    step: '03',
    title: '설계 & 기획',
    duration: '3-7일',
    description: '프로젝트의 청사진을 구체화합니다.',
    details: [
      'UI/UX 와이어프레임 제작',
      '데이터베이스 스키마 설계',
      'API 명세서 작성',
      '기능 명세서 확정',
    ],
  },
  {
    step: '04',
    title: '개발 & 구현',
    duration: '2-8주',
    description: '본격적인 개발이 진행됩니다.',
    details: [
      '애자일 방식의 반복 개발',
      '주간 단위 진행상황 공유',
      '중간 결과물 검토 및 피드백',
      '지속적인 소통 및 개선',
    ],
  },
  {
    step: '05',
    title: '테스트 & 수정',
    duration: '1-2주',
    description: '완벽한 품질을 위한 검증 단계입니다.',
    details: [
      '기능 테스트 및 버그 수정',
      '크로스 브라우저 & 디바이스 테스트',
      '성능 최적화',
      '고객 UAT (사용자 승인 테스트)',
    ],
  },
  {
    step: '06',
    title: '배포 & 런칭',
    duration: '2-5일',
    description: '프로젝트를 세상에 공개합니다.',
    details: [
      '프로덕션 환경 배포',
      '도메인 연결 및 SSL 인증서',
      '모니터링 시스템 구축',
      '잔금 (60%) 및 인수인계',
    ],
  },
  {
    step: '07',
    title: '유지보수',
    duration: '지속적',
    description: '안정적인 서비스 운영을 지원합니다.',
    details: [
      '1-3개월 무상 유지보수',
      '긴급 버그 수정',
      '성능 모니터링',
      '기능 개선 및 업데이트 협의',
    ],
  },
];

const payment = [
  { stage: '착수금', amount: '40%', timing: '계약 체결 시' },
  { stage: '잔금', amount: '60%', timing: '프로젝트 완료 및 배포 후' },
];

export default function Process() {
  return (
    <Layout>
      {/* 인트로 */}
      <section className="container mx-auto pt-20 lg:pt-32 pb-16 lg:pb-20">
        <p className="inline-flex items-center gap-2 font-display text-[12.5px] font-semibold tracking-[0.25em] text-ink uppercase mb-7"><span className="inline-block w-1.5 h-1.5 rounded-full bg-accent align-middle" /> 
          Process
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-[52px] font-semibold text-ink leading-[1.2] tracking-tight max-w-4xl">
          프로젝트는 <span className="text-accent-underline">7단계</span>로 진행됩니다.
        </h1>
        <p className="text-[16.5px] text-ink-muted mt-8 max-w-2xl leading-relaxed">
          체계적이고 투명한 프로세스로 프로젝트의 성공을 보장합니다.
        </p>
      </section>

      {/* 단계 */}
      <section className="border-t border-line">
        <div className="container mx-auto">
          {steps.map((s) => (
            <article
              key={s.step}
              className="grid grid-cols-1 lg:grid-cols-[140px_280px_1fr] gap-6 lg:gap-16 py-14 lg:py-16 border-b border-line"
            >
              <div className="text-[44px] lg:text-[48px] font-semibold text-accent leading-none tabular-nums">
                {s.step}
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-ink">{s.title}</h2>
                <p className="text-[13px] text-ink-subtle mt-2 tracking-wide">
                  소요기간 · {s.duration}
                </p>
                <p className="text-[15.5px] text-ink-muted mt-5 leading-relaxed">
                  {s.description}
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10 self-center">
                {s.details.map((d) => (
                  <li
                    key={d}
                    className="text-[15px] text-ink-muted flex items-start gap-3"
                  >
                    <span className="mt-[9px] w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 결제 구조 */}
      <section className="border-t border-line bg-surface-alt">
        <div className="container mx-auto py-20 lg:py-24">
          <p className="text-[12.5px] font-semibold tracking-[0.2em] text-ink-subtle uppercase mb-10">
            Payment
          </p>
          <h2 className="text-xl md:text-2xl font-semibold text-ink mb-2">
            단계별 분할 결제로 안전하게.
          </h2>
          <p className="text-[15.5px] text-ink-muted mb-8 max-w-xl">
            착수금과 잔금으로 나누어 부담을 줄이고 신뢰를 쌓습니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line max-w-3xl">
            {payment.map((p) => (
              <div key={p.stage} className="bg-surface p-8">
                <div className="text-[40px] font-semibold text-ink leading-none tabular-nums">
                  {p.amount}
                </div>
                <h4 className="text-[16.5px] font-medium text-ink mt-3">{p.stage}</h4>
                <p className="text-[14.5px] text-ink-muted mt-1">{p.timing}</p>
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
              프로젝트를 시작하세요.
            </h2>
            <p className="text-[15.5px] text-ink-muted mt-2">
              명확한 프로세스와 투명한 커뮤니케이션으로 함께합니다.
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
