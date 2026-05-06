-- STEP_65 Phase 1.4 + 4.2 — Supabase SQL Editor 에서 사장이 한 번 실행
-- 본 파일 = .env.local 박은 후 첫 실행 1회

-- ───────────── 1. profiles ─────────────
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  display_name text,
  phone text,
  phone_private boolean default false,
  created_at timestamptz default now()
);

-- ───────────── 2. sms_pages ─────────────
create table if not exists public.sms_pages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  slug text not null unique,
  industry text not null,
  title text not null,
  description text,
  preview_image_url text,
  pre_filled_message text,
  visit_count integer default 0,
  click_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ───────────── 3. industry_templates ─────────────
create table if not exists public.industry_templates (
  id serial primary key,
  industry_key text unique not null,
  industry_name text not null,
  default_title text,
  default_description text,
  default_message text,
  display_order integer
);

-- ───────────── 4. landing_pre_registrants ─────────────
create table if not exists public.landing_pre_registrants (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  industry text,
  expected_visitors text,
  created_at timestamptz default now()
);

-- ───────────── RLS ─────────────
alter table public.profiles enable row level security;
alter table public.sms_pages enable row level security;
alter table public.industry_templates enable row level security;
alter table public.landing_pre_registrants enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "Anyone can view profiles" on public.profiles;
create policy "Anyone can view profiles" on public.profiles
  for select using (true);

drop policy if exists "Users can manage own pages" on public.sms_pages;
create policy "Users can manage own pages" on public.sms_pages
  for all using (auth.uid() = user_id);

drop policy if exists "Anyone can view pages" on public.sms_pages;
create policy "Anyone can view pages" on public.sms_pages
  for select using (true);

drop policy if exists "Anyone can view templates" on public.industry_templates;
create policy "Anyone can view templates" on public.industry_templates
  for select using (true);

drop policy if exists "Anyone can register" on public.landing_pre_registrants;
create policy "Anyone can register" on public.landing_pre_registrants
  for insert with check (true);

-- ───────────── 14 업종 seed ─────────────
insert into public.industry_templates (industry_key, industry_name, default_title, default_description, default_message, display_order) values
('general', '일반·기타', '문자로 빠르게 답변드립니다', '궁금한 점을 남겨주세요. 빠르게 답변드립니다.', '안녕하세요, 글 보고 연락드립니다. 문의 사항이 있어 메시지 남깁니다.', 1),
('reservation', '예약·상담', '예약·상담 문의', '원하시는 날짜·시간·인원을 적어주시면 빠르게 확인드립니다.', E'안녕하세요, 예약 문의드립니다.\n· 날짜: \n· 시간: \n· 인원: ', 2),
('realestate', '부동산·중개', '매물 상담 문의', '관심 매물·예산·조건을 알려주시면 맞춤 매물 안내드립니다.', E'안녕하세요, 매물 상담 문의드립니다.\n· 관심 지역: \n· 예산: \n· 조건: ', 3),
('legal', '법률·법무', '법무 상담 문의', '사건 개요를 간단히 적어주시면 담당자가 회신드립니다.', E'안녕하세요, 법무 상담 문의드립니다.\n· 사건 종류: \n· 진행 상황: ', 4),
('tax', '세무·회계', '세무 상담 문의', '사업 형태·문의 항목을 알려주시면 답변드립니다.', E'안녕하세요, 세무 상담 문의드립니다.\n· 사업 형태: \n· 문의 항목: ', 5),
('insurance', '보험', '보험 상담 문의', '관심 보험·연령대를 알려주시면 안내드립니다.', E'안녕하세요, 보험 상담 문의드립니다.\n· 관심 보험: \n· 연령대: ', 6),
('usedcar', '중고차', '중고차 매입·판매 문의', '차종·연식·예산을 알려주시면 빠르게 답변드립니다.', E'안녕하세요, 중고차 문의드립니다.\n· 차종: \n· 연식: \n· 예산: ', 7),
('interior', '인테리어·리모델링', '인테리어 상담 문의', '평수·예산·시공 항목을 알려주시면 견적 안내드립니다.', E'안녕하세요, 인테리어 상담 문의드립니다.\n· 평수: \n· 예산: \n· 시공 항목: ', 8),
('tutor', '과외·교육', '수업 문의', '과목·학년·희망 시간을 알려주시면 안내드립니다.', E'안녕하세요, 수업 문의드립니다.\n· 과목: \n· 학년: \n· 희망 시간: ', 9),
('fitness', '헬스·PT', 'PT·등록 상담 문의', '관심 프로그램·요일을 알려주시면 안내드립니다.', E'안녕하세요, PT 상담 문의드립니다.\n· 관심 프로그램: \n· 가능 요일: ', 10),
('beauty', '미용·이용', '예약 문의', '원하시는 시술·날짜·시간을 알려주세요.', E'안녕하세요, 예약 문의드립니다.\n· 시술: \n· 날짜·시간: ', 11),
('cleaning', '청소·이사', '청소·이사 견적 문의', '평수·일정·서비스 항목을 알려주시면 견적 안내드립니다.', E'안녕하세요, 견적 문의드립니다.\n· 평수: \n· 일정: \n· 서비스: ', 12),
('recruit', '채용·구인', '채용 문의', '지원 직무·경력을 알려주시면 안내드립니다.', E'안녕하세요, 채용 문의드립니다.\n· 지원 직무: \n· 경력: ', 13),
('etc', '기타', '문의 남겨주세요', '원하시는 내용을 자유롭게 적어주세요.', '안녕하세요, 글 보고 연락드립니다.', 14)
on conflict (industry_key) do update set
  industry_name = excluded.industry_name,
  default_title = excluded.default_title,
  default_description = excluded.default_description,
  default_message = excluded.default_message,
  display_order = excluded.display_order;

-- ───────────── Storage 버킷 (Supabase 대시보드에서 manual) ─────────────
-- Storage → New bucket → name: preview-images, public: true
