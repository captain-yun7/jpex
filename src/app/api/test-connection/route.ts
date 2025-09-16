import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Supabase 연결 테스트
    const { data, error } = await supabase
      .from('inquiries')
      .select('count')
      .single()
    
    if (error && error.code !== 'PGRST116') {
      // PGRST116은 행이 없을 때 발생하는 에러이므로 무시
      console.error('Supabase 연결 오류:', error)
      return NextResponse.json(
        { 
          success: false,
          error: error.message,
          details: error
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase 연결 성공!',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
    })
    
  } catch (error) {
    console.error('API 오류:', error)
    return NextResponse.json(
      { 
        success: false,
        error: '서버 내부 오류가 발생했습니다.',
        details: error
      },
      { status: 500 }
    )
  }
}