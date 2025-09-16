-- RLS 정책 수정 (누구나 읽고 쓸 수 있도록)

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Inquiries are insertable by everyone" ON inquiries;
DROP POLICY IF EXISTS "Quotes are insertable by everyone" ON quotes;

-- 새로운 정책 생성 (모든 작업 허용)
CREATE POLICY "Enable all for inquiries" ON inquiries
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all for quotes" ON quotes
    FOR ALL USING (true) WITH CHECK (true);

-- 또는 RLS를 완전히 비활성화 (개발 단계에서만)
ALTER TABLE inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE quotes DISABLE ROW LEVEL SECURITY;