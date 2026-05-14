// Supabase DB 타입 (STEP_65 블로그문자 SaaS)
// Phase 1.4 SQL 스키마와 1:1 대응

export type Profile = {
    id: string;
    username: string;
    display_name: string | null;
    phone: string | null;
    phone_private: boolean;
    created_at: string;
    // STEP_96 — 3 기능 구독 상태 (step96_profiles_extend.sql)
    landing_subscription_status: "none" | "active" | "past_due" | "canceled";
    landing_subscription_plan: string | null;
    landing_subscription_started_at: string | null;
    blog_sms_enabled: boolean;
    cpa_inquiry_status: "none" | "inquired" | "contracted";
};

export type SmsPage = {
    id: string;
    user_id: string;
    slug: string;
    industry: string;
    title: string;
    description: string | null;
    preview_image_url: string | null;
    pre_filled_message: string | null;
    visit_count: number;
    click_count: number;
    created_at: string;
    updated_at: string;
};

export type IndustryTemplate = {
    id: number;
    industry_key: string;
    industry_name: string;
    default_title: string | null;
    default_description: string | null;
    default_message: string | null;
    display_order: number;
};

// STEP_106 — 구독형 랜딩페이지 테이블 타입
export type LandingPage = {
    id: string;
    user_id: string;
    slug: string;
    industry: string;
    title: string;
    status: "draft" | "published" | "paused";
    config: Record<string, unknown>;
    submission_count: number;
    published_at: string | null;
    created_at: string;
    updated_at: string;
};

export type Subscription = {
    id: string;
    user_id: string;
    billing_key: string;
    customer_key: string;
    status: "active" | "past_due" | "canceled";
    plan_name: string;
    amount: number;
    started_at: string;
    next_billing_date: string | null;
    canceled_at: string | null;
    created_at: string;
    updated_at: string;
};

export type PaymentLog = {
    id: string;
    user_id: string;
    subscription_id: string | null;
    order_id: string;
    order_name: string;
    amount: number;
    status: "pending" | "success" | "failed";
    toss_payment_key: string | null;
    created_at: string;
};

export type LandingPreRegistrant = {
    id: string;
    email: string;
    industry: string | null;
    expected_visitors: string | null;
    created_at: string;
};

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: Profile;
                Insert: Omit<Profile, "created_at"> & { created_at?: string };
                Update: Partial<Profile>;
            };
            sms_pages: {
                Row: SmsPage;
                Insert: Omit<SmsPage, "id" | "created_at" | "updated_at" | "visit_count" | "click_count"> & {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                    visit_count?: number;
                    click_count?: number;
                };
                Update: Partial<SmsPage>;
            };
            industry_templates: {
                Row: IndustryTemplate;
                Insert: Omit<IndustryTemplate, "id"> & { id?: number };
                Update: Partial<IndustryTemplate>;
            };
            landing_pre_registrants: {
                Row: LandingPreRegistrant;
                Insert: Omit<LandingPreRegistrant, "id" | "created_at"> & {
                    id?: string;
                    created_at?: string;
                };
                Update: Partial<LandingPreRegistrant>;
            };
        };
    };
};
