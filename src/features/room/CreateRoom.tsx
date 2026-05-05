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

export function CreateRoom() {
  const [step, setStep] = useState(1);
  const [roomId, setRoomId] = useState("");

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
          {step === 1 && <CreateRoomStep1 />}
          {step === 2 && <CreateRoomStep2 />}
          {step === 3 && <CreateRoomStep3 />}
        </AppContent>
      ) : (
        <CreateRoomComplete roomId={roomId} />
      )}
    </AppShell>
  );
}
