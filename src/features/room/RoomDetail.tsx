"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppBackButton, AppLogoLink, AppShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { RoomDashboardView } from "./components/detail/RoomDashboardView";
import { JoinNameStep } from "./components/detail/JoinNameStep";
import { RoomDetailView } from "./components/detail/RoomDetailView";
import { RoomEndedView } from "./components/detail/RoomEndedView";
import { RoomResultView } from "./components/detail/RoomResultView";
import type { RoomApiResponse } from "./types/room";

const MOCK_API_ROOM: RoomApiResponse = {
  slug: "abc123",
  name: "우리 언제 밥 한번 먹지",
  category: "MEAL",
  status: "READY",
  responseStatus: undefined,
  hostNickname: "방만든모임장",
  badge: "마감",
  text: "모임장의 확정을 기다리고 있어요",
  dateStart: "2024-05-24",
  dateEnd: "2024-05-26",
  availableDays: [6, 7, 1],
  timeStart: "09:00",
  timeEnd: "22:00",
  deadlineAt: "2026-10-25T23:59:00+09:00",
  participantCount: 6,
  maxParticipants: 8,
};

type View = "detail" | "join-name";

type Props = {
  slug: string;
};

export function RoomDetail({ slug }: Props) {
  const router = useRouter();
  const room = { ...MOCK_API_ROOM, slug };
  const [view, setView] = useState<View>("detail");

  const isGuestDashboard =
    room.responseStatus === "SUBMITTED" || room.responseStatus === "DECLINED";
  const endedReason = getEndedReason(room);
  const isHostResultReady =
    (room.status === "READY" || room.status === "CONFIRM") &&
    !room.responseStatus;

  const handleJoinComplete = (name: string, uuid: string) => {
    router.push(
      `/room/${slug}/schedule?name=${encodeURIComponent(name)}&uuid=${uuid}`,
    );
  };

  if (isGuestDashboard) {
    return (
      <AppShell
        title="모임 자세히 보기"
        leftSlot={<AppBackButton onClick={() => router.back()} />}
        bottomSlot={<RoomDashboardBottomSlot room={room} />}
      >
        <RoomDashboardView room={room} />
      </AppShell>
    );
  }

  if (endedReason) {
    return (
      <AppShell
        leftSlot={<AppLogoLink />}
        bottomSlot={
          <Button size="cta" asChild>
            <Link href="/room">새 모임 만들기</Link>
          </Button>
        }
      >
        <RoomEndedView reason={endedReason} />
      </AppShell>
    );
  }

  if (isHostResultReady) {
    return (
      <AppShell
        title="결과"
        leftSlot={<AppBackButton onClick={() => router.back()} />}
        bottomSlot={
          <div className="flex flex-col gap-2.5">
            <Button size="cta" onClick={() => {}}>
              확정하기
            </Button>
            <Button
              size="cta"
              variant="secondary"
              onClick={() => router.back()}
            >
              취소
            </Button>
          </div>
        }
      >
        <RoomResultView />
      </AppShell>
    );
  }

  if (view === "join-name") {
    return (
      <JoinNameStep
        onBack={() => setView("detail")}
        onComplete={handleJoinComplete}
      />
    );
  }

  return (
    <AppShell
      leftSlot={<AppLogoLink />}
      bottomSlot={
        <Button size="cta" onClick={() => setView("join-name")}>
          참여하기
        </Button>
      }
    >
      <RoomDetailView room={room} />
    </AppShell>
  );
}

function RoomDashboardBottomSlot({ room }: { room: RoomApiResponse }) {
  if (room.status === "COLLECT") {
    return (
      <Button size="cta" variant="outline" onClick={() => {}}>
        제출결과 수정하기
      </Button>
    );
  }

  if (room.status === "READY") {
    return (
      <Button size="cta" onClick={() => {}}>
        모임장 재촉하기
      </Button>
    );
  }

  if (room.status === "CONFIRM") {
    return (
      <Button size="cta" onClick={() => {}}>
        지도 보기
      </Button>
    );
  }

  return (
    <Button size="cta" asChild>
      <Link href="/room">새 모임 만들기</Link>
    </Button>
  );
}

function getEndedReason(room: RoomApiResponse) {
  const { status, responseStatus } = room;

  if (status === "CLOSED") {
    return "closed" as const;
  }

  if (
    responseStatus === "JOINED" &&
    (status === "READY" || status === "CONFIRM")
  ) {
    return "joined-ended" as const;
  }

  return null;
}
