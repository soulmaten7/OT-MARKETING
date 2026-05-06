// Supabase DB 타입 (STEP_65 블로그문자 SaaS)
// Phase 1.4 SQL 스키마와 1:1 대응

export type Profile = {
    id: string;
    username: string;
    display_name: string | null;
    phone: string | null;
    phone_private: boolean;
    created_at: string;
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
