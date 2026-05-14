"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AgreementDialog, AppDialog } from "@/components/dialog";
import { AppIconLink, AppLogoLink, AppShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { LoadingView } from "@/components/visual/LoadingView";
import { useRoomJoinStore } from "@/store/useRoomJoinStore";

import { JoinNameStep } from "./components/detail/JoinNameStep";
import { RoomCreatedView } from "./components/detail/RoomCreatedView";
import { RoomDashboardView } from "./components/detail/RoomDashboardView";
import { RoomDetailView } from "./components/detail/RoomDetailView";
import { RoomEndedView } from "./components/detail/RoomEndedView";
import { RoomFeedbackView } from "./components/detail/RoomFeedbackView";
import { RoomResultView } from "./components/detail/RoomResultView";
import { useFeedbackStore } from "@/features/room/model/useFeedbackStore";
import { roomApi } from "./api/room.api";
import { roomKeys, useRoomDetail } from "./hooks/useRoomDetail";
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
  const [isClosingCollecting, setIsClosingCollecting] = useState(false);
  const [isConfirmingRoom, setIsConfirmingRoom] = useState(false);
  const [selectedTimeCandidateId, setSelectedTimeCandidateId] = useState<
    number | null
  >(null);
  const [selectedPlaceCandidateId, setSelectedPlaceCandidateId] = useState<
    number | null
  >(null);
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

  const canHostOpenResult =
    data?.viewer.role === "HOST" && room?.status === "READY";
  const { data: candidates } = useQuery({
    queryKey: ["room", data?.room.roomId, "candidates"],
    queryFn: () => roomApi.getCandidates(data!.room.roomId),
    enabled: Boolean(data && view === "result" && canHostOpenResult),
  });
  const currentTimeCandidateId =
    selectedTimeCandidateId ?? candidates?.timeCandidates[0]?.id ?? null;
  const currentPlaceCandidateId = data?.room.collectOrigin
    ? (selectedPlaceCandidateId ?? candidates?.placeCandidates[0]?.id ?? null)
    : null;

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
    participantCount: summary.submittedCount + summary.declinedCount,
    maxParticipants: summary.totalCount,
  };

  const isMemberDashboard =
    viewer.role === "MEMBER" &&
    (viewer.participantStatus === "SUBMITTED" ||
      viewer.participantStatus === "DECLINED");
  const isHostCreated =
    viewer.role === "HOST" &&
    room.status === "COLLECTING" &&
    viewer.participantStatus === "JOINED";
  const isHostDashboard =
    viewer.role === "HOST" &&
    !isHostCreated &&
    (room.status === "COLLECTING" ||
      room.status === "READY" ||
      room.status === "CONFIRMED" ||
      room.status === "CLOSED");
  const endedReason = getEndedReason(data);

  const handleJoinClick = () => {
    setView("join-name");
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/room/${slug}`;
    const shareData = {
      title: "널널 - 모임 시간 정하기",
      text: `[${room.name}] 모임에 초대되었어요!\n가능한 시간을 선택해 주세요.`,
      url: shareUrl,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("링크가 클립보드에 복사되었어요!");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("링크가 클립보드에 복사되었어요!");
      }
    }
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
        setJoinError("참여 중 오류가 발생했어요. 다시 시도해 주세요.");
      }
    }
  };

  const handleCloseCollecting = async () => {
    setIsClosingCollecting(true);

    try {
      await roomApi.readyRoom(data.room.roomId);
      queryClient.setQueryData(
        roomKeys.detail(slug),
        (prev: RoomDetailData) => ({
          ...prev,
          room: {
            ...prev.room,
            status: "READY" as const,
            badge: "마감",
            text: "모임장의 확정을 기다리고 있어요",
          },
        }),
      );
      await queryClient.invalidateQueries({ queryKey: roomKeys.detail(slug) });
      setView("result");
    } catch (error) {
      console.error(error);
      toast.error("모집 마감에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsClosingCollecting(false);
    }
  };

  const handleConfirmRoom = async () => {
    if (!currentTimeCandidateId) {
      toast.error("확정할 시간을 선택해 주세요.");
      return;
    }

    setIsConfirmingRoom(true);

    try {
      await roomApi.confirmRoom(data.room.roomId, {
        timeCandidateId: currentTimeCandidateId,
        placeCandidateId: data.room.collectOrigin
          ? currentPlaceCandidateId
          : null,
      });
      await queryClient.invalidateQueries({ queryKey: roomKeys.detail(slug) });
      setView("detail");
    } catch (error) {
      console.error(error);
      toast.error("모임 확정에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsConfirmingRoom(false);
    }
  };

  if (feedbackResult) {
    return (
      <AppShell leftSlot={<AppLogoLink />}>
        <RoomFeedbackView
          result={feedbackResult}
          room={roomForComponents}
          placeName={data.mySubmission?.origin?.placeName}
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
        rightSlot={
          <AppIconLink icon="share" label="공유하기" onClick={handleShare} />
        }
        bottomSlot={
          <Button
            onClick={handleConfirmRoom}
            disabled={isConfirmingRoom || !currentTimeCandidateId}
          >
            선택완료
          </Button>
        }
      >
        <RoomResultView
          candidates={candidates}
          collectOrigin={data.room.collectOrigin}
          selectedTimeCandidateId={currentTimeCandidateId}
          selectedPlaceCandidateId={currentPlaceCandidateId}
          onSelectTime={setSelectedTimeCandidateId}
          onSelectPlace={setSelectedPlaceCandidateId}
        />
      </AppShell>
    );
  }

  if (isHostCreated) {
    return (
      <AppShell
        leftSlot={<AppLogoLink />}
        bottomSlot={
          <Button onClick={() => router.push(`/room/${slug}/schedule`)}>
            내 일정 입력하기
          </Button>
        }
      >
        <RoomCreatedView room={roomForComponents} />
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
        rightSlot={
          <AppIconLink icon="share" label="공유하기" onClick={handleShare} />
        }
        bottomSlot={
          <RoomDashboardBottomSlot
            room={roomForComponents}
            onCloseCollecting={handleCloseCollecting}
            onOpenResult={() => setView("result")}
            onEditSubmission={() => router.push(`/room/${slug}/schedule`)}
            isClosingCollecting={isClosingCollecting}
          />
        }
      >
        <RoomDashboardView
          room={roomForComponents}
          participants={data.participants}
          confirmedMeeting={data.confirmedMeeting}
        />
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
          nickname={viewer.nickname ?? undefined}
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
  isClosingCollecting,
}: {
  room: RoomApiResponse;
  onCloseCollecting: () => void | Promise<void>;
  onOpenResult: () => void;
  onEditSubmission: () => void;
  isClosingCollecting?: boolean;
}) {
  if (room.viewerRole === "HOST" && room.status === "COLLECTING") {
    return (
      <div className="flex flex-col gap-3" aria-busy={isClosingCollecting}>
        <AppDialog
          type="confirm"
          title="모집을 마감할까요?"
          description="모집을 마감하면 더 이상 답변을 받을 수 없어요"
          actions={[
            { label: "취소", variant: "secondary" },
            {
              label: "마감하기",
              onClick: onCloseCollecting,
              disabled: isClosingCollecting,
            },
          ]}
        >
          <Button disabled={isClosingCollecting}>모집 마감하기</Button>
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
  return { ...data.room, slug };
}
