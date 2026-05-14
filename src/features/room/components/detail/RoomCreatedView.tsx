"use client";

import positiveTitleBg from "@/assets/images/components/bg_positive_title.svg";
import { Switch } from "@/components/ui/switch";
import pulseStyles from "@/components/visual/LogoPulse.module.css";
import { RoomInfoList } from "@/features/room/components/RoomInfoList";
import { RoomTitle } from "@/features/room/components/RoomTitle";
import type { RoomApiResponse } from "@/features/room/types/room";
import {
  formatDate,
  formatDeadline,
  formatDays,
  formatTime,
} from "@/shared/utils/format";

type Props = {
  room: RoomApiResponse;
};

export function RoomCreatedView({ room }: Props) {
  return (
    <div className="relative flex min-h-[inherit] flex-col overflow-hidden bg-gray-50 pb-8">
      <div
        className="pointer-events-none absolute left-1/2 top-[-40px] z-0 h-[300px] w-[120%] max-w-[500px] -translate-x-1/2 bg-contain bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: `url(${positiveTitleBg.src})` }}
      />

      <section className="relative z-10 flex flex-col items-center px-5 pb-10 pt-[60px] text-center">
        <div
          className={`${pulseStyles.pulse} ${pulseStyles.blue} mb-6 flex size-20 items-center justify-center rounded-full bg-info/10`}
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-default to-info text-white shadow-[0_8px_20px_-6px_rgba(91,110,225,0.4)]">
            <span
              className="icon icon-logo size-[38px]"
              aria-label="NULLNULL"
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold leading-8 text-text-primary">
          모임을 만들었어요
        </h1>
        <p className="mt-3 text-sm font-medium leading-[18px] text-text-tertiary">
          이제 안 되는 시간을 입력하고
          <br />
          참여자들에게 링크를 공유해 주세요
        </p>
      </section>

      <div className="relative z-20 flex flex-col gap-4 px-5">
        <div className="flex items-center justify-between rounded-3xl border border-border-subtle bg-white px-5 py-4">
          <span className="text-sm font-bold leading-[18px] text-text-primary">
            모임원이 들어오면 알림 받기
          </span>
          <Switch />
        </div>

        <div className="rounded-3xl border border-border-subtle bg-white">
          <RoomTitle
            title={room.name}
            hostName={room.hostNickname}
            category={room.category}
            status={room.badge as Parameters<typeof RoomTitle>[0]["status"]}
          />

          <div className="h-px bg-border-subtle" />

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
      </div>
    </div>
  );
}
