"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { AgreementDialog, AppDialog } from "@/components/dialog";
import { AppIconLink, AppLogoLink, AppShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { LoadingView } from "@/components/visual/LoadingView";
import { useRoomJoinStore } from "@/store/useRoomJoinStore";

import { JoinNameStep } from "./components/detail/JoinNameStep";
import { RoomDashboardView } from "./components/detail/RoomDashboardView";
import { RoomDetailView } from "./components/detail/RoomDetailView";
import { RoomEndedView } from "./components/detail/RoomEndedView";
import { RoomFeedbackView } from "./components/detail/RoomFeedbackView";
import { RoomResultView } from "./components/detail/RoomResultView";
import { useFeedbackStore } from "@/features/room/model/useFeedbackStore";
import { useRoomDetail, roomKeys } from "./hooks/useRoomDetail";
import { roomApi } from "./api/room.api";
import type { RoomApiResponse, RoomDetailData } from "./types/room";

type View = "detail" | "join-name" | "result";

type Props = {
  slug: string;
};

export function RoomDetail({ slug }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useRoomDetail(slug);
  const [view, setView] = useState<View>("detail");
  const [joinError, setJoinError] = useState("");
  const setJoin = useRoomJoinStore((state) => state.set);

  const room = useMemo(
    () => (data ? toRoomApiResponse(data, slug) : null),
    [data, slug],
  );
  const feedbackResult = useFeedbackStore((s) => s.result);
  const clearFeedback = useFeedbackStore((s) => s.clear);

  useEffect(() => {
    if (!feedbackResult) return;
    const timer = setTimeout(() => clearFeedback(), 3000);
    return () => clearTimeout(timer);
  }, [feedbackResult, clearFeedback]);

  if (isError) {
    return (
      <AppShell leftSlot={<AppLogoLink />}>
        <AppDialog
          type="alert"
          open={true}
          title="방 정보를 불러오지 못했어요"
          description="존재하지 않는 방이거나 일시적인 오류입니다."
          actions={[{ label: "확인", onClick: () => router.replace("/") }]}
        />
      </AppShell>
    );
  }

  if (isLoading || !data || !room) {
    return (
      <AppShell leftSlot={<AppLogoLink />}>
        <LoadingView className="min-h-[calc(100dvh-var(--layout-header-height))]" />
      </AppShell>
    );
  }

  const { viewer, summary } = data;

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

  const handleJoinClick = () => {
    setView("join-name");
  };

  const handleJoinComplete = async (name: string) => {
    try {
      await roomApi.joinRoom(data.room.roomId, name);
      setJoin(name, "");
      await queryClient.invalidateQueries({ queryKey: roomKeys.detail(slug) });
      router.push(`/room/${slug}/schedule`);
    } catch (err: any) {
      const code = err?.response?.data?.error;
      if (code === "ALREADY_PARTICIPATED") {
        setJoinError("이미 참여 중인 방입니다.");
      } else if (code === "INVALID_ROOM_STATUS") {
        setJoinError("현재 참여할 수 없는 방입니다.");
      } else {
        setJoinError("참여 중 오류가 발생했어요. 다시 시도해주세요.");
      }
    }
  };

  const handleCloseCollecting = () => {
    queryClient.setQueryData(roomKeys.detail(slug), (prev: RoomDetailData) => ({
      ...prev,
      room: {
        ...prev.room,
        status: "READY" as const,
        badge: "마감",
        text: "모임장의 확정을 기다리고 있어요",
      },
    }));
    setView("result");
  };

  if (feedbackResult) {
    return (
      <AppShell leftSlot={<AppLogoLink />}>
        <RoomFeedbackView
          result={feedbackResult}
          room={roomForComponents}
          originName={data.mySubmission?.origin?.placeName}
        />
      </AppShell>
    );
  }

  if (view === "result" && canHostOpenResult) {
    return (
      <AppShell
        title="모임 확정하기"
        leftSlot={
          <AppIconLink
            icon="back"
            label="뒤로가기"
            onClick={() => setView("detail")}
          />
        }
        rightSlot={<AppIconLink icon="share" label="공유하기" />}
        bottomSlot={<Button onClick={() => {}}>선택완료</Button>}
      >
        <RoomResultView />
      </AppShell>
    );
  }

  if (isMemberDashboard || isHostDashboard) {
    return (
      <AppShell
        title="모임 자세히 보기"
        leftSlot={
          <AppIconLink
            icon="back"
            label="뒤로가기"
            onClick={() => router.back()}
          />
        }
        rightSlot={<AppIconLink icon="share" label="공유하기" />}
        bottomSlot={
          <RoomDashboardBottomSlot
            room={roomForComponents}
            onCloseCollecting={handleCloseCollecting}
            onOpenResult={() => setView("result")}
            onEditSubmission={() => router.push(`/room/${slug}/schedule`)}
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
          <Button asChild>
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
      <>
        <JoinNameStep
          role="guest"
          nickname={viewer.nickname}
          onBack={() => setView("detail")}
          onComplete={handleJoinComplete}
        />
        <AppDialog
          type="alert"
          open={!!joinError}
          title="참여에 실패했어요"
          description={joinError}
          actions={[{ label: "확인", onClick: () => setJoinError("") }]}
        />
      </>
    );
  }

  const isMemberJoined =
    viewer.role === "MEMBER" && viewer.participantStatus === "JOINED";

  return (
    <AppShell
      leftSlot={<AppLogoLink />}
      bottomSlot={
        isMemberJoined ? (
          <Button onClick={() => router.push(`/room/${slug}/schedule`)}>
            참여하기
          </Button>
        ) : viewer.consentRequired ? (
          <AgreementDialog onAgree={handleJoinClick}>
            <Button>참여하기</Button>
          </AgreementDialog>
        ) : (
          <Button onClick={handleJoinClick}>참여하기</Button>
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
  onEditSubmission,
}: {
  room: RoomApiResponse;
  onCloseCollecting: () => void;
  onOpenResult: () => void;
  onEditSubmission: () => void;
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
          <Button>모집 마감하기</Button>
        </AppDialog>
        <Button
          variant="ghost"
          className="h-10 text-sm font-semibold text-text-primary"
          onClick={onEditSubmission}
        >
          제출결과 수정하기
        </Button>
      </div>
    );
  }

  if (room.viewerRole === "HOST" && room.status === "READY") {
    return <Button onClick={onOpenResult}>모임 확정하기</Button>;
  }

  if (room.status === "COLLECTING") {
    return (
      <Button variant="outline" onClick={onEditSubmission}>
        제출결과 수정하기
      </Button>
    );
  }

  if (room.status === "READY") {
    return <Button onClick={() => {}}>모임장 재촉하기</Button>;
  }

  if (room.status === "CONFIRMED") {
    return <Button onClick={() => {}}>지도 보기</Button>;
  }

  return (
    <Button asChild>
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
