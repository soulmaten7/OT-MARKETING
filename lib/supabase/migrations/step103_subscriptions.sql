-- STEP_103 — 토스페이먼츠 정기결제 구독 테이블
-- 실행: Supabase Dashboard > SQL Editor 에서 실행
-- 주의: 기존 profiles 테이블·RLS 변경 X (컬럼 추가만)

-- 1. subscriptions 테이블 (Option B: 별도 테이블)
CREATE TABLE IF NOT EXISTS subscriptions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    billing_key     TEXT NOT NULL,
    customer_key    TEXT NOT NULL,
    status          TEXT NOT NULL DEFAULT 'active'
                        CHECK (status IN ('active', 'past_due', 'canceled')),
    plan_name       TEXT NOT NULL DEFAULT '구독형 랜딩페이지',
    amount          INTEGER NOT NULL DEFAULT 0,
    started_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    next_billing_date TIMESTAMPTZ,
    canceled_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. user_id 인덱스
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON subscriptions(user_id);

-- 3. RLS 활성화 (구독 정보는 본인만 조회)
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
    ON subscriptions FOR SELECT
    USING (auth.uid() = user_id);

-- 서버(service_role)만 INSERT/UPDATE — 클라이언트에서 직접 수정 불가
-- API route 에서 SUPABASE_SERVICE_ROLE_KEY 사용 시 RLS 우회

-- 4. updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_subscriptions_updated_at();

-- 5. payment_logs 테이블 (결제 이력)
CREATE TABLE IF NOT EXISTS payment_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id),
    order_id        TEXT NOT NULL UNIQUE,
    order_name      TEXT NOT NULL,
    amount          INTEGER NOT NULL,
    status          TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending', 'success', 'failed')),
    toss_payment_key TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS payment_logs_user_id_idx ON payment_logs(user_id);
CREATE INDEX IF NOT EXISTS payment_logs_subscription_id_idx ON payment_logs(subscription_id);

ALTER TABLE payment_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payment logs"
    ON payment_logs FOR SELECT
    USING (auth.uid() = user_id);
