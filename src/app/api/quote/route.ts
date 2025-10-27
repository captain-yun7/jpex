import { createQuote } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      description
    } = await request.json()

    // 필수 필드 검증
    if (!name || !email || !projectType) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다. (이름, 이메일, 프로젝트 유형)' },
        { status: 400 }
      )
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      )
    }

    // Neon 데이터베이스에 데이터 삽입
    const quote = await createQuote({
      name,
      email,
      phone: phone || null,
      company: company || null,
      project_type: projectType,
      budget_range: budget || null,
      timeline: timeline || null,
      requirements: description || null,
      status: 'pending'
    })

    return NextResponse.json(
      {
        message: '견적 요청이 성공적으로 접수되었습니다.',
        data: quote
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('API 오류:', error)
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}