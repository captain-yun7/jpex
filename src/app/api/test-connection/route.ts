import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Neon 연결 테스트 - 간단한 쿼리 실행
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`

    return NextResponse.json({
      success: true,
      message: 'Neon 데이터베이스 연결 성공!',
      data: {
        currentTime: result[0].current_time,
        postgresVersion: result[0].pg_version
      }
    })

  } catch (error) {
    console.error('API 오류:', error)
    return NextResponse.json(
      {
        success: false,
        error: '데이터베이스 연결 실패',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}