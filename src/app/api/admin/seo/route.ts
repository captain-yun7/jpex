import { NextRequest, NextResponse } from 'next/server';
import { getSeoSettings, upsertSeoSettings, type SeoSettings } from '@/lib/db';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';

/**
 * Authorization 헤더의 관리자 토큰 검증
 * 토큰 형식: base64(username:timestamp:jpex_admin_token)
 */
function isAuthorized(request: NextRequest): boolean {
  const header = request.headers.get('authorization') || '';
  const token = header.replace(/^Bearer\s+/i, '').trim();
  if (!token) return false;

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [username, , marker] = decoded.split(':');
    return username === ADMIN_USERNAME && marker === 'jpex_admin_token';
  } catch {
    return false;
  }
}

/**
 * SEO 설정 조회
 */
export async function GET() {
  try {
    const settings = await getSeoSettings();
    return NextResponse.json({ data: settings });
  } catch (error) {
    console.error('SEO 설정 조회 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * SEO 설정 저장
 */
export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: '인증이 필요합니다.' },
      { status: 401 }
    );
  }

  try {
    const body = (await request.json()) as SeoSettings;
    const saved = await upsertSeoSettings({
      site_title: body.site_title,
      site_description: body.site_description,
      keywords: body.keywords,
      og_image: body.og_image,
      google_verification: body.google_verification,
      naver_verification: body.naver_verification,
      bing_verification: body.bing_verification,
    });

    return NextResponse.json({ data: saved, message: '저장되었습니다.' });
  } catch (error) {
    console.error('SEO 설정 저장 오류:', error);
    return NextResponse.json(
      { error: '저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
