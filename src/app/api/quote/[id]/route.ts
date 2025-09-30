import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { id } = params

    // UUID 형식 검증
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 견적서 ID입니다.' },
        { status: 400 }
      )
    }

    // Supabase에서 견적서 조회
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '견적서를 찾을 수 없습니다.' },
          { status: 404 }
        )
      }
      
      console.error('Supabase 조회 오류:', error)
      return NextResponse.json(
        { error: '견적서 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: '견적서를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 요구사항이 문자열인 경우 JSON으로 파싱
    if (typeof data.requirements === 'string') {
      try {
        data.requirements = JSON.parse(data.requirements)
      } catch (parseError) {
        console.error('요구사항 파싱 오류:', parseError)
      }
    }

    // 예상 비용이 문자열인 경우 JSON으로 파싱
    if (typeof data.estimated_cost === 'string') {
      try {
        data.estimated_cost = JSON.parse(data.estimated_cost)
      } catch (parseError) {
        console.error('예상 비용 파싱 오류:', parseError)
      }
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('API 오류:', error)
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}