"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBackButton, AppContent, AppShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { MapView } from "@/components/kakao";
import { LocationSearchSheet } from "./LocationSearchSheet";
import { useFeedbackStore } from "@/features/room/model/useFeedbackStore";
import type { RoomLocation } from "@/features/room/types/room";

type Props = {
  slug: string;
};

export function LocationPage({ slug }: Props) {
  const router = useRouter();
  const [location, setLocation] = useState<RoomLocation | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const setFeedback = useFeedbackStore((s) => s.set);

  const handleComplete = () => {
    // TODO: 출발지 정보를 API로 전송 후 이동
    setFeedback("waiting");
    router.push(`/room/${slug}`);
  };

  const handleAbsent = () => {
    setFeedback("absent");
    router.push(`/room/${slug}`);
  };

  return (
    <AppShell
      title={<span className="text-base">모임 참여하기</span>}
      leftSlot={<AppBackButton onClick={() => router.back()} />}
      bottomSlot={
        <div className="flex flex-col gap-1">
          <Button size="cta" disabled={!location} onClick={handleComplete}>
            완료
          </Button>
          <button
            onClick={handleAbsent}
            className="flex items-center justify-center h-11 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            이번 모임은 안 나갈래요
          </button>
        </div>
      }
      overlaySlot={
        searchOpen && (
          <LocationSearchSheet
            onClose={() => setSearchOpen(false)}
            onSelect={(loc) => {
              setLocation(loc);
              setSearchOpen(false);
            }}
          />
        )
      }
    >
      <AppContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-900">
            어디서 출발할까요?
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            출발지를 입력하면 모두가 모이기 편한 중간 지점을 찾아드려요
          </p>
        </div>

        <button
          onClick={() => setSearchOpen(true)}
          className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-left text-sm text-gray-400 hover:border-[#6B4EFF] transition-colors"
        >
          장소 또는 주소 검색
        </button>

        {location && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            {/* 장소명 */}
            <div className="px-4 pt-4 pb-1">
              <span className="text-lg font-bold text-gray-900">
                {location.name}
              </span>
            </div>

            {/* 도로명 주소 */}
            <div className="flex items-start gap-2 px-4 pb-4">
              <span className="text-xs text-gray-400 shrink-0 pt-0.5">
                출발지
              </span>
              <span className="text-xs text-gray-600 leading-relaxed">
                {location.address}
              </span>
            </div>

            {/* 지도 미리보기 */}
            <MapView
              markers={[
                { lat: location.lat, lng: location.lng, label: location.name },
              ]}
              className="h-44"
            />
          </div>
        )}
      </AppContent>
    </AppShell>
  );
}
