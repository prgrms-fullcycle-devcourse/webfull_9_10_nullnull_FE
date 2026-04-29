"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreateRoomStep1 } from "@/features/room/components/create/CreateRoomStep1";
import { CreateRoomStep2 } from "@/features/room/components/create/CreateRoomStep2";
import { CreateRoomStep3 } from "@/features/room/components/create/CreateRoomStep3";
import { CreateRoomComplete } from "@/features/room/components/create/CreateRoomComplete";

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
      title={
        <span className="text-base">
          {step === 4 ? "모임 생성 완료" : "모임 만들기"}
        </span>
      }
      leftSlot={
        step === 1 ? (
          <Link href="/" className="icon icon-back" aria-label="뒤로가기" />
        ) : (
          <button
            onClick={handleBack}
            className="icon icon-back"
            aria-label="이전 단계"
          />
        )
      }
      bottomSlot={
        step < 4 ? (
          <Button
            className="h-14 w-full rounded-2xl text-base"
            onClick={handleNext}
          >
            {step === 3 ? "완료" : "다음"}
          </Button>
        ) : (
          <Link href={`/room/${roomId}`} className="block w-full">
            <Button className="h-14 w-full rounded-2xl text-base font-bold border-0">
              안되는 시간 선택하기
            </Button>
          </Link>
        )
      }
    >
      {step < 4 ? (
        <div className="px-5 py-6 flex flex-col min-h-full">
          <div className="mb-6">
            <div className="flex gap-2 mb-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full ${s <= step ? "bg-[#6B4EFF]" : "bg-gray-200"}`}
                />
              ))}
            </div>
            <div className="text-[#6B4EFF] font-bold text-sm tracking-widest">
              STEP {step}
            </div>
          </div>
          {step === 1 && <CreateRoomStep1 />}
          {step === 2 && <CreateRoomStep2 />}
          {step === 3 && <CreateRoomStep3 />}
        </div>
      ) : (
        <CreateRoomComplete roomId={roomId} />
      )}
    </AppShell>
  );
}
