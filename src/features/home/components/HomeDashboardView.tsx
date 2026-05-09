"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Settings, CalendarX } from "lucide-react";
import { AppShell, AppContent, AppLogoLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { AppDialog } from "@/components/dialog";

interface HomeDashboardViewProps {
  userNickname: string;
}

export function HomeDashboardView({ userNickname }: HomeDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<"created" | "joined">("created");
  const [showBellDialog, setShowBellDialog] = useState(false);

  return (
    <>
      <AppDialog
        type="alert"
        open={showBellDialog}
        onOpenChange={setShowBellDialog}
        title="알림 기능 준비 중"
        description="조금만 기다려주세요! 곧 실시간 알림 서비스를 시작할 예정이에요."
      />
      <AppShell
        leftSlot={<AppLogoLink />}
        rightSlot={
          <div className="flex items-center gap-3 text-gray-700">
            <button
              onClick={() => setShowBellDialog(true)}
              aria-label="알림"
              className="hover:text-gray-900 transition-colors"
            >
              <Bell className="size-6" />
            </button>
            <Link
              href="/setting"
              aria-label="설정"
              className="hover:text-gray-900 transition-colors"
            >
              <Settings className="size-6" />
            </Link>
          </div>
        }
        bottomSlot={
          activeTab === "created" ? (
            <div className="px-5 w-full">
              <Button size="cta" className="w-full" asChild>
                <Link href="/room">모임 만들기</Link>
              </Button>
            </div>
          ) : null // 참여한 모임 탭에서는 하단 버튼을 숨깁니다.
        }
      >
        <AppContent>
          <section className="px-5 pt-8 pb-10">
            <h1 className="text-2xl font-bold leading-8 text-gray-950">
              {userNickname} 님,
              <br />
              어떤 약속을 널널하게 맞춰볼까요?
            </h1>

            <div className="mt-6 flex rounded-xl bg-gray-50 p-1">
              <button
                onClick={() => setActiveTab("created")}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
                  activeTab === "created"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                만든 모임
              </button>
              <button
                onClick={() => setActiveTab("joined")}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
                  activeTab === "joined"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                참여한 모임
              </button>
            </div>

            <div className="mt-16 flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-50">
                <CalendarX className="size-8 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-400">
                {activeTab === "created"
                  ? "아직 만들어진 모임이 없어요."
                  : "아직 참여한 모임이 없어요."}
                <br />
                {activeTab === "created"
                  ? "새로운 모임을 만들어보세요!"
                  : "친구의 초대 링크로 참여해 보세요!"}
              </p>
            </div>
          </section>
        </AppContent>
      </AppShell>
    </>
  );
}
