"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Settings, CalendarX } from "lucide-react";
import { AppShell, AppContent, AppLogoLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { AppDialog } from "@/components/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HomeDashboardViewProps {
  userNickname: string;
}

export function HomeDashboardView({ userNickname }: HomeDashboardViewProps) {
  const [activeTab, setActiveTab] = useState("created");
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
          <div className="flex items-center gap-1 text-gray-700">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBellDialog(true)}
              aria-label="알림"
              className="rounded-full"
            >
              <Bell className="size-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full"
            >
              <Link href="/setting" aria-label="설정">
                <Settings className="size-6" />
              </Link>
            </Button>
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

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-6 w-full"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-50 p-1 h-11">
                <TabsTrigger
                  value="created"
                  className="rounded-lg text-sm font-semibold transition-all data-active:bg-white data-active:text-gray-900 data-active:shadow-sm text-gray-500"
                >
                  만든 모임
                </TabsTrigger>
                <TabsTrigger
                  value="joined"
                  className="rounded-lg text-sm font-semibold transition-all data-active:bg-white data-active:text-gray-900 data-active:shadow-sm text-gray-500"
                >
                  참여한 모임
                </TabsTrigger>
              </TabsList>

              <TabsContent value="created" className="mt-16">
                <EmptyState
                  message="아직 만들어진 모임이 없어요."
                  subMessage="새로운 모임을 만들어보세요!"
                />
              </TabsContent>

              <TabsContent value="joined" className="mt-16">
                <EmptyState
                  message="아직 참여한 모임이 없어요."
                  subMessage="친구의 초대 링크로 참여해 보세요!"
                />
              </TabsContent>
            </Tabs>
          </section>
        </AppContent>
      </AppShell>
    </>
  );
}

function EmptyState({
  message,
  subMessage,
}: {
  message: string;
  subMessage: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-50">
        <CalendarX className="size-8 text-gray-300" />
      </div>
      <p className="text-sm font-medium text-gray-400">
        {message}
        <br />
        {subMessage}
      </p>
    </div>
  );
}
