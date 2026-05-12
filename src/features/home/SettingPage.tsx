"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { AppContent, AppIconLink, AppShell } from "@/components/layout";
import { AppDialog } from "@/components/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { ServiceTerms } from "@/components/terms/ServiceTerms";
import { PrivacyPolicy } from "@/components/terms/PrivacyPolicy";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SettingPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    logout,
    withdraw,
    updateNickname,
    isLoggingOut,
    isWithdrawing,
    isUpdatingNickname,
  } = useAuth();

  const [newNickname, setNewNickname] = useState(user?.nickname || "");
  const [prevUserNickname, setPrevUserNickname] = useState(user?.nickname);
  const [isPushEnabled, setIsPushEnabled] = useState(true);
  const [nicknameError, setNicknameError] = useState("");

  if (user?.nickname !== prevUserNickname) {
    setPrevUserNickname(user?.nickname);
    setNewNickname(user?.nickname || "");
    setNicknameError("");
  }

  // 약관 팝업 상태
  const [showServiceTerms, setShowServiceTerms] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewNickname(value);

    if (
      value.trim().length > 0 &&
      (value.trim().length < 2 || value.trim().length > 10)
    ) {
      setNicknameError("닉네임은 2~10글자 사이로 입력해주세요.");
    } else {
      setNicknameError("");
    }
  };

  const handleUpdateNickname = () => {
    const trimmedNickname = newNickname.trim();

    if (trimmedNickname.length < 2 || trimmedNickname.length > 10) {
      toast.error("닉네임은 2~10글자 사이로 입력해주세요.");
      return;
    }

    if (trimmedNickname === user?.nickname) return;

    updateNickname(trimmedNickname);
  };

  return (
    <AppShell
      title="설정"
      leftSlot={
        <AppIconLink
          icon="back"
          label="뒤로가기"
          onClick={() => router.back()}
        />
      }
    >
      <AppContent>
        <div className="flex flex-col h-full bg-gray-50/30">
          <section className="px-5 py-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">닉네임</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newNickname}
                  onChange={handleNicknameChange}
                  placeholder="닉네임을 입력하세요"
                  className={cn(
                    "flex-1 rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500",
                    nicknameError ? "border-red-500" : "border-gray-200",
                  )}
                />
                <button
                  onClick={handleUpdateNickname}
                  disabled={
                    isUpdatingNickname ||
                    newNickname.trim().length < 2 ||
                    newNickname.trim().length > 10 ||
                    newNickname.trim() === user?.nickname
                  }
                  className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white disabled:bg-gray-100 disabled:text-gray-400 transition-colors shrink-0"
                >
                  {isUpdatingNickname ? "저장 중..." : "저장"}
                </button>
              </div>
              {nicknameError && (
                <p className="text-xs font-medium text-red-500 px-1">
                  {nicknameError}
                </p>
              )}
            </div>
          </section>

          <section className="px-5 py-2">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">알림</h2>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-base font-semibold text-gray-900">
                  Push 알림
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  모임의 중요한 순간만 알려드려요
                </p>
      <AppContent className="flex flex-1 flex-col px-4 pb-10 pt-5">
        <div className="flex min-h-0 flex-1 flex-col justify-between">
          <div>
            <section>
              <h2 className="block px-[5px] text-sm font-semibold leading-[18px] text-text-primary">
                <Label htmlFor="nickname" className="font-semibold">
                  닉네임
                </Label>
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  id="nickname"
                  type="text"
                  value={user?.nickname || ""}
                  disabled
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled
                  className="h-10 rounded-xl bg-bg-muted px-4 text-sm font-medium leading-5 text-text-disabled hover:bg-bg-muted hover:text-text-disabled disabled:opacity-100"
                >
                  저장
                </Button>
              </div>
            </section>

          <section className="px-5 py-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              고객센터
            </h2>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setShowServiceTerms(true)}
                className="flex items-center justify-between py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100/50"
              >
                서비스 이용약관
                <ChevronRight className="size-5 text-gray-400" />
              </button>
              <button
                onClick={() => setShowPrivacyPolicy(true)}
                className="flex items-center justify-between py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100/50"
              >
                개인정보처리방침
                <ChevronRight className="size-5 text-gray-400" />
              </button>
              <button className="flex items-center justify-between py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100/50">
                문의하기
                <ChevronRight className="size-5 text-gray-400" />
              </button>
            </div>
          </section>

          {/* 약관 상세 팝업 */}
          <ServiceTerms
            open={showServiceTerms}
            onOpenChange={setShowServiceTerms}
          />
          <PrivacyPolicy
            open={showPrivacyPolicy}
            onOpenChange={setShowPrivacyPolicy}
          />

          <div className="flex-1" />
            <section className="mt-5">
              <h2 className="px-[5px] text-sm font-semibold leading-[18px] text-text-primary">
                알림
              </h2>
              <div className="mt-6 flex items-center justify-between gap-5">
                <div>
                  <p className="text-base font-semibold leading-5 text-text-primary">
                    Push 알림
                  </p>
                  <p className="mt-2 text-sm font-medium leading-[18px] text-text-primary">
                    모임의 중요한 순간만 알려드려요
                  </p>
                </div>
                <Switch
                  checked={isPushEnabled}
                  onCheckedChange={setIsPushEnabled}
                />
              </div>
            </section>

            <section className="mt-9">
              <h2 className="px-[5px] text-sm font-semibold leading-[18px] text-text-primary">
                고객센터
              </h2>
              <div className="mt-2 flex flex-col gap-1">
                <button className="flex h-[52px] items-center justify-between text-base font-semibold leading-5 text-text-primary">
                  서비스 이용약관
                  <span
                    className="icon icon-arrow-right text-text-primary"
                    aria-hidden="true"
                  />
                </button>
                <button className="flex h-[52px] items-center justify-between text-base font-semibold leading-5 text-text-primary">
                  개인정보처리방침
                  <span
                    className="icon icon-arrow-right text-text-primary"
                    aria-hidden="true"
                  />
                </button>
                <button className="flex h-[52px] items-center justify-between text-base font-semibold leading-5 text-text-primary">
                  문의하기
                  <span
                    className="icon icon-arrow-right text-text-primary"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </section>
          </div>

          <section className="flex items-center justify-center gap-1 text-sm font-normal leading-[18px]">
            <AppDialog
              type="confirm"
              dialogSize="compact"
              title="로그아웃을 진행하시겠어요?"
              description="로그아웃하면 알림을 받을 수 없어요"
              actions={[
                { label: "취소", variant: "secondary" },
                { label: "로그아웃", onClick: logout, disabled: isLoggingOut },
              ]}
            >
              <button className="h-10 w-20 text-text-disabled hover:text-text-secondary">
                로그아웃
              </button>
            </AppDialog>

            <span className="h-3.5 text-border-strong">|</span>

            <AppDialog
              type="confirm"
              dialogSize="compact"
              title="탈퇴 시 모든 모임 기록이 사라져요"
              description="그래도 탈퇴하시겠어요?"
              actions={[
                { label: "취소", variant: "secondary" },
                {
                  label: "회원탈퇴",
                  variant: "danger",
                  onClick: withdraw,
                  disabled: isWithdrawing,
                },
              ]}
            >
              <button className="h-10 w-20 text-danger hover:text-danger-darker">
                회원탈퇴
              </button>
            </AppDialog>
          </section>
        </div>
      </AppContent>
    </AppShell>
  );
}
