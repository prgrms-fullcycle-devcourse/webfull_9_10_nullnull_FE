"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { AppContent, AppIconLink, AppShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { MapView } from "@/components/kakao";
import { LocationSearchSheet } from "./LocationSearchSheet";
import { useFeedbackStore } from "@/features/room/model/useFeedbackStore";
import { useRoomDetail, roomKeys } from "@/features/room/hooks/useRoomDetail";
import { useRoomJoinStore } from "@/store/useRoomJoinStore";
import { roomApi } from "@/features/room/api/room.api";
import type { RoomLocation } from "@/features/room/types/room";

type Props = {
  slug: string;
};

export function LocationPage({ slug }: Props) {
  const router = useRouter();
  const [location, setLocation] = useState<RoomLocation | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const setFeedback = useFeedbackStore((s) => s.set);
  const queryClient = useQueryClient();
  const { data } = useRoomDetail(slug);
  const { blockedSlots, fromSchedule, clear } = useRoomJoinStore();
  const locationInitialized = useRef(false);
  const fromScheduleOnMount = useRef(fromSchedule);

  useEffect(() => {
    if (
      !data?.mySubmission?.origin ||
      data.viewer.participantStatus !== "SUBMITTED" ||
      locationInitialized.current
    )
      return;
    const { placeName, address, lat, lng } = data.mySubmission.origin;
    setLocation({ name: placeName, address, lat, lng });
    locationInitialized.current = true;
  }, [data]);

  useEffect(() => {
    const status = data?.viewer.participantStatus;
    if (
      data?.viewer.role === "GUEST" ||
      (status !== "JOINED" && status !== "SUBMITTED") ||
      data?.room.status !== "COLLECTING"
    ) {
      router.replace(`/room/${slug}`);
    }
  }, [
    data?.viewer.role,
    data?.viewer.participantStatus,
    data?.room.status,
    router,
    slug,
  ]);

  useEffect(() => {
    if (!fromScheduleOnMount.current) {
      router.replace(`/room/${slug}/schedule`);
    }
  }, [router, slug]);

  if (
    data?.viewer.role === "GUEST" ||
    (data?.viewer.participantStatus !== "JOINED" &&
      data?.viewer.participantStatus !== "SUBMITTED") ||
    data?.room.status !== "COLLECTING"
  ) {
    return null;
  }

  const handleComplete = async () => {
    if (!data?.viewer.participantId || !location) return;
    await roomApi.submitParticipation(data.viewer.participantId, {
      blockedSlots,
      origin: {
        placeName: location.name,
        address: location.address,
        lat: location.lat,
        lng: location.lng,
      },
    });
    await queryClient.invalidateQueries({ queryKey: roomKeys.detail(slug) });
    clear();
    setFeedback("waiting");
    router.push(`/room/${slug}`);
  };

  const handleAbsent = async () => {
    if (data?.viewer.participantId) {
      await roomApi.declineRoom(data.viewer.participantId);
    }
    await queryClient.invalidateQueries({ queryKey: roomKeys.detail(slug) });
    clear();
    setFeedback("absent");
    router.push(`/room/${slug}`);
  };

  return (
    <AppShell
      title={<span className="text-base">모임 참여하기</span>}
      leftSlot={
        <AppIconLink
          icon="back"
          label="뒤로가기"
          onClick={() => router.back()}
        />
      }
      bottomSlot={
        <>
          <Button disabled={!location} onClick={handleComplete}>
            완료
          </Button>
          <Button variant="ghost" onClick={handleAbsent}>
            이번 모임은 안 나갈래요
          </Button>
        </>
      }
    >
      <AppContent className="flex flex-col gap-5">
        <div>
          <h2 className="text-2xl font-bold leading-tight text-gray-950">
            어디서 출발할까요?
          </h2>
          <p className="mt-3 text-lg font-medium text-gray-400 leading-relaxed">
            출발지를 입력하면 모두가 모이기 편한 중간 지점을 찾아드려요
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setSearchOpen(true)}
          className="w-full h-10 px-4 rounded-xl justify-start text-sm text-gray-400 hover:border-[#6B4EFF] hover:text-gray-400 hover:bg-white"
        >
          장소 또는 주소 검색
        </Button>

        {location && (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4">
              <span className="text-lg font-bold text-gray-900 block mb-1">
                {location.name}
              </span>
              <div className="flex items-start gap-2">
                <span className="text-xs text-gray-400 shrink-0 pt-0.5">
                  출발지
                </span>
                <span className="text-xs text-gray-600 leading-relaxed">
                  {location.address}
                </span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm">
              <MapView
                markers={[
                  {
                    lat: location.lat,
                    lng: location.lng,
                    label: location.name,
                  },
                ]}
                className="h-44"
              />
            </div>
          </>
        )}
      </AppContent>
      {searchOpen && (
        <LocationSearchSheet
          onClose={() => setSearchOpen(false)}
          onSelect={(loc) => {
            setLocation(loc);
            setSearchOpen(false);
          }}
        />
      )}
    </AppShell>
  );
}
