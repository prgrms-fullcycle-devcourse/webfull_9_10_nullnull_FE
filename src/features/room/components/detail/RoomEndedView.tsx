"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

type SimilarRoom = {
  id: string;
  category: string;
  title: string;
  participantsSummary: string;
};

const SIMILAR_ROOMS: SimilarRoom[] = [
  {
    id: "mock-1",
    category: "전창",
    title: "주말 스터디 일정 조율",
    participantsSummary: "참여자 4/6명에 합류 완료",
  },
  {
    id: "mock-2",
    category: "주말",
    title: "주말 스터디 일정 조율",
    participantsSummary: "참여자 4/6명에 합류 완료",
  },
];

export function RoomEndedView() {
  return (
    <div className="px-5 py-8 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center py-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl mb-1">
          😔
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          이미 모임이 끝났어요
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          안원의 참가나 기간이 지났을 수 있어요.
          <br />
          직접 새로운 모임을 만들어볼까요?
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {SIMILAR_ROOMS.map((room) => (
          <Link
            key={room.id}
            href={`/room/${room.id}`}
            className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-primary bg-primary-subtle px-2 py-0.5 rounded-full w-fit">
                {room.category}
              </span>
              <p className="text-sm font-bold text-gray-900">{room.title}</p>
              <p className="text-xs text-gray-400">
                {room.participantsSummary}
              </p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400 shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
