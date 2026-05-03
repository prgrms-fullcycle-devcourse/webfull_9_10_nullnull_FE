"use client";

import negativeTitleBg from "@/assets/images/components/bg_negative_title.svg";
import pulseStyles from "@/components/visual/LogoPulse.module.css";
import { RoomCardsAnimation } from "@/components/visual/RoomCardsAnimation";

export type RoomEndedReason = "closed" | "joined-ended";

const COPY: Record<RoomEndedReason, { title: string; description: string[] }> =
  {
    closed: {
      title: "이미 모집이 끝났어요",
      description: [
        "인원이 찼거나 기한이 지났을 수 있어요",
        "직접 새로운 모임을 만들어볼까요?",
      ],
    },
    "joined-ended": {
      title: "제출하지 못한 채 마감됐어요",
      description: [
        "일정 입력을 마치기 전에 약속 잡기가 끝났어요",
        "아쉽지만 다음 모임에서 만나요",
      ],
    },
  };

type Props = {
  reason?: RoomEndedReason;
};

export function RoomEndedView({ reason = "closed" }: Props) {
  const copy = COPY[reason];

  return (
    <div className="flex min-h-[inherit] flex-col">
      <section
        className="relative flex w-full flex-1 flex-col items-center overflow-hidden bg-contain bg-center bg-no-repeat bg-position-[center_top_-2rem] px-4 pb-[200px] pt-5 text-center"
        style={{ backgroundImage: `url(${negativeTitleBg.src})` }}
      >
        <div
          className={`${pulseStyles.pulse} ${pulseStyles.orange} flex size-20 items-center justify-center rounded-full bg-warning/10`}
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-danger to-warning text-white shadow-[0_8px_20px_-6px_rgba(241,87,75,0.4)]">
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

        <RoomCardsAnimation />
      </section>
    </div>
  );
}
