"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@/components/ui/Modal"
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/ui/Section"

const ColorSwatch = ({ name, hex, className }: { name: string; hex: string; className: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className={`w-10 h-10 rounded-lg ${className}`} title={hex} />
    <span className="text-[10px] text-neutral-500 font-mono">{name}</span>
    <span className="text-[10px] text-neutral-400 font-mono">{hex}</span>
  </div>
)

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-5xl mx-auto px-6 space-y-16">

        {/* 헤더 */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">OT MARKETING 디자인 시스템 v1</h1>
          <p className="mt-2 text-neutral-500">토스 스타일 · 뉴트럴 베이스 · 토스 블루 포인트</p>
          <div className="mt-4 flex gap-2">
            <Badge variant="primary">v1.0.0</Badge>
            <Badge variant="success">Tailwind v4</Badge>
            <Badge variant="neutral">Pretendard</Badge>
          </div>
        </div>

        {/* ── 컬러 팔레트 ─────────────────────────────────── */}
        <section id="color">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">컬러 팔레트 (Color)</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">Primary (토스 블루)</h3>
              <div className="flex gap-3 flex-wrap">
                <ColorSwatch name="50"  hex="#EBF3FE" className="bg-primary-50  border border-neutral-200" />
                <ColorSwatch name="100" hex="#D6E7FD" className="bg-primary-100" />
                <ColorSwatch name="200" hex="#AECEFB" className="bg-primary-200" />
                <ColorSwatch name="300" hex="#85B6F9" className="bg-primary-300" />
                <ColorSwatch name="400" hex="#5C9DF7" className="bg-primary-400" />
                <ColorSwatch name="500" hex="#3182F6" className="bg-primary-500" />
                <ColorSwatch name="600" hex="#2769C5" className="bg-primary-600" />
                <ColorSwatch name="700" hex="#1D4F94" className="bg-primary-700" />
                <ColorSwatch name="800" hex="#143562" className="bg-primary-800" />
                <ColorSwatch name="900" hex="#0A1B31" className="bg-primary-900" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">Neutral (뉴트럴)</h3>
              <div className="flex gap-3 flex-wrap">
                <ColorSwatch name="50"  hex="#F9FAFB" className="bg-neutral-50  border border-neutral-200" />
                <ColorSwatch name="100" hex="#F2F4F6" className="bg-neutral-100" />
                <ColorSwatch name="200" hex="#E5E8EB" className="bg-neutral-200" />
                <ColorSwatch name="300" hex="#D1D6DB" className="bg-neutral-300" />
                <ColorSwatch name="400" hex="#B0B8C1" className="bg-neutral-400" />
                <ColorSwatch name="500" hex="#8B95A1" className="bg-neutral-500" />
                <ColorSwatch name="600" hex="#6B7684" className="bg-neutral-600" />
                <ColorSwatch name="700" hex="#4E5968" className="bg-neutral-700" />
                <ColorSwatch name="800" hex="#333D4B" className="bg-neutral-800" />
                <ColorSwatch name="900" hex="#191F28" className="bg-neutral-900" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">시맨틱</h3>
              <div className="flex gap-3 flex-wrap">
                <ColorSwatch name="success" hex="#00C73C" className="bg-ot-success" />
                <ColorSwatch name="warning" hex="#FF9500" className="bg-ot-warning" />
                <ColorSwatch name="error"   hex="#F04452" className="bg-ot-error" />
              </div>
            </div>
          </div>
        </section>

        {/* ── 타이포그래피 ────────────────────────────────── */}
        <section id="typography">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">타이포그래피 (Typography)</h2>
          <div className="space-y-4 bg-white rounded-xl border border-neutral-100 p-6">
            <div className="text-[40px] font-bold leading-tight tracking-tight text-neutral-900">Display (40px · 700)</div>
            <div className="text-[32px] font-bold leading-tight tracking-tight text-neutral-900">H1 (32px · 700)</div>
            <div className="text-[24px] font-bold leading-tight text-neutral-900">H2 (24px · 700)</div>
            <div className="text-[20px] font-semibold text-neutral-900">H3 (20px · 600)</div>
            <div className="text-[17px] text-neutral-700">Body Large (17px · 400) — 본문 대형</div>
            <div className="text-[15px] text-neutral-700">Body (15px · 400) — 일반 본문</div>
            <div className="text-[13px] text-neutral-500">Caption (13px · 400) — 보조 설명</div>
          </div>
        </section>

        {/* ── Button ──────────────────────────────────────── */}
        <section id="button">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Button</h2>
          <div className="bg-white rounded-xl border border-neutral-100 p-6 space-y-6">
            <div>
              <p className="text-sm text-neutral-500 mb-3">Variant</p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
                  primary
                </button>
                <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
                  secondary
                </button>
                <button className="text-neutral-600 hover:bg-neutral-100 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
                  ghost
                </button>
                <button className="bg-ot-error hover:opacity-90 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
                  danger
                </button>
                <button className="bg-neutral-200 text-neutral-400 font-semibold px-5 py-2.5 rounded-xl text-sm cursor-not-allowed" disabled>
                  disabled
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-3">Size</p>
              <div className="flex flex-wrap items-center gap-3">
                <button className="bg-primary-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs">sm</button>
                <button className="bg-primary-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm">md</button>
                <button className="bg-primary-500 text-white font-semibold px-7 py-3.5 rounded-xl text-base">lg</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Card ────────────────────────────────────────── */}
        <section id="card">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>기본 흰 배경 카드</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">카드 본문 내용이 여기에 들어갑니다.</p>
              </CardContent>
            </Card>
            <Card variant="muted">
              <CardHeader>
                <CardTitle>Muted Card</CardTitle>
                <CardDescription>회색 배경 카드</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">neutral-50 배경 카드입니다.</p>
              </CardContent>
            </Card>
            <Card variant="primary" clickable>
              <CardHeader>
                <CardTitle>Primary Card</CardTitle>
                <CardDescription>클릭 가능한 블루 카드</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-primary-700">hover 시 shadow + translate-y 효과.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── Input ───────────────────────────────────────── */}
        <section id="input">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Input</h2>
          <div className="bg-white rounded-xl border border-neutral-100 p-6 space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">기본 Input</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-colors text-sm"
                placeholder="입력해주세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">에러 상태</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-ot-error bg-red-50 text-neutral-900 focus:outline-none text-sm"
                defaultValue="잘못된 입력값"
              />
              <p className="mt-1 text-xs text-ot-error">올바른 값을 입력해주세요.</p>
            </div>
          </div>
        </section>

        {/* ── Badge ───────────────────────────────────────── */}
        <section id="badge">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Badge</h2>
          <div className="bg-white rounded-xl border border-neutral-100 p-6 flex flex-wrap gap-3">
            <Badge variant="primary">primary</Badge>
            <Badge variant="success">success</Badge>
            <Badge variant="warning">warning</Badge>
            <Badge variant="error">error</Badge>
            <Badge variant="neutral">neutral</Badge>
          </div>
        </section>

        {/* ── Modal ───────────────────────────────────────── */}
        <section id="modal">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Modal</h2>
          <div className="bg-white rounded-xl border border-neutral-100 p-6">
            <button
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
              onClick={() => setModalOpen(true)}
            >
              Modal 열기
            </button>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
              <ModalHeader>
                <ModalTitle>Modal 타이틀</ModalTitle>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-neutral-400 hover:text-neutral-600 text-xl leading-none"
                  aria-label="닫기"
                >
                  ×
                </button>
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-neutral-600">모달 본문입니다. 토스 스타일로 중앙 정렬 + 백드롭 blur.</p>
              </ModalBody>
              <ModalFooter>
                <button
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                  onClick={() => setModalOpen(false)}
                >
                  취소
                </button>
                <button
                  className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                  onClick={() => setModalOpen(false)}
                >
                  확인
                </button>
              </ModalFooter>
            </Modal>
          </div>
        </section>

        {/* ── Section ─────────────────────────────────────── */}
        <section id="section">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Section</h2>
          <div className="rounded-xl overflow-hidden border border-neutral-100">
            <Section variant="white" size="sm" contained={false}>
              <div className="max-w-5xl mx-auto px-6">
                <SectionHeader>
                  <SectionTitle>Section 컴포넌트</SectionTitle>
                  <SectionDescription>페이지 섹션의 일관된 레이아웃을 보장합니다.</SectionDescription>
                </SectionHeader>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {["default", "muted", "primary"].map((v) => (
                    <Card key={v} variant={v as "default" | "muted" | "primary"}>
                      <CardContent className="pt-6">
                        <p className="text-sm font-medium text-neutral-700">variant=&quot;{v}&quot;</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        </section>

        {/* ── 스페이싱·라운드·섀도 ───────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-6">스페이싱 · 라운드 · 섀도</h2>
          <div className="bg-white rounded-xl border border-neutral-100 p-6 space-y-6">
            <div>
              <p className="text-sm text-neutral-500 mb-3">Border Radius</p>
              <div className="flex gap-4 items-center">
                {[["sm", "rounded-lg"], ["md", "rounded-xl"], ["lg", "rounded-2xl"], ["xl", "rounded-3xl"], ["full", "rounded-full"]].map(([n, cls]) => (
                  <div key={n} className="flex flex-col items-center gap-1">
                    <div className={`w-12 h-12 bg-primary-100 border border-primary-200 ${cls}`} />
                    <span className="text-[10px] text-neutral-500">{n}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-3">Shadow</p>
              <div className="flex gap-6 items-center">
                {[["sm", "shadow-sm"], ["md", "shadow-md"], ["lg", "shadow-lg"]].map(([n, cls]) => (
                  <div key={n} className="flex flex-col items-center gap-2">
                    <div className={`w-16 h-16 bg-white rounded-xl ${cls}`} />
                    <span className="text-[10px] text-neutral-500">{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center text-xs text-neutral-400 pb-8">
          OT MARKETING Design System v1 · 토스 블루 #3182F6 · Pretendard Variable
        </footer>
      </div>
    </main>
  )
}
