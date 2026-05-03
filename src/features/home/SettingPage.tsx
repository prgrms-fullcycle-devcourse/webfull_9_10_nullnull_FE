"use client";

import { useRouter } from "next/navigation";
import { AppShell, AppContent } from "@/components/layout";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export function SettingPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { logout, withdraw, isLoggingOut, isWithdrawing } = useAuth();

  const [isPushEnabled, setIsPushEnabled] = useState(true);

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
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={user?.nickname || ""}
                disabled
                className="flex-1 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
              />
              <button
                disabled
                className="rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-400"
              >
                저장
              </button>
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
              <button className="flex items-center justify-between py-3 text-sm font-semibold text-gray-900">
                서비스 이용약관
                <ChevronRight className="size-5 text-gray-400" />
              </button>
              <button className="flex items-center justify-between py-3 text-sm font-semibold text-gray-900">
                개인정보처리방침
                <ChevronRight className="size-5 text-gray-400" />
              </button>
              <button className="flex items-center justify-between py-3 text-sm font-semibold text-gray-900">
                문의하기
                <ChevronRight className="size-5 text-gray-400" />
              </button>
            </div>
          </section>

          {/* 하단 여백 채우기 */}
          <div className="flex-1"></div>

          <section className="px-5 pb-10 pt-4 flex items-center justify-center gap-4 text-sm font-medium">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="text-gray-400 hover:text-gray-600">
                  로그아웃
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[320px] rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center text-lg font-bold">
                    로그아웃을 진행하시겠어요?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center text-sm text-gray-500">
                    로그아웃 하면 알림을 받을 수 없어요
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row items-center gap-3 sm:justify-center mt-4">
                  <AlertDialogCancel className="mt-0 flex-1 rounded-xl h-12 text-sm font-semibold bg-gray-50 border-none hover:bg-gray-100">
                    취소
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => logout()}
                    disabled={isLoggingOut}
                    className="flex-1 rounded-xl h-12 text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600"
                  >
                    로그아웃
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <span className="text-gray-300">|</span>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="text-red-400 hover:text-red-500">
                  회원탈퇴
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[320px] rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center text-lg font-bold">
                    탈퇴 시 모든 모임 기록이 사라져요
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center text-sm text-gray-500">
                    그래도 탈퇴 하시겠어요?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row items-center gap-3 sm:justify-center mt-4">
                  <AlertDialogCancel className="mt-0 flex-1 rounded-xl h-12 text-sm font-semibold bg-gray-50 border-none hover:bg-gray-100">
                    취소
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => withdraw()}
                    disabled={isWithdrawing}
                    className="flex-1 rounded-xl h-12 text-sm font-semibold bg-red-500 text-white hover:bg-red-600"
                  >
                    회원탈퇴
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>
        </div>
      </AppContent>
    </AppShell>
  );
}
