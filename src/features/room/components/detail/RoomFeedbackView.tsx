"use client";

import positiveTitleBg from "@/assets/images/components/bg_positive_title.svg";
import pulseStyles from "@/components/visual/LogoPulse.module.css";
import { RoomParticipationProgressCard } from "@/features/room/components/RoomParticipationProgressCard";
import {
  RoomStatusBadge,
  ROOM_STATUS_LABEL,
} from "@/features/room/components/RoomTitle";
import type { RoomApiResponse } from "@/features/room/types/room";

export type RoomFeedbackResult = "waiting" | "absent";

const COPY: Record<
  RoomFeedbackResult,
  {
    title: string;
    description: string[];
    attendanceLabel: string;
    attendanceTone: "success" | "danger";
    showLocation: boolean;
  }
> = {
  waiting: {
    title: "결과를 기다리고있어요",
    description: [
      "모든 멤버가 입력을 마치면",
      "가장 널널한 시간을 바로 알려드릴게요",
    ],
    attendanceLabel: "참여",
    attendanceTone: "success",
    showLocation: true,
  },
  absent: {
    title: "불참 소식을 전달했어요",
    description: ["다음에는 꼭 함께할 수 있는", "널널한 시간에 만나요"],
    attendanceLabel: "불참",
    attendanceTone: "danger",
    showLocation: false,
  },
};

type Props = {
  result: RoomFeedbackResult;
  roomStatus: RoomApiResponse["status"];
};

export function RoomFeedbackView({ result, roomStatus }: Props) {
  const copy = COPY[result];
  const dotClassName =
    copy.attendanceTone === "success" ? "bg-success" : "bg-danger";

  return (
    <div className="flex min-h-[inherit] flex-col">
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
          {copy.title}
        </h1>
        <div className="mt-2 text-sm leading-[18px] text-text-disabled">
          {copy.description.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5 px-4 pt-5">
        <RoomParticipationProgressCard current={6} max={8} />

        <div className="rounded-2xl border border-border-subtle bg-white p-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <h2 className="text-lg font-bold leading-6 text-text-primary">
              우리 언제 밥 한번 먹지
            </h2>
            <RoomStatusBadge status={ROOM_STATUS_LABEL[roomStatus]} />
          </div>

          <div className="flex flex-col gap-3 pt-4 text-sm leading-[18px]">
            <div className="flex items-center justify-between">
              <span className="text-text-tertiary">참석 여부</span>
              <span className="flex items-center gap-1 font-bold text-text-primary">
                <span className={`size-2 rounded-full ${dotClassName}`} />
                {copy.attendanceLabel}
              </span>
            </div>

            {copy.showLocation && (
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">출발지</span>
                <span className="font-bold text-text-primary">
                  부산 앞 바다
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
