"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { AppContent, AppShell } from "@/components/layout";
import { AppDialog } from "@/components/dialog";
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
      leftSlot={
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-900"
          aria-label="뒤로 가기"
        >
          <ChevronLeft className="size-6" />
          <span className="ml-1 text-lg font-bold">설정</span>
        </button>
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
              </div>
              <Switch
                checked={isPushEnabled}
                onCheckedChange={setIsPushEnabled}
                className="data-[state=checked]:bg-blue-500"
              />
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

          <section className="flex items-center justify-center gap-4 px-5 pb-10 pt-4 text-sm font-medium">
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
              <button className="text-gray-400 hover:text-gray-600">
                로그아웃
              </button>
            </AppDialog>

            <span className="text-gray-300">|</span>

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
              <button className="text-red-400 hover:text-red-500">
                회원탈퇴
              </button>
            </AppDialog>
          </section>
        </div>
      </AppContent>
    </AppShell>
  );
}
