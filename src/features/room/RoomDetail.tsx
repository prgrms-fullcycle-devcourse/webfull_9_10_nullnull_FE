"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppLogoLink, AppShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { RoomDetailView } from "./components/detail/RoomDetailView";
import { JoinNameStep } from "./components/detail/JoinNameStep";
import { RoomEndedView } from "./components/detail/RoomEndedView";
import type { RoomApiResponse } from "./types/room";

const MOCK_API_ROOM: RoomApiResponse = {
  slug: "abc123",
  name: "주말 홍대 보드게임 모임",
  category: "MEAL",
  status: "CONFIRMED",
  hostNickname: "발넓은모임장",
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
  const isEnded = MOCK_API_ROOM.status === "CLOSED";

  const handleJoinComplete = (name: string, uuid: string) => {
    router.push(
      `/room/${slug}/schedule?name=${encodeURIComponent(name)}&uuid=${uuid}`,
    );
  };

  if (isEnded) {
    return (
      <AppShell
        leftSlot={<AppLogoLink />}
        bottomSlot={
          <Button size="cta" asChild>
            <Link href="/room">새 모임 만들기</Link>
          </Button>
        }
      >
        <RoomEndedView />
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
