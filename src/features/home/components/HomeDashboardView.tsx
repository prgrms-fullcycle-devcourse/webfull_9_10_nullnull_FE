"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarX } from "lucide-react";
import {
  AppShell,
  AppContent,
  AppIconLink,
  AppLogoLink,
} from "@/components/layout";
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
          <>
            <AppIconLink
              icon="alarm"
              label="알림"
              onClick={() => setShowBellDialog(true)}
            />
            <AppIconLink href="/setting" icon="setting" label="설정" />
          </>
        }
        bottomSlot={
          activeTab === "created" ? (
            <Button asChild>
              <Link href="/room">모임 만들기</Link>
            </Button>
          ) : null // 참여한 모임 탭에서는 하단 버튼을 숨깁니다.
        }
      >
        <AppContent>
          <section className="pb-10 pt-8">
            <h1 className="text-2xl font-bold leading-8 text-text-primary">
              {userNickname} 님,
              <br />
              어떤 약속을 널널하게 맞춰볼까요?
            </h1>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-6 w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="created">만든 모임</TabsTrigger>
                <TabsTrigger value="joined">참여한 모임</TabsTrigger>
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
