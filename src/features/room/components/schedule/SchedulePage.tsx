"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { TimeTable } from "./TimeTable";
import { useRoomJoinStore } from "@/store/useRoomJoinStore";
import { useFeedbackStore } from "@/features/room/model/useFeedbackStore";
import type { RoomApiResponse } from "@/features/room/types/room";

function generateDates(
  dateStart: string,
  dateEnd: string,
  availableDays: number[],
): Date[] {
  const dates: Date[] = [];
  const end = new Date(dateEnd);
  for (const d = new Date(dateStart); d <= end; d.setDate(d.getDate() + 1)) {
    const dow = d.getDay();
    const iso = dow === 0 ? 7 : dow;
    if (availableDays.includes(iso)) dates.push(new Date(d));
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
  room: RoomApiResponse;
};

export function SchedulePage({ slug, room }: Props) {
  const router = useRouter();
  const { name, uuid, clear } = useRoomJoinStore();
  const setFeedback = useFeedbackStore((s) => s.set);
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());

  const dates = generateDates(room.dateStart, room.dateEnd, room.availableDays);
  const timeSlots = generateTimeSlots(room.timeStart, room.timeEnd);

  const handleNext = () => {
    // TODO: name, uuid, selectedSlots를 API로 제출
    console.log({ name, uuid, selectedSlots: [...selectedSlots] });

    clear();

    if (room.collectOrigin) {
      router.push(`/room/${slug}/location`);
    } else {
      setFeedback("waiting");
      router.push(`/room/${slug}`);
    }
  };

  const handleAbsent = () => {
    setFeedback("absent");
    router.push(`/room/${slug}`);
  };

  return (
    <AppShell
      title={<span className="text-base">모임 참여하기</span>}
      leftSlot={
        <button
          onClick={() => router.back()}
          className="icon icon-back"
          aria-label="뒤로가기"
        />
      }
      bottomSlot={
        <div className="flex flex-col gap-1">
          <Button size="cta" onClick={handleNext}>
            다음
          </Button>
          <button
            onClick={handleAbsent}
            className="flex items-center justify-center h-11 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            이번 모임은 안 나갈래요
          </button>
        </div>
      }
    >
      <div className="px-5 py-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-900">
            안되는 시간 고르기
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
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
