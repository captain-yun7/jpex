/**
 * 관리자 SEO 설정 페이지
 * 사이트 전역 메타데이터 + 검색엔진 인증코드 수동 관리
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layout, Section } from '@/components/layout';
import { motion } from 'framer-motion';

interface SeoForm {
  site_title: string;
  site_description: string;
  keywords: string;
  og_image: string;
  google_verification: string;
  naver_verification: string;
  bing_verification: string;
}

const EMPTY: SeoForm = {
  site_title: '',
  site_description: '',
  keywords: '',
  og_image: '',
  google_verification: '',
  naver_verification: '',
  bing_verification: '',
};

const FIELDS: {
  key: keyof SeoForm;
  label: string;
  hint: string;
  type: 'input' | 'textarea';
  placeholder?: string;
}[] = [
  {
    key: 'site_title',
    label: '사이트 기본 제목',
    hint: '검색 결과·브라우저 탭에 노출되는 기본 title (미입력 시 코드 기본값 사용)',
    type: 'input',
    placeholder: 'JpexStudio - 홈페이지 제작 & AI 솔루션 개발',
  },
  {
    key: 'site_description',
    label: '사이트 설명 (description)',
    hint: '검색 결과 본문에 노출. 120~160자 권장',
    type: 'textarea',
    placeholder: '회사·병원·쇼핑몰 홈페이지 제작부터 AI 솔루션 개발까지...',
  },
  {
    key: 'keywords',
    label: '키워드',
    hint: '쉼표(,)로 구분',
    type: 'textarea',
    placeholder: '홈페이지 제작, 웹사이트 제작, AI 솔루션 개발',
  },
  {
    key: 'og_image',
    label: 'OG 대표 이미지 URL',
    hint: 'SNS 공유 시 표시되는 이미지 (1200×630 권장)',
    type: 'input',
    placeholder: '/images/og-image.jpg 또는 전체 URL',
  },
  {
    key: 'google_verification',
    label: '구글 서치콘솔 인증코드',
    hint: 'google-site-verification 메타태그의 content 값',
    type: 'input',
    placeholder: 'abc123...',
  },
  {
    key: 'naver_verification',
    label: '네이버 웹마스터 인증코드',
    hint: 'naver-site-verification 메타태그의 content 값',
    type: 'input',
    placeholder: 'abc123...',
  },
  {
    key: 'bing_verification',
    label: 'Bing 웹마스터 인증코드',
    hint: 'msvalidate.01 메타태그의 content 값',
    type: 'input',
    placeholder: 'abc123...',
  },
];

export default function AdminSeoPage() {
  const router = useRouter();
  const [form, setForm] = useState<SeoForm>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_session');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);

    (async () => {
      try {
        const res = await fetch('/api/admin/seo');
        const result = await res.json();
        if (!res.ok) throw new Error(result.error);
        if (result.data) {
          setForm({
            site_title: result.data.site_title ?? '',
            site_description: result.data.site_description ?? '',
            keywords: result.data.keywords ?? '',
            og_image: result.data.og_image ?? '',
            google_verification: result.data.google_verification ?? '',
            naver_verification: result.data.naver_verification ?? '',
            bing_verification: result.data.bing_verification ?? '',
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '설정을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('admin_session') || '';
      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setMessage('저장되었습니다. 사이트 메타데이터에 최대 1시간 내 반영됩니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-green transition-colors';

  if (loading || !isAuthenticated) {
    return (
      <Layout>
        <Section padding="xl">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto mb-4"></div>
            <p className="text-gray-400">로딩 중...</p>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section padding="xl">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/admin"
              className="text-sm text-gray-400 hover:text-green transition-colors"
            >
              ← 대시보드
            </Link>
            <h1 className="text-4xl lg:text-5xl font-black text-white mt-4 mb-3">
              SEO <span className="text-green">설정</span>
            </h1>
            <p className="text-lg text-gray-400">
              사이트 전역 메타데이터와 검색엔진 인증코드를 관리합니다.
            </p>
          </motion.div>

          {error && (
            <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          )}
          {message && (
            <div className="bg-green/10 border-2 border-green/30 rounded-xl p-4 mb-6">
              <p className="text-green font-medium">{message}</p>
            </div>
          )}

          <motion.form
            onSubmit={handleSave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black-light border-2 border-gray-800 rounded-xl p-6 lg:p-8 space-y-6"
          >
            {FIELDS.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-bold text-white mb-1">
                  {field.label}
                </label>
                <p className="text-xs text-gray-500 mb-2">{field.hint}</p>
                {field.type === 'textarea' ? (
                  <textarea
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    rows={3}
                    className={inputClass}
                  />
                ) : (
                  <input
                    type="text"
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    className={inputClass}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={saving}
              className="w-full px-6 py-3 bg-green text-black font-bold rounded-lg hover:bg-green-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? '저장 중...' : '저장하기'}
            </button>
          </motion.form>
        </div>
      </Section>
    </Layout>
  );
}
