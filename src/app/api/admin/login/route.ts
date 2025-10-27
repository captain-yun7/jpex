import { NextRequest, NextResponse } from 'next/server';

// 하드코딩된 관리자 계정
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'jpex2024!',
};

// 간단한 토큰 생성 (실제로는 JWT 등을 사용하는 것이 좋지만, 하드코딩으로 간단하게)
function generateToken(username: string): string {
  const timestamp = Date.now();
  return Buffer.from(`${username}:${timestamp}:jpex_admin_token`).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 입력값 검증
    if (!username || !password) {
      return NextResponse.json(
        { error: '아이디와 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 계정 확인
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // 로그인 성공
      const token = generateToken(username);

      return NextResponse.json({
        success: true,
        token,
        message: '로그인 성공',
      });
    } else {
      // 로그인 실패
      return NextResponse.json(
        { error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: '로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
