-- STEP_106 — 구독형 랜딩페이지 테이블
-- 실행: Supabase Dashboard > SQL Editor
-- 프로젝트: khlefiktflynjcfsxnoa (ot-marketing.kr)

CREATE TABLE IF NOT EXISTS landing_pages (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    slug             TEXT NOT NULL UNIQUE,           -- otpage1.com/{slug} 발행 주소
    industry         TEXT NOT NULL,                 -- debt / rental / broadband / invest / realestate / medical
    title            TEXT NOT NULL,                 -- 관리용 LP 제목
    status           TEXT NOT NULL DEFAULT 'draft'
                         CHECK (status IN ('draft', 'published', 'paused')),
    config           JSONB NOT NULL DEFAULT '{}',    -- placeholder swap 값 (브랜드명·질문·옵션·카피 등)
    submission_count INTEGER NOT NULL DEFAULT 0,    -- 신청 수 (통계)
    published_at     TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS landing_pages_user_id_idx ON landing_pages(user_id);
CREATE INDEX IF NOT EXISTS landing_pages_slug_idx ON landing_pages(slug);
CREATE INDEX IF NOT EXISTS landing_pages_status_idx ON landing_pages(status);

ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own landing pages"
    ON landing_pages FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own landing pages"
    ON landing_pages FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own landing pages"
    ON landing_pages FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own landing pages"
    ON landing_pages FOR DELETE USING (auth.uid() = user_id);

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_landing_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER landing_pages_updated_at
    BEFORE UPDATE ON landing_pages
    FOR EACH ROW EXECUTE FUNCTION update_landing_pages_updated_at();
