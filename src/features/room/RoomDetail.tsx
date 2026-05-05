"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AppBackButton, AppLogoLink, AppShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { RoomDashboardView } from "./components/detail/RoomDashboardView";
import { JoinNameStep } from "./components/detail/JoinNameStep";
import { RoomDetailView } from "./components/detail/RoomDetailView";
import { RoomEndedView } from "./components/detail/RoomEndedView";
import { RoomResultView } from "./components/detail/RoomResultView";
import { PrivacyConsentSheet } from "./components/detail/PrivacyConsentSheet";
import { useRoomJoinStore } from "@/store/useRoomJoinStore";
import type { RoomApiResponse, RoomDetailData } from "./types/room";

const MOCK_DETAIL_DATA: RoomDetailData = {
  viewer: {
    role: "GUEST",
    participantStatus: undefined,
    nickname: undefined,
    consentRequired: true,
  },
  room: {
    slug: "abc123",
    name: "우리 언제 밥 한번 먹지",
    category: "MEAL",
    status: "COLLECTING",
    hostNickname: "방만든모임장",
    badge: "진행중",
    text: "안 되는 시간을 선택하고 모임을 확장해 보세요",
    dateStart: "2026-05-24",
    dateEnd: "2026-05-26",
    availableDays: [6, 7, 1],
    timeStart: "09:00",
    timeEnd: "22:00",
    collectOrigin: true,
    deadlineAt: "2026-10-25T23:59:00+09:00",
  },
  summary: {
    totalCount: 8,
    submittedCount: 4,
    declinedCount: 1,
    joinedCount: 1,
    submittedRatio: 55,
  },
  participants: {
    submitted: ["김철수", "이영희", "박민수", "정지원"],
    declined: ["최동훈"],
    joined: ["강유리"],
  },
  mySubmission: null,
  confirmedMeeting: null,
  closed: null,
};

// 테스트할 케이스로 viewer.role / room.status 조합 변경
// viewer.role: "HOST" | "MEMBER" | "GUEST"
// room.status: "COLLECTING" | "READY" | "CONFIRMED" | "CLOSED"

type View = "detail" | "join-name";

type Props = {
  slug: string;
};

export function RoomDetail({ slug }: Props) {
  const router = useRouter();
  const data: RoomDetailData = {
    ...MOCK_DETAIL_DATA,
    room: { ...MOCK_DETAIL_DATA.room, slug },
  };
  const [view, setView] = useState<View>("detail");
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const { viewer, room, summary } = data;

  useEffect(() => {
    if (
      viewer.role === "MEMBER" &&
      viewer.participantStatus === "JOINED" &&
      room.status === "COLLECTING"
    ) {
      router.replace(`/room/${slug}/schedule`);
    }
  }, [viewer.role, viewer.participantStatus, room.status, slug, router]);

  const roomForComponents: RoomApiResponse = {
    ...room,
    participantStatus: viewer.participantStatus,
    role: viewer.role === "GUEST" ? "guest" : "member",
    nickname: viewer.nickname,
    participantCount:
      summary.submittedCount + summary.declinedCount + summary.joinedCount,
    maxParticipants: summary.totalCount,
  };

  const isMemberDashboard =
    viewer.role === "MEMBER" &&
    (viewer.participantStatus === "SUBMITTED" ||
      viewer.participantStatus === "DECLINED");

  const endedReason = getEndedReason(data);

  const isHostResultReady =
    viewer.role === "HOST" &&
    (room.status === "READY" || room.status === "CONFIRMED");

  const handleJoinClick = () => {
    if (viewer.consentRequired) {
      setPrivacyOpen(true);
    } else {
      setView("join-name");
    }
  };

  const setJoin = useRoomJoinStore((s) => s.set);

  const handleJoinComplete = (name: string, uuid: string) => {
    setJoin(name, uuid);
    router.push(`/room/${slug}/schedule`);
  };

  if (isMemberDashboard) {
    return (
      <AppShell
        title="모임 자세히 보기"
        leftSlot={<AppBackButton onClick={() => router.back()} />}
        bottomSlot={<RoomDashboardBottomSlot room={roomForComponents} />}
      >
        <RoomDashboardView room={roomForComponents} />
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
        role="guest"
        nickname={viewer.nickname}
        onBack={() => setView("detail")}
        onComplete={handleJoinComplete}
      />
    );
  }

  return (
    <AppShell
      leftSlot={<AppLogoLink />}
      bottomSlot={
        <Button size="cta" onClick={handleJoinClick}>
          참여하기
        </Button>
      }
      overlaySlot={
        privacyOpen && (
          <PrivacyConsentSheet
            onClose={() => setPrivacyOpen(false)}
            onAgree={() => {
              setPrivacyOpen(false);
              setView("join-name");
            }}
          />
        )
      }
    >
      <RoomDetailView room={roomForComponents} />
    </AppShell>
  );
}

function RoomDashboardBottomSlot({ room }: { room: RoomApiResponse }) {
  if (room.status === "COLLECTING") {
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

  if (room.status === "CONFIRMED") {
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

function getEndedReason(data: RoomDetailData) {
  const { room, viewer } = data;

  if (
    viewer.role === "GUEST" &&
    (room.status === "READY" ||
      room.status === "CONFIRMED" ||
      room.status === "CLOSED")
  ) {
    return "closed" as const;
  }

  if (
    viewer.role === "MEMBER" &&
    viewer.participantStatus === "JOINED" &&
    (room.status === "READY" ||
      room.status === "CONFIRMED" ||
      room.status === "CLOSED")
  ) {
    return "joined-ended" as const;
  }

  return null;
}
