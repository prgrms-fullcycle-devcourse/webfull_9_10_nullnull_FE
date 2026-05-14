"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { AppIconLink, AppShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { LoadingView } from "@/components/visual/LoadingView";
import { AppDialog } from "@/components/dialog";
import { TimeTable } from "./components/schedule/TimeTable";
import { useRoomJoinStore } from "@/store/useRoomJoinStore";
import { useFeedbackStore } from "@/features/room/model/useFeedbackStore";
import { useRoomDetail, roomKeys } from "@/features/room/hooks/useRoomDetail";
import { roomApi } from "@/features/room/api/room.api";

function generateDates(
  dateStart: string,
  dateEnd: string,
  availableDays: number[],
): Date[] {
  const dates: Date[] = [];
  const end = new Date(dateEnd);
  for (const d = new Date(dateStart); d <= end; d.setDate(d.getDate() + 1)) {
    const dow = d.getDay();
    if (availableDays.includes(dow)) dates.push(new Date(d));
  }
  return dates;
}

function generateTimeSlots(timeStart: string, timeEnd: string): string[] {
  const slots: string[] = [];
  let [h, m] = timeStart.split(":").map(Number);
  const [eh, em] = timeEnd.split(":").map(Number);
  while (h < eh || (h === eh && m < em)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += 30;
    if (m >= 60) {
      h++;
      m -= 60;
    }
  }
  return slots;
}

type Props = {
  slug: string;
  onBack?: () => void;
};

export function SchedulePage({ slug, onBack }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useRoomDetail(slug);
  const { setBlockedSlots, clear } = useRoomJoinStore();
  const setFeedback = useFeedbackStore((s) => s.set);
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const slotsInitialized = useRef(false);

  useEffect(() => {
    if (
      !data ||
      data.viewer.participantStatus !== "SUBMITTED" ||
      slotsInitialized.current
    )
      return;
    const timeSlots = generateTimeSlots(data.room.timeStart, data.room.timeEnd);
    const keys = (data.mySubmission?.blockedSlots ?? []).map(
      ({ date, slotIndex }) => `${date}_${timeSlots[slotIndex]}`,
    );
    setSelectedSlots(new Set(keys));
    slotsInitialized.current = true;
  }, [data]);

  useEffect(() => {
    if (!data) return; // 데이터가 로딩될 때까지 대기

    const status = data?.viewer.participantStatus;
    if (
      data?.viewer.role === "GUEST" ||
      (status !== "JOINED" && status !== "SUBMITTED") ||
      data?.room.status !== "COLLECTING"
    ) {
      router.replace(`/room/${slug}`);
    }
  }, [data, router, slug]);

  if (isLoading || !data) {
    return (
      <AppShell
        leftSlot={
          <AppIconLink
            icon="back"
            label="뒤로가기"
            onClick={onBack ?? (() => router.back())}
          />
        }
      >
        <LoadingView className="min-h-[calc(100dvh-var(--layout-header-height))]" />
      </AppShell>
    );
  }

  if (isError) {
    return (
      <AppShell
        leftSlot={
          <AppIconLink
            icon="back"
            label="뒤로가기"
            onClick={onBack ?? (() => router.back())}
          />
        }
      >
        <AppDialog
          type="alert"
          open={true}
          title="방 정보를 불러오지 못했어요"
          description="잠시 후 다시 시도해주세요."
          actions={[
            { label: "확인", onClick: () => router.replace(`/room/${slug}`) },
          ]}
        />
      </AppShell>
    );
  }

  const { room, viewer } = data;

  if (
    viewer.role === "GUEST" ||
    (viewer.participantStatus !== "JOINED" &&
      viewer.participantStatus !== "SUBMITTED") ||
    room.status !== "COLLECTING"
  ) {
    return null;
  }

  const dates = generateDates(room.dateStart, room.dateEnd, room.availableDays);
  const timeSlots = generateTimeSlots(room.timeStart, room.timeEnd);

  const handleNext = async () => {
    const timeSlots = generateTimeSlots(room.timeStart, room.timeEnd);
    const slotsByDate = new Map<string, number[]>();
    for (const key of selectedSlots) {
      const [date, time] = key.split("_");
      const idx = timeSlots.indexOf(time);
      if (!slotsByDate.has(date)) slotsByDate.set(date, []);
      slotsByDate.get(date)!.push(idx);
    }
    const blockedSlots = [...slotsByDate.entries()].map(
      ([date, slotIndexes]) => ({
        date,
        slotIndexes,
      }),
    );

    if (room.collectOrigin) {
      setBlockedSlots(blockedSlots);
      router.push(`/room/${slug}/location`);
    } else {
      if (viewer.participantId) {
        await roomApi.submitParticipation(viewer.participantId, {
          blockedSlots,
        });
      }
      await queryClient.invalidateQueries({ queryKey: roomKeys.detail(slug) });
      clear();
      setFeedback("waiting");
      router.push(`/room/${slug}`);
    }
  };

  const handleAbsent = async () => {
    if (viewer.participantId) {
      await roomApi.declineRoom(viewer.participantId);
    }
    await queryClient.invalidateQueries({ queryKey: roomKeys.detail(slug) });
    setFeedback("absent");
    router.push(`/room/${slug}`);
  };

  return (
    <AppShell
      title={<span className="text-base">모임 참여하기</span>}
      leftSlot={
        <AppIconLink
          icon="back"
          label="뒤로가기"
          onClick={onBack ?? (() => router.back())}
        />
      }
      bottomSlot={
        <>
          <Button onClick={handleNext}>다음</Button>
          <Button variant="ghost" onClick={handleAbsent}>
            이번 모임은 안 나갈래요
          </Button>
        </>
      }
    >
      <div className="flex min-w-0 flex-col gap-5 px-4 py-5">
        <div>
          <h2 className="text-2xl font-bold leading-tight text-gray-950">
            안되는 시간 고르기
          </h2>
          <p className="mt-3 text-lg font-medium text-gray-400 leading-relaxed">
            선택하신 시간을 빼고 우리만의 널널한 시간을 찾아낼게요
          </p>
        </div>

        <TimeTable
          dates={dates}
          timeSlots={timeSlots}
          selectedSlots={selectedSlots}
          onChange={setSelectedSlots}
        />
      </div>
    </AppShell>
  );
}
