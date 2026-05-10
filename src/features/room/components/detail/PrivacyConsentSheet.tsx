"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

type Props = {
  onClose: () => void;
  onAgree: () => void;
};

const TERMS = [
  { id: "service", label: "서비스 이용약관" },
  { id: "privacy", label: "개인정보 수집·이용 동의" },
] as const;

type TermId = (typeof TERMS)[number]["id"];

const TERM_CONTENT: Record<TermId, { title: string; body: React.ReactNode }> = {
  service: {
    title: "서비스 이용약관",
    body: (
      <div className="text-sm text-gray-600 leading-relaxed flex flex-col gap-4">
        <section>
          <p className="font-semibold text-gray-800 mb-1">제1조 (목적)</p>
          <p>
            본 약관은 nullnull(이하 &ldquo;서비스&rdquo;)이 제공하는 모임 일정
            조율 서비스의 이용 조건 및 절차, 회사와 이용자 간의 권리·의무 및
            책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>
        <section>
          <p className="font-semibold text-gray-800 mb-1">
            제2조 (서비스 이용)
          </p>
          <ul className="list-disc pl-4 flex flex-col gap-1">
            <li>서비스는 모임 생성 및 가능 시간 수집 기능을 제공합니다.</li>
            <li>
              이용자는 타인의 권리를 침해하는 방식으로 서비스를 이용할 수
              없습니다.
            </li>
            <li>
              서비스는 운영상 필요에 따라 내용을 변경하거나 종료할 수 있습니다.
            </li>
          </ul>
        </section>
        <section>
          <p className="font-semibold text-gray-800 mb-1">제3조 (면책)</p>
          <p>
            서비스는 이용자 간 발생한 분쟁에 대해 책임을 지지 않으며, 천재지변
            등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.
          </p>
        </section>
      </div>
    ),
  },
  privacy: {
    title: "개인정보 수집·이용 동의",
    body: (
      <div className="text-sm text-gray-600 leading-relaxed flex flex-col gap-4">
        <section>
          <p className="font-semibold text-gray-800 mb-1">1. 수집 항목</p>
          <ul className="list-disc pl-4 flex flex-col gap-1">
            <li>닉네임</li>
            <li>서비스 이용 정보 (모임 참여 정보, 불가능 시간, 출발지 등)</li>
            <li>접속 로그 및 기기 정보</li>
            <li>비활성화 식별을 위한 브라우저 식별자 (UUID)</li>
          </ul>
        </section>
        <section>
          <p className="font-semibold text-gray-800 mb-1">2. 수집 목적</p>
          <ul className="list-disc pl-4 flex flex-col gap-1">
            <li>모임 생성 및 일정 조율 기능 제공</li>
            <li>서비스 이용 통계 분석 및 개선</li>
          </ul>
        </section>
        <section>
          <p className="font-semibold text-gray-800 mb-1">3. 보유 이용기간</p>
          <ul className="list-disc pl-4 flex flex-col gap-1">
            <li>회원 탈퇴 또는 서비스 이용 목적 달성 시 즉시 삭제합니다.</li>
            <li>
              모임 데이터는 서비스 종료 후 30일 보존 후 삭제될 수 있습니다.
            </li>
          </ul>
        </section>
        <section>
          <p className="font-semibold text-gray-800 mb-1">4. 동의 거부 권리</p>
          <p>
            이용자는 개인정보 수집·이용에 대한 동의를 거부할 수 있으며, 이 경우
            서비스 이용에 제한이 있을 수 있습니다.
          </p>
        </section>
      </div>
    ),
  },
};

export function PrivacyConsentSheet({ onClose, onAgree }: Props) {
  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      direction="bottom"
    >
      <DrawerContent
        scope="viewport"
        className="!border-0 bg-transparent shadow-none [&>div:first-child]:hidden"
        style={{ maxHeight: "none" }}
      >
        <div className="Wrap">
          <div className="wrap-container !min-h-0 bg-white rounded-t-2xl">
            <div className="w-full pt-3 pb-4 flex justify-center">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <DrawerTitle className="sr-only">약관에 동의해주세요</DrawerTitle>
            <TermsSheetBody onAgree={onAgree} onClose={onClose} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function TermsSheetBody({
  onAgree,
  onClose,
}: {
  onAgree: () => void;
  onClose: () => void;
}) {
  const [checked, setChecked] = useState<Record<TermId, boolean>>({
    service: false,
    privacy: false,
  });
  const [viewingTerm, setViewingTerm] = useState<TermId | null>(null);

  const allChecked = TERMS.every((t) => checked[t.id]);

  const toggleAll = () => {
    const next = !allChecked;
    setChecked({ service: next, privacy: next });
  };

  const toggle = (id: TermId) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="px-5">
      {viewingTerm ? (
        <>
          <div className="flex items-center gap-2 mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="icon icon-back text-gray-700"
              onClick={() => setViewingTerm(null)}
              aria-label="뒤로"
            />
            <h2 className="text-lg font-bold text-gray-900">
              {TERM_CONTENT[viewingTerm].title}
            </h2>
          </div>
          <div className="max-h-72 overflow-y-auto pr-1 mb-6">
            {TERM_CONTENT[viewingTerm].body}
          </div>
          <div className="pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <Button size="cta" onClick={() => setViewingTerm(null)}>
              확인
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-gray-900 leading-snug mb-6">
            모임을 시작하기 위해
            <br />
            약관에 동의해주세요
          </h2>

          <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div
              role="button"
              tabIndex={0}
              className="flex items-center justify-between px-4 py-3.5 bg-white cursor-pointer"
              onClick={toggleAll}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleAll();
              }}
            >
              <span className="text-sm font-medium text-gray-900">
                필수 항목 모두 체크하기
              </span>
              <Checkbox
                checked={allChecked}
                tabIndex={-1}
                aria-hidden="true"
                className="size-5 pointer-events-none data-checked:bg-blue-500 data-checked:border-blue-500"
              />
            </div>

            <div className="h-px bg-gray-100 mx-4" />

            {TERMS.map((term) => (
              <div key={term.id} className="flex items-center px-4 py-3.5">
                <span className="text-xs font-semibold text-blue-500 mr-2">
                  필수
                </span>
                <Button
                  variant="ghost"
                  className="flex-1 justify-start h-auto px-0 py-0 text-sm text-gray-700 hover:bg-transparent gap-0.5"
                  onClick={() => setViewingTerm(term.id)}
                >
                  {term.label}
                  <span className="icon icon-arrow-right text-gray-400 text-xs ml-0.5" />
                </Button>
                <Checkbox
                  checked={checked[term.id]}
                  onCheckedChange={() => toggle(term.id)}
                  className="size-5 data-checked:bg-blue-500 data-checked:border-blue-500"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <Button size="cta" onClick={onAgree} disabled={!allChecked}>
              동의하고 계속하기
            </Button>
            <Button size="cta" variant="ghost" onClick={onClose}>
              닫기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
