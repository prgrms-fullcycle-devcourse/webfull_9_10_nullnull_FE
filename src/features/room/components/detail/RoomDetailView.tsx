"use client";

import positiveTitleBg from "@/assets/images/components/bg_positive_title.svg";
import pulseStyles from "@/components/visual/LogoPulse.module.css";
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
    <div className="flex min-h-[inherit] flex-col">
      {/* 로고 히어로 */}
      <section
        className="relative flex w-full flex-col items-center overflow-hidden bg-contain bg-center bg-no-repeat bg-position-[center_top_-2rem] px-4 pb-5 pt-5 text-center"
        style={{ backgroundImage: `url(${positiveTitleBg.src})` }}
      >
        <div
          className={`${pulseStyles.pulse} ${pulseStyles.blue} flex size-20 items-center justify-center rounded-full bg-info/10`}
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-default to-info text-white shadow-[0_8px_20px_-6px_rgba(91,110,225,0.4)]">
            <span
              className="icon icon-logo size-[38px]"
              aria-label="NULLNULL"
            />
          </div>
        </div>
        <h1 className="mt-7 text-2xl font-bold leading-8 text-gray-950">
          모임에 초대 되었어요
        </h1>
        <p className="mt-2 text-sm leading-[18px] text-text-disabled">
          안 되는 시간을 선택하고 모임을 확장해 보세요
        </p>
      </section>

      {/* 카드 영역 */}
      <div className="flex flex-col gap-4 px-4 pt-5 pb-6">
        {/* 방 정보 카드 */}
        <div className="rounded-2xl border border-border-subtle bg-white">
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
        </div>

        {/* 참여 현황 카드 */}
        <div className="rounded-2xl border border-border-subtle bg-white px-5 py-4">
          <ParticipationStatus
            current={room.participantCount ?? 0}
            max={room.maxParticipants ?? 0}
          />
        </div>
      </div>
    </div>
  );
}
