import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const {
      name,
      email,
      company,
      projectType,
      projectScope,
      budgetRange,
      timeline,
      requirements,
      estimatedCost,
      complexityScore,
      urgencyMultiplier
    } = await request.json()

    // 필수 필드 검증
    if (!name || !email || !projectType || !projectScope || !budgetRange || !timeline || !requirements) {
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

    // Supabase에 데이터 삽입
    const { data, error } = await supabase
      .from('quotes')
      .insert([
        {
          name,
          email,
          company: company || null,
          project_type: projectType,
          project_scope: projectScope,
          budget_range: budgetRange,
          timeline,
          requirements,
          estimated_cost: estimatedCost || null,
          complexity_score: complexityScore || 1,
          urgency_multiplier: urgencyMultiplier || 1.0,
          status: 'pending'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase 삽입 오류:', error)
      return NextResponse.json(
        { error: '견적 요청 접수 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: '견적 요청이 성공적으로 접수되었습니다.',
        data: data[0]
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