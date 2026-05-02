"use client";

/**
 * STEP_37 — 9 SVG 일러스트 + 라우터
 *
 * Navy (#0F172A) 배경 + Gold (#C5A572) 강조 + 흰 라인.
 * 단순 기하 도형 (사실적 X) — 변호사법 §24의2 안전.
 */

interface QuestionImageProps {
    questionId: string;
    className?: string;
}

const NAVY = "#0F172A";
const GOLD = "#C5A572";
const GOLD_DARK = "#B89B65";

function svgWrap(children: React.ReactNode) {
    return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="200" height="200" fill={NAVY} rx="12" />
            {children}
        </svg>
    );
}

// Q1: 채무 총액 — 차곡차곡 쌓인 청구서 + 위 화살표
function Q1Debt() {
    return svgWrap(
        <g>
            {/* 쌓인 청구서 */}
            <rect x="55" y="120" width="90" height="14" rx="2" fill="white" opacity="0.9" />
            <rect x="60" y="100" width="90" height="14" rx="2" fill="white" opacity="0.85" />
            <rect x="50" y="80" width="90" height="14" rx="2" fill="white" opacity="0.8" />
            <rect x="65" y="60" width="90" height="14" rx="2" fill={GOLD} />
            {/* 작은 가로선 (텍스트 표현) */}
            <line x1="60" y1="125" x2="100" y2="125" stroke={NAVY} strokeWidth="1.5" />
            <line x1="65" y1="105" x2="110" y2="105" stroke={NAVY} strokeWidth="1.5" />
            <line x1="55" y1="85" x2="100" y2="85" stroke={NAVY} strokeWidth="1.5" />
            <line x1="70" y1="65" x2="120" y2="65" stroke={NAVY} strokeWidth="1.5" />
            {/* 위 화살표 */}
            <path d="M 100 50 L 100 25" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 92 32 L 100 24 L 108 32" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* 하단 라벨 효과 (₩) */}
            <text x="100" y="160" textAnchor="middle" fill={GOLD} fontSize="14" fontWeight="700" fontFamily="system-ui">₩ 총액</text>
        </g>
    );
}

// Q2: 채무 종류 — 4 아이콘 그리드
function Q2DebtTypes() {
    return svgWrap(
        <g>
            {/* 신용카드 (왼위) */}
            <rect x="40" y="50" width="50" height="34" rx="4" fill="white" />
            <rect x="40" y="58" width="50" height="6" fill={NAVY} />
            <circle cx="80" cy="76" r="3" fill={GOLD} />
            {/* 대출 서류 (오른위) */}
            <rect x="110" y="50" width="50" height="34" rx="2" fill={GOLD} />
            <line x1="118" y1="60" x2="152" y2="60" stroke={NAVY} strokeWidth="1.5" />
            <line x1="118" y1="68" x2="148" y2="68" stroke={NAVY} strokeWidth="1.5" />
            <line x1="118" y1="76" x2="142" y2="76" stroke={NAVY} strokeWidth="1.5" />
            {/* 사채 봉투 (왼아래) */}
            <path d="M 40 116 L 90 116 L 90 150 L 40 150 Z" fill="white" />
            <path d="M 40 116 L 65 134 L 90 116" stroke={NAVY} strokeWidth="2" fill="none" />
            {/* 세금 (오른아래) */}
            <rect x="110" y="116" width="50" height="34" rx="2" fill="white" opacity="0.85" />
            <text x="135" y="140" textAnchor="middle" fill={NAVY} fontSize="14" fontWeight="800">TAX</text>
        </g>
    );
}

// Q3: 연체 기간 — 빨간 동그라미 친 달력 + 시계
function Q3Overdue() {
    return svgWrap(
        <g>
            {/* 달력 */}
            <rect x="50" y="55" width="100" height="80" rx="5" fill="white" />
            <rect x="50" y="55" width="100" height="18" rx="5" fill={GOLD} />
            <rect x="50" y="64" width="100" height="9" fill={GOLD} />
            {/* 달력 그리드 4×3 */}
            {[0, 1, 2, 3].map((c) =>
                [0, 1, 2].map((r) => {
                    const cx = 65 + c * 22;
                    const cy = 84 + r * 18;
                    const isMarked = c === 2 && r === 1;
                    return (
                        <g key={`${c}-${r}`}>
                            <text x={cx} y={cy + 4} textAnchor="middle" fill={NAVY} fontSize="9" fontWeight="600">
                                {c + r * 4 + 1}
                            </text>
                            {isMarked && <circle cx={cx} cy={cy} r="9" stroke={GOLD} strokeWidth="2.5" fill="none" />}
                        </g>
                    );
                })
            )}
            {/* 시계 */}
            <circle cx="155" cy="155" r="22" fill="white" stroke={GOLD} strokeWidth="2.5" />
            <line x1="155" y1="155" x2="155" y2="142" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
            <line x1="155" y1="155" x2="166" y2="155" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
            <circle cx="155" cy="155" r="2" fill={NAVY} />
        </g>
    );
}

