import { createInquiry } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, projectType, message } = await request.json()

    // 필수 필드 검증
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
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
    const inquiry = await createInquiry({
      name,
      email,
      phone: phone || null,
      company: company || null,
      project_type: projectType,
      message,
      status: 'new'
    })

    return NextResponse.json(
      {
        message: '문의사항이 성공적으로 접수되었습니다.',
        data: inquiry
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