/**
 * OT MARKETING 디자인 시스템 v1 — design tokens
 * 톤 = 토스 스타일 (미니멀·신뢰)
 * 베이스 = 뉴트럴 / 포인트 = 토스 블루 #3182F6
 *
 * ⚠️ Tailwind v4 → 실제 Tailwind 유틸리티 매핑은 globals.css @theme inline 에서 관리.
 *    본 파일 = TypeScript 참조·문서화 용도. 컴포넌트 인라인 스타일·단위 테스트에서 import 가능.
 */

export const colors = {
  // 포인트 컬러 (토스 블루)
  primary: {
    50:  '#EBF3FE',
    100: '#D6E7FD',
    200: '#AECEFB',
    300: '#85B6F9',
    400: '#5C9DF7',
    500: '#3182F6',  // 메인 포인트 색
    600: '#2769C5',  // hover
    700: '#1D4F94',  // active
    800: '#143562',
    900: '#0A1B31',
  },

  // 뉴트럴 (베이스 — 토스 회색 계열)
  neutral: {
    0:   '#FFFFFF',
    50:  '#F9FAFB',  // 배경
    100: '#F2F4F6',  // 카드 배경·구분선
    200: '#E5E8EB',  // border
    300: '#D1D6DB',  // disabled border
    400: '#B0B8C1',  // placeholder
    500: '#8B95A1',  // 보조 텍스트
    600: '#6B7684',  // 본문 보조
    700: '#4E5968',  // 본문
    800: '#333D4B',  // 제목
    900: '#191F28',  // 강조 제목 (토스 다크)
  },

  // 시맨틱
  success: '#00C73C',
  warning: '#FF9500',
  error:   '#F04452',
  info:    '#3182F6',
} as const

export const typography = {
  fontFamily: {
    sans: ['Pretendard Variable', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    'display': ['40px', { lineHeight: '52px', fontWeight: '700', letterSpacing: '-0.02em' }] as [string, object],
    'h1':      ['32px', { lineHeight: '42px', fontWeight: '700', letterSpacing: '-0.02em' }] as [string, object],
    'h2':      ['24px', { lineHeight: '32px', fontWeight: '700', letterSpacing: '-0.01em' }] as [string, object],
    'h3':      ['20px', { lineHeight: '28px', fontWeight: '600' }] as [string, object],
    'body-lg': ['17px', { lineHeight: '26px', fontWeight: '400' }] as [string, object],
    'body':    ['15px', { lineHeight: '24px', fontWeight: '400' }] as [string, object],
    'caption': ['13px', { lineHeight: '18px', fontWeight: '400' }] as [string, object],
  },
} as const

// 4px 베이스 스페이싱
export const spacing = {
  xs:  '4px',
  sm:  '8px',
  md:  '16px',
  lg:  '24px',
  xl:  '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
} as const

// 토스 = 큰 라운드 (부드러움)
export const radius = {
  sm:   '8px',
  md:   '12px',
  lg:   '16px',
  xl:   '20px',
  full: '9999px',
} as const

// 토스 = 옅은 섀도 (과하지 않음)
export const shadow = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
  md: '0 4px 12px rgba(0, 0, 0, 0.06)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.08)',
} as const
