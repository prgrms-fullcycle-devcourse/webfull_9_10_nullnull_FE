"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { PrivacyConsentSheet } from "./PrivacyConsentSheet";

const RANDOM_NICKNAMES = [
  "핵인싸참여자",
  "즐거운참가자",
  "신나는멤버",
  "열정적인팀원",
  "활발한참여자",
];

function randomNickname() {
  return RANDOM_NICKNAMES[Math.floor(Math.random() * RANDOM_NICKNAMES.length)];
}

type Props = {
  onBack: () => void;
  onComplete: (name: string, uuid: string) => void;
};

export function JoinNameStep({ onBack, onComplete }: Props) {
  const [name, setName] = useState(() => randomNickname());
  const [error, setError] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const handleNext = () => {
    if (!name.trim()) {
      setError("이름을 입력해 주세요.");
      return;
    }
    setError("");
    setPrivacyOpen(true);
  };

  const handleAgree = () => {
    const uuid = crypto.randomUUID();
    setPrivacyOpen(false);
    onComplete(name.trim(), uuid);
  };

  return (
    <AppShell
      title={<span className="text-base">모임 참여하기</span>}
      leftSlot={
        <button
          onClick={onBack}
          className="icon icon-back"
          aria-label="뒤로가기"
        />
      }
      bottomSlot={
        <Button size="cta" onClick={handleNext}>
          다음
        </Button>
      }
      overlaySlot={
        privacyOpen && (
          <PrivacyConsentSheet
            onClose={() => setPrivacyOpen(false)}
            onAgree={handleAgree}
          />
        )
      }
    >
      <div className="px-5 py-8 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            어떤 이름으로 참여할까요?
          </h2>
          <p className="text-sm text-gray-500">
            모임장이 알아볼 수 있는 이름을 입력해 주세요
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            placeholder="이름을 입력해 주세요"
            aria-invalid={!!error}
            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6B4EFF] focus:ring-1 focus:ring-[#6B4EFF] bg-white aria-[invalid=true]:border-red-400"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>
    </AppShell>
  );
}
