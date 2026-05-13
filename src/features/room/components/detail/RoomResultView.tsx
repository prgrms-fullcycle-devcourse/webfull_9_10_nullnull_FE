"use client";

import { useMemo } from "react";

import { MapView } from "@/components/kakao";
import type { RoomCandidates } from "@/features/room/types/room";

type Props = {
  candidates?: RoomCandidates;
  collectOrigin?: boolean;
  selectedTimeCandidateId?: number | null;
  selectedPlaceCandidateId?: number | null;
  onSelectTime?: (timeCandidateId: number) => void;
  onSelectPlace?: (placeCandidateId: number) => void;
};

export function RoomResultView({
  candidates,
  collectOrigin = true,
  selectedTimeCandidateId: controlledTimeCandidateId,
  selectedPlaceCandidateId: controlledPlaceCandidateId,
  onSelectTime,
  onSelectPlace,
}: Props) {
  const timeCandidates = useMemo(
    () =>
      candidates?.timeCandidates.length
        ? candidates.timeCandidates.slice().sort((a, b) => a.rank - b.rank)
        : [],
    [candidates],
  );
  const placeCandidates = useMemo(
    () =>
      collectOrigin && candidates?.placeCandidates.length
        ? candidates.placeCandidates.slice().sort((a, b) => a.rank - b.rank)
        : [],
    [candidates, collectOrigin],
  );
  const selectedTimeCandidateId =
    controlledTimeCandidateId ?? timeCandidates[0]?.id;
  const selectedPlaceCandidateId =
    controlledPlaceCandidateId ?? placeCandidates[0]?.id;

  const handleSelectTime = (timeCandidateId: number) => {
    onSelectTime?.(timeCandidateId);
  };

  const handleSelectPlace = (placeCandidateId: number) => {
    onSelectPlace?.(placeCandidateId);
  };

  return (
    <div className="flex flex-col px-4 pt-5">
      <section className="flex flex-col">
        <div className="mb-5">
          <h2 className="text-2xl font-bold leading-tight text-gray-950">
            가장 많이 모일 수 있는
            <br />
            널널한 시간을 찾았어요!
          </h2>
          <p className="mt-3 text-lg font-medium leading-relaxed text-gray-400">
            시간과 장소를 선택하고 모임을 확정해 보세요
          </p>
        </div>

        <h2 className="mb-4 text-lg font-bold leading-6 text-text-primary">
          널널한 시간 TOP 3
        </h2>

        <div className="flex flex-col gap-2">
          {timeCandidates.length > 0 ? (
            timeCandidates.map((time) => {
              const totalCount =
                candidates?.submittedParticipantCount ?? time.availableCount;
              const isAllAvailable = time.availableCount === totalCount;
              const isSelected = selectedTimeCandidateId === time.id;

              return (
                <label
                  key={time.id}
                  htmlFor={`time-option-${time.id}`}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-3xl border bg-white p-5 ${
                    isSelected
                      ? "border-primary-default"
                      : "border-border-subtle"
                  }`}
                >
                  <input
                    id={`time-option-${time.id}`}
                    type="radio"
                    name="recommended-time"
                    value={time.id}
                    checked={isSelected}
                    onChange={() => handleSelectTime(time.id)}
                    className="sr-only"
                  />
                  <div className="flex min-w-0 items-center gap-4">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold leading-5 ${
                        isSelected
                          ? "bg-primary-default text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {time.rank}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold leading-[18px] text-text-primary">
                        {formatCandidateDate(time.date)}
                      </span>
                      <span className="text-xs leading-4 text-text-tertiary">
                        {formatTimeRange(time.startAt, time.endAt)}
                      </span>
                    </div>
                  </div>
                  <p className="flex shrink-0 items-end gap-px text-right">
                    <span className="text-sm font-bold leading-[18px] text-text-primary">
                      {isAllAvailable
                        ? "전원 가능"
                        : `${time.availableCount}명 가능`}
                    </span>
                  </p>
                </label>
              );
            })
          ) : (
            <EmptyCandidateCard message="추천 후보가 없어요" />
          )}
        </div>
      </section>

      {collectOrigin && (
        <section className="flex flex-col pb-6 pt-5">
          <h2 className="mb-4 text-lg font-bold leading-6 text-text-primary">
            추천 장소 TOP 3
          </h2>

          {placeCandidates.length > 0 && (
            <div className="mb-4 overflow-hidden rounded-2xl bg-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <MapView
                markers={placeCandidates.map((place) => ({
                  lat: Number(place.latitude),
                  lng: Number(place.longitude),
                  label: place.name,
                }))}
                className="h-40"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            {placeCandidates.length > 0 ? (
              placeCandidates.map((place) => {
                const isSelected = selectedPlaceCandidateId === place.id;

                return (
                  <label
                    key={place.id}
                    htmlFor={`place-option-${place.id}`}
                    className={`flex cursor-pointer items-center gap-4 rounded-3xl border bg-white p-5 ${
                      isSelected
                        ? "border-primary-default"
                        : "border-border-subtle"
                    }`}
                  >
                    <input
                      id={`place-option-${place.id}`}
                      type="radio"
                      name="recommended-place"
                      value={place.id}
                      checked={isSelected}
                      onChange={() => handleSelectPlace(place.id)}
                      className="sr-only"
                    />
                    <div className="flex min-w-0 items-center gap-4">
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold leading-5 ${
                          isSelected
                            ? "bg-primary-default text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {place.rank}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold leading-[18px] text-text-primary">
                          {place.name}
                        </span>
                        <span className="text-xs leading-4 text-text-tertiary">
                          {place.address}
                        </span>
                      </div>
                    </div>
                  </label>
                );
              })
            ) : (
              <EmptyCandidateCard message="추천 장소가 없어요" />
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function EmptyCandidateCard({ message }: { message: string }) {
  return (
    <div className="flex h-24 items-center justify-center rounded-3xl border border-border-subtle bg-white text-sm font-medium leading-[18px] text-text-tertiary">
      {message}
    </div>
  );
}

function formatCandidateDate(value: string) {
  const date = value.includes("T")
    ? new Date(value)
    : new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

function formatTimeRange(startAt: string, endAt: string) {
  return `${formatCandidateTime(startAt)} - ${formatCandidateTime(endAt)}`;
}

function formatCandidateTime(value: string) {
  if (/^\d{2}:\d{2}/.test(value)) {
    const [hourValue, minuteValue] = value.split(":");
    const hour = Number(hourValue);
    const minute = Number(minuteValue);
    const period = hour < 12 ? "오전" : "오후";
    const displayHour = hour % 12 || 12;

    return `${period} ${displayHour}:${String(minute).padStart(2, "0")}`;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(value));
}
