-- STEP_96 profiles 스키마 확장 (3 기능 구독 상태)
-- 안전: 컬럼 추가만 (테이블 삭제·RLS 변경 없음)

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS landing_subscription_status text DEFAULT 'none',
    ADD COLUMN IF NOT EXISTS landing_subscription_plan text,
    ADD COLUMN IF NOT EXISTS landing_subscription_started_at timestamptz,
    ADD COLUMN IF NOT EXISTS blog_sms_enabled boolean DEFAULT true,
    ADD COLUMN IF NOT EXISTS cpa_inquiry_status text DEFAULT 'none';

-- landing_subscription_status: 'none' | 'active' | 'past_due' | 'canceled'
-- blog_sms_enabled: true (무료, 가입 시 자동)
-- cpa_inquiry_status: 'none' | 'inquired' | 'contracted'
-- landing_subscription_plan: 요금제명 (nullable, STEP_101 에서 확정)
-- landing_subscription_started_at: 구독 시작일 (nullable)

-- 기존 rows backfill (기존 블로그문자 유저 = blog_sms_enabled true)
UPDATE profiles
    SET blog_sms_enabled = true,
        landing_subscription_status = COALESCE(landing_subscription_status, 'none'),
        cpa_inquiry_status = COALESCE(cpa_inquiry_status, 'none')
    WHERE blog_sms_enabled IS NULL
       OR landing_subscription_status IS NULL
       OR cpa_inquiry_status IS NULL;
