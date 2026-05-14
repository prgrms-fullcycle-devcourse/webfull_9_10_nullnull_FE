"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import type { RoomListItem } from "../../room/types/room";
import {
  ROOM_STATUS_LABEL,
  RoomStatusBadge,
} from "../../room/components/RoomTitle";
import { formatDate } from "@/shared/utils/format";

interface RoomCardProps {
  room: RoomListItem;
}

const CATEGORY_LABEL: Record<string, string> = {
  MEAL: "식사",
  CAFE: "카페",
  DRINK: "술",
  STUDY: "스터디",
  MEETING: "회의",
  EXERCISE: "운동",
  GAME: "게임",
  PARTY: "파티",
  ETC: "기타",
};

export function RoomCard({ room }: RoomCardProps) {
  const statusLabel = ROOM_STATUS_LABEL[room.status];
  const categoryLabel = CATEGORY_LABEL[room.category] || room.category;

  const isConfirmed = room.status === "CONFIRMED";
  const confirmedInfo = room.confirmedMeeting;

  return (
    <Link
      href={`/room/${room.slug}`}
      className="block rounded-2xl border border-border-subtle bg-white p-5 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-secondary-subtle px-2 py-0.5 text-[10px] font-semibold text-secondary-darker">
              {categoryLabel}
            </span>
            <RoomStatusBadge status={statusLabel} />
          </div>
          <h3 className="line-clamp-1 text-base font-bold text-text-primary">
            {room.name}
          </h3>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-border-subtle pt-4">
        {isConfirmed && confirmedInfo ? (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
              <span className="icon icon-calendar size-3!" aria-hidden="true" />
              <span className="font-medium text-info">
                {formatDate(confirmedInfo.startAt.split("T")[0])}{" "}
                {confirmedInfo.startAt.split("T")[1].substring(0, 5)}
              </span>
            </div>
            {confirmedInfo.placeName && (
              <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
                <span
                  className="icon icon-location size-3!"
                  aria-hidden="true"
                />
                <span className="line-clamp-1">{confirmedInfo.placeName}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                <Users className="size-3.5" />
              </div>
              <span className="text-xs text-text-tertiary">
                {room.hostNickname} 님의 모임
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-text-primary">
                {room.submittedCount}
              </span>
              <span className="text-[10px] text-text-disabled">
                / {room.participantCount}명 제출
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
