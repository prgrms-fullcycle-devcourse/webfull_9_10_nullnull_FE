"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AppContent,
  AppIconLink,
  AppLogoLink,
  AppShell,
} from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CreateRoomStep1 } from "@/features/room/components/create/CreateRoomStep1";
import { CreateRoomStep2 } from "@/features/room/components/create/CreateRoomStep2";
import { CreateRoomStep3 } from "@/features/room/components/create/CreateRoomStep3";
import { CreateRoomComplete } from "@/features/room/components/create/CreateRoomComplete";
import { useCreateRoom } from "./hooks/useCreateRoom";
import { AppDialog } from "@/components/dialog/AppDialog";
import { toast } from "sonner";

export function CreateRoom() {
  const router = useRouter();
  const {
    step,
    roomId,
    formData,
    errors,
    handleNext,
    handleBack,
    updateFormData,
    submitRoom,
    isSubmitting,
  } = useCreateRoom();

  const [showExitDialog, setShowExitDialog] = useState(false);

  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

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
        setCreatedSlug(result.slug);
        handleNext(); // Step 4로 이동
      }
    } catch {
      toast.error("방 생성에 실패했어요. 다시 시도해 주세요.");
    }
  };

  const handleShare = async () => {
    const slugToShare = createdSlug || roomId;
    if (!slugToShare) return;

    const shareUrl = `${window.location.origin}/room/${slugToShare}`;
    const shareData = {
      title: "널널 - 모임 시간 정하기",
      text: `[${formData.title}] 모임에 초대되었어요!\n가능한 시간을 선택해 주세요.`,
      url: shareUrl,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("링크가 클립보드에 복사되었어요!");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("링크가 클립보드에 복사되었어요!");
      }
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
            <AppIconLink
              icon="back"
              label="뒤로가기"
              onClick={handleExitRequest}
            />
          ) : (
            <AppIconLink icon="back" label="뒤로가기" onClick={handleBack} />
          )
        }
        rightSlot={
          step === 4 ? (
            <AppIconLink icon="share" label="공유하기" onClick={handleShare} />
          ) : undefined
        }
        bottomSlot={
          <Button
            onClick={() => {
              if (step === 4) {
                const finalSlug = createdSlug || roomId;
                if (finalSlug) router.push(`/room/${finalSlug}/schedule`);
              } else if (step === 3) {
                onFinalSubmit();
              } else {
                handleNext();
              }
            }}
            disabled={isSubmitting || (step === 4 && !createdSlug && !roomId)}
          >
            {isSubmitting
              ? "생성 중..."
              : step === 4
                ? "안 되는 시간 선택하기"
                : step === 3
                  ? "완료"
                  : "다음"}
          </Button>
        }
      >
        {step < 4 ? (
          <AppContent>
            <div className="mb-5">
              <div className="mb-3 flex gap-1">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1 w-[28px] rounded-full ${s <= step ? "bg-primary" : "bg-gray-200"}`}
                  />
                ))}
              </div>
              <div className="text-md font-bold tracking-widest text-primary">
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
