import { use } from "react";
import { SchedulePage } from "@/features/room/components/schedule/SchedulePage";
import type { RoomApiResponse } from "@/features/room/types/room";

const MOCK_ROOM: RoomApiResponse = {
  slug: "abc123",
  name: "우리 언제 밥 한번 먹지",
  category: "MEAL",
  status: "COLLECTING",
  hostNickname: "발넓은모임장",
  badge: "진행중",
  text: "안 되는 시간을 선택하고 모임을 확장해 보세요",
  dateStart: "2026-05-30",
  dateEnd: "2026-06-12",
  availableDays: [1, 3, 5, 6],
  timeStart: "09:00",
  timeEnd: "13:00",
  deadlineAt: "2026-10-25T23:59:00+09:00",
  participantCount: 6,
  maxParticipants: 8,
  collectOrigin: true,
};

export default function ScheduleRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <SchedulePage slug={slug} room={MOCK_ROOM} />;
}