// Q4: 월 소득 — 봉투 + 가게 + X
function Q4Income() {
    return svgWrap(
        <g>
            {/* 월급 봉투 (왼) */}
            <rect x="20" y="80" width="50" height="40" rx="3" fill="white" />
            <path d="M 20 80 L 45 100 L 70 80" stroke={NAVY} strokeWidth="2" fill="none" />
            <text x="45" y="110" textAnchor="middle" fill={GOLD} fontSize="9" fontWeight="700">정기</text>
            {/* 가게 (가운데) */}
            <rect x="80" y="70" width="40" height="50" fill={GOLD} />
            <polygon points="80,70 100,55 120,70" fill="white" />
            <rect x="92" y="90" width="16" height="30" fill={NAVY} />
            <text x="100" y="110" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">자영</text>
            {/* X 표시 (오른) */}
            <circle cx="155" cy="100" r="20" fill="white" />
            <line x1="143" y1="88" x2="167" y2="112" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
            <line x1="167" y1="88" x2="143" y2="112" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
            {/* 화살표 위 → 하단 */}
            <text x="100" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" opacity="0.7">소득 형태</text>
        </g>
    );
}

// Q5: 직업 형태 — 책상 / 매장 / 공장 / 빈 의자
function Q5Job() {
    return svgWrap(
        <g>
            {/* 책상 (왼위) */}
            <rect x="35" y="55" width="50" height="30" fill={GOLD} />
            <rect x="40" y="62" width="40" height="3" fill="white" />
            <line x1="55" y1="85" x2="55" y2="100" stroke={GOLD} strokeWidth="2" />
            {/* 매장 (오른위) */}
            <rect x="115" y="55" width="50" height="30" fill="white" />
            <polygon points="115,55 140,42 165,55" fill={GOLD} />
            {/* 공장 (왼아래) */}
            <rect x="35" y="125" width="50" height="35" fill="white" />
            <rect x="48" y="115" width="8" height="14" fill="white" />
            <rect x="62" y="118" width="8" height="11" fill="white" />
            {/* 빈 의자 (오른아래) */}
            <rect x="125" y="135" width="30" height="3" fill="white" />
            <line x1="128" y1="138" x2="128" y2="158" stroke="white" strokeWidth="2.5" />
            <line x1="152" y1="138" x2="152" y2="158" stroke="white" strokeWidth="2.5" />
            <rect x="128" y="125" width="3" height="13" fill="white" />
        </g>
    );
}

// Q6: 부양 가족 — 사람 실루엣 1·2·3
function Q6Family() {
    return svgWrap(
        <g>
            {/* 큰 사람 (가운데) */}
            <circle cx="100" cy="75" r="14" fill={GOLD} />
            <path d="M 78 130 Q 78 100 100 100 Q 122 100 122 130 L 122 145 L 78 145 Z" fill={GOLD} />
            {/* 중 사람 (왼) */}
            <circle cx="55" cy="100" r="10" fill="white" />
            <path d="M 40 145 Q 40 122 55 122 Q 70 122 70 145 Z" fill="white" />
            {/* 작은 사람 (오른) */}
            <circle cx="145" cy="100" r="10" fill="white" />
            <path d="M 130 145 Q 130 122 145 122 Q 160 122 160 145 Z" fill="white" />
            {/* 작은 사람 (오른 끝) */}
            <circle cx="175" cy="118" r="7" fill="white" opacity="0.6" />
            <path d="M 165 145 Q 165 130 175 130 Q 185 130 185 145 Z" fill="white" opacity="0.6" />
            {/* 라벨 */}
            <text x="100" y="170" textAnchor="middle" fill={GOLD} fontSize="11" fontWeight="700">부양가족</text>
        </g>
    );
}

// Q7: 추심 진행 — 통지서 + 전화 + 법원 인장
function Q7Collection() {
    return svgWrap(
        <g>
            {/* 빨간 통지서 (위) */}
            <rect x="55" y="40" width="90" height="55" rx="3" fill="white" />
            <rect x="55" y="40" width="90" height="14" fill={GOLD} />
            <text x="100" y="51" textAnchor="middle" fill={NAVY} fontSize="10" fontWeight="800">통지서</text>
            <line x1="65" y1="65" x2="135" y2="65" stroke={NAVY} strokeWidth="1.5" />
            <line x1="65" y1="73" x2="125" y2="73" stroke={NAVY} strokeWidth="1.5" />
            <line x1="65" y1="81" x2="130" y2="81" stroke={NAVY} strokeWidth="1.5" />
            {/* 전화 아이콘 (왼아래) */}
            <circle cx="55" cy="135" r="22" fill={GOLD} />
            <path d="M 47 125 Q 47 132 55 138 Q 63 144 63 150 L 60 153 Q 50 153 42 145 Q 36 137 36 130 L 39 127 Q 47 125 47 125 Z" fill={NAVY} />
            {/* 법원 인장 (오른아래) */}
            <circle cx="145" cy="135" r="22" fill="white" stroke={GOLD} strokeWidth="2" />
            <text x="145" y="142" textAnchor="middle" fill={NAVY} fontSize="14" fontWeight="800">院</text>
        </g>
    );
}

