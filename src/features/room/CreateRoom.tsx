"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { CreateRoomStep1 } from "@/features/room/components/create/CreateRoomStep1";
import { CreateRoomStep2 } from "@/features/room/components/create/CreateRoomStep2";
import { CreateRoomStep3 } from "@/features/room/components/create/CreateRoomStep3";
import { CreateRoomComplete } from "@/features/room/components/create/CreateRoomComplete";
import { AppBackButton, AppContent, AppLogoLink } from "@/components/layout";
import { useCreateRoom } from "./hooks/useCreateRoom";
import { AppDialog } from "@/components/dialog/AppDialog";
import { toast } from "sonner";

export function CreateRoom() {
  const router = useRouter();
  const {
    step,
    formData,
    errors,
    handleNext,
    handleBack,
    updateFormData,
    submitRoom,
    isSubmitting,
  } = useCreateRoom();

  const [showExitDialog, setShowExitDialog] = useState(false);

  // 이탈 확인 핸들러
  const handleExitRequest = () => {
    if (step === 1) {
      setShowExitDialog(true);
    } else {
      handleBack();
    }
  };

  const onFinalSubmit = async () => {
    try {
      const result = await submitRoom();
      if (result) {
        handleNext(); // Step 4로 이동
      }
    } catch {
      toast.error("방 생성에 실패했어요. 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <AppShell
        title={step === 4 ? undefined : "모임 만들기"}
        leftSlot={
          step === 4 ? (
            <AppLogoLink />
          ) : step === 1 ? (
            <AppBackButton onClick={handleExitRequest} />
          ) : (
            <AppBackButton onClick={handleBack} />
          )
        }
        rightSlot={undefined}
        bottomSlot={
          <Button
            size="cta"
            onClick={step === 3 ? onFinalSubmit : handleNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? "생성 중..." : step === 3 ? "완료" : "다음"}
          </Button>
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
                errors={errors}
                onUpdate={updateFormData}
              />
            )}

            {step === 2 && (
              <CreateRoomStep2
                data={formData}
                errors={errors}
                onUpdate={updateFormData}
              />
            )}

            {step === 3 && (
              <CreateRoomStep3 data={formData} onUpdate={updateFormData} />
            )}
          </AppContent>
        ) : (
          <CreateRoomComplete data={formData} />
        )}
      </AppShell>

      {/* 이탈 확인 다이얼로그 */}
      <AppDialog
        type="confirm"
        open={showExitDialog}
        onOpenChange={setShowExitDialog}
        title="모임 만들기를 중단하시겠습니까?"
        description="지금 나가시면 작성 중인 정보가 모두 사라집니다."
        actions={[
          {
            label: "계속 작성하기",
            variant: "secondary",
            onClick: () => setShowExitDialog(false),
          },
          {
            label: "나가기",
            variant: "danger",
            onClick: () => router.push("/"),
          },
        ]}
      />
    </>
  );
}
