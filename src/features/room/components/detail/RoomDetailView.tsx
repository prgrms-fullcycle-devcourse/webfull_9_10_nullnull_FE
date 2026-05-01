"use client";

import Image from "next/image";
import roomLogo from "@/assets/images/room/logo.svg";
import { RoomTitle } from "@/features/room/components/RoomTitle";
import { RoomInfoList } from "@/features/room/components/RoomInfoList";
import { ParticipationStatus } from "@/features/room/components/ParticipationStatus";
import type { RoomApiResponse } from "@/features/room/types/room";
import {
  formatDate,
  formatTime,
  formatDeadline,
  formatDays,
} from "@/shared/utils/format";

type Props = {
  room: RoomApiResponse;
};

export function RoomDetailView({ room }: Props) {
  return (
    <div className="flex flex-col pb-6">
      {/* 히어로 영역 */}
      <div className="relative flex flex-col items-center gap-3 px-5 pt-8 pb-14">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EDE9FF] via-[#F5F3FF] to-transparent" />
        <div className="relative flex flex-col items-center gap-3">
          <Image
            src={roomLogo}
            alt="모임 로고"
            width={72}
            height={72}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              모임에 초대 되었어요
            </h1>
            <p className="text-sm text-gray-500">
              안 되는 시간을 선택하고 모임을 확장해 보세요
            </p>
          </div>
        </div>
      </div>

      {/* 디테일 카드 */}
      <div className="relative bg-white mx-4 -mt-6 rounded-2xl shadow-sm">
        <RoomTitle
          title={room.name}
          hostName={room.hostNickname}
          category={room.category}
          status={room.badge as Parameters<typeof RoomTitle>[0]["status"]}
        />

        <div className="h-px bg-gray-100" />

        <RoomInfoList
          dateRange={{
            start: formatDate(room.dateStart),
            end: formatDate(room.dateEnd),
          }}
          timeRange={{
            start: formatTime(room.timeStart),
            end: formatTime(room.timeEnd),
          }}
          days={formatDays(room.availableDays)}
          deadline={formatDeadline(room.deadlineAt)}
        />

        <div className="h-px bg-gray-100" />

        <div className="px-5 py-4">
          <ParticipationStatus
            current={room.participantCount ?? 0}
            max={room.maxParticipants ?? 0}
          />
        </div>
      </div>
    </div>
  );
}
