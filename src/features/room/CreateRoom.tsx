"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreateRoomStep1 } from "@/features/room/components/create/CreateRoomStep1";
import { CreateRoomStep2 } from "@/features/room/components/create/CreateRoomStep2";
import { CreateRoomStep3 } from "@/features/room/components/create/CreateRoomStep3";
import { CreateRoomComplete } from "@/features/room/components/create/CreateRoomComplete";
import { AppBackButton, AppContent, AppLogoLink } from "@/components/layout";

export interface RoomData {
  nickname: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  preferredDayType: string;
  customDays: string[];
  deadlineDate: string;
  deadlineTime: string;
}

export function CreateRoom() {
  const [step, setStep] = useState(1);
  const [roomId, setRoomId] = useState("");
  const [formData, setFormData] = useState<RoomData>({
    nickname: "발넓은모임장",
    title: "",
    category: "food",
    startDate: "2026-05-01",
    endDate: "2026-05-30",
    startTime: "오후 6:00",
    endTime: "오후 10:00",
    preferredDayType: "weekday",
    customDays: [],
    deadlineDate: "2026-05-07",
    deadlineTime: "오전 9:00",
  });

  const handleNext = () => {
    if (step < 4) {
      if (step === 3 && !roomId) {
        const slug = Math.random().toString(36).substring(2, 10);
        setRoomId(slug);
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleShare = async () => {
    const shareData = {
      title: "NULLNULL 모임 초대",
      text: "우리 언제 밥 한번 먹지? 일정 조율에 참여해 주세요!",
      url: `${window.location.origin}/room/${roomId}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("공유 실패:", err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("링크가 클립보드에 복사되었습니다.");
      } catch (err) {
        console.error("복사 실패:", err);
      }
    }
  };

  return (
    <AppShell
      title={step === 4 ? undefined : "모임 만들기"}
      leftSlot={
        step === 4 ? (
          <AppLogoLink />
        ) : step === 1 ? (
          <AppBackButton href="/" />
        ) : (
          <AppBackButton onClick={handleBack} />
        )
      }
      rightSlot={
        step === 4 && (
          <button onClick={handleShare} className="p-2">
            <i className="icon icon-share w-6 h-6 bg-gray-900"></i>
          </button>
        )
      }
      bottomSlot={
        step < 4 ? (
          <Button size="cta" onClick={handleNext}>
            {step === 3 ? "완료" : "다음"}
          </Button>
        ) : (
          <Button size="cta" asChild>
            <Link href={`/room/${roomId}`}>내 일정 입력하기</Link>
          </Button>
        )
      }
    >
      {step < 4 ? (
        <AppContent>
          <div className="mb-5">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 w-[28px] rounded-full ${s <= step ? "bg-primary" : "bg-gray-200"}`}
                />
              ))}
            </div>
            <div className="text-primary font-bold text-sm tracking-widest">
              STEP {step}
            </div>
          </div>
          {step === 1 && (
            <CreateRoomStep1
              data={formData}
              onUpdate={(val) => setFormData({ ...formData, ...val })}
            />
          )}
          {step === 2 && (
            <CreateRoomStep2
              data={formData}
              onUpdate={(val) => setFormData({ ...formData, ...val })}
            />
          )}
          {step === 3 && (
            <CreateRoomStep3
              data={formData}
              onUpdate={(val) => setFormData({ ...formData, ...val })}
            />
          )}
        </AppContent>
      ) : (
        <CreateRoomComplete _roomId={roomId} data={formData} />
      )}
    </AppShell>
  );
}
