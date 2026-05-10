"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AppContent, AppIconLink, AppShell } from "@/components/layout";
import { AppDialog } from "@/components/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";

export function SettingPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { logout, withdraw, isLoggingOut, isWithdrawing } = useAuth();

  const [isPushEnabled, setIsPushEnabled] = useState(true);

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