// Q8: 보유 자산 — 집/차/통장/빈 박스
function Q8Assets() {
    return svgWrap(
        <g>
            {/* 집 (왼위) */}
            <polygon points="55,55 85,40 115,55 115,85 55,85" fill="white" />
            <rect x="76" y="65" width="18" height="20" fill={NAVY} />
            <polygon points="55,55 85,40 115,55" fill={GOLD} />
            {/* 차 (오른위) */}
            <rect x="125" y="55" width="60" height="22" rx="6" fill={GOLD} />
            <rect x="135" y="62" width="40" height="9" fill="white" />
            <circle cx="138" cy="80" r="4" fill="white" />
            <circle cx="172" cy="80" r="4" fill="white" />
            {/* 통장 (왼아래) */}
            <rect x="40" y="115" width="60" height="40" rx="3" fill="white" />
            <rect x="40" y="115" width="60" height="9" fill={GOLD} />
            <line x1="48" y1="132" x2="92" y2="132" stroke={NAVY} strokeWidth="1.5" />
            <line x1="48" y1="140" x2="78" y2="140" stroke={NAVY} strokeWidth="1.5" />
            <text x="70" y="150" fontSize="9" fill={NAVY} fontWeight="700">예금</text>
            {/* 빈 박스 (오른아래) */}
            <rect x="125" y="120" width="50" height="35" rx="2" stroke={GOLD} strokeWidth="2.5" fill="none" strokeDasharray="3 3" />
            <text x="150" y="142" textAnchor="middle" fill={GOLD} fontSize="10" fontWeight="700">없음</text>
        </g>
    );
}

// Q9: 회생·파산 이력 — 결정문 + 도장 + 시계
function Q9History() {
    return svgWrap(
        <g>
            {/* 결정문 (메인) */}
            <rect x="50" y="40" width="100" height="120" rx="3" fill="white" />
            <rect x="50" y="40" width="100" height="22" fill={NAVY} />
            <text x="100" y="55" textAnchor="middle" fill={GOLD} fontSize="11" fontWeight="800">결정문</text>
            <line x1="60" y1="75" x2="140" y2="75" stroke={NAVY} strokeWidth="1.5" />
            <line x1="60" y1="85" x2="135" y2="85" stroke={NAVY} strokeWidth="1.5" />
            <line x1="60" y1="95" x2="138" y2="95" stroke={NAVY} strokeWidth="1.5" />
            <line x1="60" y1="105" x2="125" y2="105" stroke={NAVY} strokeWidth="1.5" />
            {/* 도장 (오른 하단) */}
            <circle cx="130" cy="135" r="18" fill={GOLD} opacity="0.85" />
            <circle cx="130" cy="135" r="14" fill="none" stroke={NAVY} strokeWidth="2" />
            <text x="130" y="140" textAnchor="middle" fill={NAVY} fontSize="11" fontWeight="800">印</text>
            {/* 시계 (왼 하단 외부) */}
            <circle cx="35" cy="155" r="14" fill="white" opacity="0.85" />
            <line x1="35" y1="155" x2="35" y2="146" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
            <line x1="35" y1="155" x2="42" y2="155" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
        </g>
    );
}

const ILLUSTRATIONS: Record<string, () => React.ReactElement> = {
    debt: Q1Debt,
    debt_types: Q2DebtTypes,
    overdue: Q3Overdue,
    income: Q4Income,
    job: Q5Job,
    family: Q6Family,
    collection: Q7Collection,
    assets: Q8Assets,
    history: Q9History,
};

export function QuestionImage({ questionId, className = "" }: QuestionImageProps) {
    const Illustration = ILLUSTRATIONS[questionId];
    if (!Illustration) {
        // Fallback: 빈 SVG (Navy 배경)
        return (
            <div className={className} aria-hidden="true">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="200" fill={NAVY} rx="12" />
                    <circle cx="100" cy="100" r="24" fill={GOLD} opacity="0.4" />
                </svg>
            </div>
        );
    }
    return <div className={className}>{Illustration()}</div>;
}

export const ILLUSTRATION_KEYS = Object.keys(ILLUSTRATIONS);
