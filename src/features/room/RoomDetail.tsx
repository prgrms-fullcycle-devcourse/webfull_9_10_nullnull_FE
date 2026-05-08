"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  AppBackButton,
  AppLogoLink,
  AppShareButton,
  AppShell,
} from "@/components/layout";
import { AppDialog } from "@/components/dialog";
import { Button } from "@/components/ui/button";
import { useRoomJoinStore } from "@/store/useRoomJoinStore";

import { JoinNameStep } from "./components/detail/JoinNameStep";
import { PrivacyConsentSheet } from "./components/detail/PrivacyConsentSheet";
import { RoomDashboardView } from "./components/detail/RoomDashboardView";
import { RoomDetailView } from "./components/detail/RoomDetailView";
import { RoomEndedView } from "./components/detail/RoomEndedView";
import { RoomResultView } from "./components/detail/RoomResultView";
import type { RoomApiResponse, RoomDetailData } from "./types/room";

const MOCK_DETAIL_DATA: RoomDetailData = {
  viewer: {
    role: "MEMBER",
    participantStatus: "SUBMITTED",
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
    text: "안 되는 시간을 선택하고 모임을 확정해 보세요",
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
    submittedRatio: 75,
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

type View = "detail" | "join-name" | "result";

type Props = {
  slug: string;
};

export function RoomDetail({ slug }: Props) {
  const router = useRouter();
  const [data, setData] = useState<RoomDetailData>(MOCK_DETAIL_DATA);
  const [view, setView] = useState<View>("detail");
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const setJoin = useRoomJoinStore((state) => state.set);

  const room = useMemo(() => toRoomApiResponse(data, slug), [data, slug]);
  const { viewer, summary } = data;

  const isMemberDashboard =
    viewer.role === "MEMBER" &&
    (viewer.participantStatus === "SUBMITTED" ||
      viewer.participantStatus === "DECLINED");
  const isHostDashboard =
    viewer.role === "HOST" &&
    (room.status === "COLLECTING" ||
      room.status === "READY" ||
      room.status === "CONFIRMED" ||
      room.status === "CLOSED");
  const canHostOpenResult =
    viewer.role === "HOST" &&
    (room.status === "READY" || room.status === "CONFIRMED");
  const endedReason = getEndedReason(data);

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
    viewerRole: viewer.role,
    role: viewer.role.toLowerCase() as RoomApiResponse["role"],
    nickname: viewer.nickname,
    participantCount:
      summary.submittedCount + summary.declinedCount + summary.joinedCount,
    maxParticipants: summary.totalCount,
  };

  const handleJoinClick = () => {
    if (viewer.consentRequired) {
      setPrivacyOpen(true);
    } else {
      setView("join-name");
    }
  };

  const handleJoinComplete = (name: string, uuid: string) => {
    setJoin(name, uuid);
    router.push(`/room/${slug}/schedule`);
  };

  const handleCloseCollecting = () => {
    setData((currentData) => ({
      ...currentData,
      room: {
        ...currentData.room,
        status: "READY",
        badge: "마감",
        text: "모임장의 확정을 기다리고 있어요",
      },
    }));
    setView("result");
  };

  if (view === "result" && canHostOpenResult) {
    return (
      <AppShell
        title="모임 확정하기"
        leftSlot={<AppBackButton onClick={() => setView("detail")} />}
        rightSlot={<AppShareButton />}
        bottomSlot={
          <Button size="cta" onClick={() => {}}>
            선택완료
          </Button>
        }
      >
        <RoomResultView />
      </AppShell>
    );
  }

  if (isMemberDashboard || isHostDashboard) {
    return (
      <AppShell
        title="모임 자세히 보기"
        leftSlot={<AppBackButton onClick={() => router.back()} />}
        rightSlot={<AppShareButton />}
        bottomSlot={
          <RoomDashboardBottomSlot
            room={roomForComponents}
            onCloseCollecting={handleCloseCollecting}
            onOpenResult={() => setView("result")}
          />
        }
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

function RoomDashboardBottomSlot({
  room,
  onCloseCollecting,
  onOpenResult,
}: {
  room: RoomApiResponse;
  onCloseCollecting: () => void;
  onOpenResult: () => void;
}) {
  if (room.viewerRole === "HOST" && room.status === "COLLECTING") {
    return (
      <div className="flex flex-col gap-3">
        <AppDialog
          type="confirm"
          title="모집을 마감할까요?"
          description="모집을 마감하면 더 이상 답변을 받을 수 없어요"
          actions={[
            { label: "취소", variant: "secondary" },
            { label: "마감하기", onClick: onCloseCollecting },
          ]}
        >
          <Button size="cta">모집 마감하기</Button>
        </AppDialog>
        <Button
          size="cta"
          variant="ghost"
          className="h-10 text-sm font-semibold text-text-primary"
          onClick={() => {}}
        >
          제출결과 수정하기
        </Button>
      </div>
    );
  }

  if (room.viewerRole === "HOST" && room.status === "READY") {
    return (
      <Button size="cta" onClick={onOpenResult}>
        모임 확정하기
      </Button>
    );
  }

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

function toRoomApiResponse(
  data: RoomDetailData,
  slug: string,
): RoomApiResponse {
  const { viewer, room, summary } = data;

  return {
    ...room,
    slug,
    participantStatus: viewer.participantStatus,
    viewerRole: viewer.role,
    participantCount:
      summary.submittedCount + summary.declinedCount + summary.joinedCount,
    maxParticipants: summary.totalCount,
  };
}
