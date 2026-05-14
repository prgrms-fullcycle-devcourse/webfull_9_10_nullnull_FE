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
import { useMyRooms } from "../../room/hooks/useMyRooms";
import { RoomCard } from "./RoomCard";
import { Loader2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HomeDashboardViewProps {
  userNickname: string;
}

export function HomeDashboardView({ userNickname }: HomeDashboardViewProps) {
  const [activeTab, setActiveTab] = useState("created");
  const [showBellDialog, setShowBellDialog] = useState(false);
  const { rooms, isLoading } = useMyRooms();

  const createdRooms = rooms.filter((r) => r.myRole === "HOST");
  const joinedRooms = rooms.filter((r) => r.myRole === "MEMBER");

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
          ) : null
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

              <TabsContent value="created" className="mt-8">
                {isLoading ? (
                  <LoadingState />
                ) : createdRooms.length > 0 ? (
                  <RoomListGroup rooms={createdRooms} />
                ) : (
                  <EmptyState
                    message="아직 만들어진 모임이 없어요."
                    subMessage="새로운 모임을 만들어보세요!"
                  />
                )}
              </TabsContent>

              <TabsContent value="joined" className="mt-8">
                {isLoading ? (
                  <LoadingState />
                ) : joinedRooms.length > 0 ? (
                  <RoomListGroup rooms={joinedRooms} />
                ) : (
                  <EmptyState
                    message="아직 참여한 모임이 없어요."
                    subMessage="친구의 초대 링크로 참여해 보세요!"
                  />
                )}
              </TabsContent>
            </Tabs>
          </section>
        </AppContent>
      </AppShell>
    </>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="size-8 animate-spin text-primary" />
      <p className="mt-4 text-sm text-text-tertiary">모임을 불러오는 중...</p>
    </div>
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
function RoomListGroup({ rooms }: { rooms: any[] }) {
  const [isCollectingOpen, setIsCollectingOpen] = useState(true);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(true);

  const collecting = rooms.filter(
    (r) => r.status === "COLLECTING" || r.status === "READY",
  );
  const confirmed = rooms.filter(
    (r) => r.status === "CONFIRMED" || r.status === "CLOSED",
  );

  return (
    <div className="flex flex-col gap-10">
      {collecting.length > 0 && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setIsCollectingOpen(!isCollectingOpen)}
            className="flex items-center justify-between w-full text-left focus:outline-none"
          >
            <h2 className="text-sm font-bold text-text-secondary flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-info" />
              모집 중
              <span className="ml-1 text-xs font-medium text-text-disabled">
                {collecting.length}
              </span>
            </h2>
            <ChevronDown
              className={cn(
                "size-4 text-text-disabled transition-transform duration-200",
                !isCollectingOpen && "-rotate-90",
              )}
            />
          </button>
          {isCollectingOpen && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
              {collecting.map((room) => (
                <RoomCard key={room.roomId} room={room} />
              ))}
            </div>
          )}
        </div>
      )}

      {confirmed.length > 0 && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setIsConfirmedOpen(!isConfirmedOpen)}
            className="flex items-center justify-between w-full text-left focus:outline-none"
          >
            <h2 className="text-sm font-bold text-text-secondary flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success" />
              확정됨
              <span className="ml-1 text-xs font-medium text-text-disabled">
                {confirmed.length}
              </span>
            </h2>
            <ChevronDown
              className={cn(
                "size-4 text-text-disabled transition-transform duration-200",
                !isConfirmedOpen && "-rotate-90",
              )}
            />
          </button>
          {isConfirmedOpen && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
              {confirmed.map((room) => (
                <RoomCard key={room.roomId} room={room} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
