"use client";

import { useState } from "react";
import { AppBackButton, AppContent, AppShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  role: "guest" | "member";
  nickname?: string;
  onBack: () => void;
  onComplete: (name: string, uuid: string) => void;
};

export function JoinNameStep({ role, nickname, onBack, onComplete }: Props) {
  const [name, setName] = useState(() =>
    role === "guest" ? randomNickname() : (nickname ?? ""),
  );
  const [error, setError] = useState("");

  const handleNext = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("이름을 입력해 주세요.");
      return;
    }
    if (trimmed.length < 2) {
      setError("닉네임은 2자 이상 입력해 주세요.");
      return;
    }
    setError("");
    onComplete(trimmed, crypto.randomUUID());
  };

  return (
    <AppShell
      title={<span className="text-base">모임 참여하기</span>}
      leftSlot={<AppBackButton onClick={onBack} />}
      bottomSlot={
        <Button size="cta" onClick={handleNext} disabled={!name.trim()}>
          다음
        </Button>
      }
    >
      <AppContent className="flex flex-col gap-6">
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
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              if (e.target.value.length > 10) return;
              setName(e.target.value);
              if (error) setError("");
            }}
            placeholder="이름 또는 별명을 입력해 주세요"
            aria-invalid={!!error}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </AppContent>
    </AppShell>
  );
}
