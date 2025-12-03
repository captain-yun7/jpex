import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface StaticContract {
  id: string;
  filename: string;
  title: string;
  date: string;
  url: string;
}

/**
 * 정적 HTML 계약서 목록 조회
 */
export async function GET() {
  try {
    const contractsDir = path.join(process.cwd(), 'public', 'contracts');

    // 디렉토리가 없으면 빈 배열 반환
    if (!fs.existsSync(contractsDir)) {
      return NextResponse.json({ data: [] });
    }

    const files = fs.readdirSync(contractsDir);
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    const contracts: StaticContract[] = htmlFiles.map(filename => {
      // 파일명에서 정보 추출: 20251203_더젠웹사이트_계약서.html
      const nameWithoutExt = filename.replace('.html', '');
      const parts = nameWithoutExt.split('_');

      let date = '';
      let title = nameWithoutExt;

      // 날짜 형식 확인 (YYYYMMDD)
      if (parts[0] && /^\d{8}$/.test(parts[0])) {
        const dateStr = parts[0];
        date = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
        title = parts.slice(1).join(' ').replace(/_/g, ' ');
      }

      return {
        id: `static_${filename}`,
        filename,
        title: title || filename,
        date,
        url: `/contracts/${filename}`
      };
    });

    // 날짜 기준 내림차순 정렬
    contracts.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.localeCompare(a.date);
    });

    return NextResponse.json({ data: contracts });
  } catch (error) {
    console.error('정적 계약서 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
