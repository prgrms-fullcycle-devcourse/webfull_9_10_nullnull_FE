"use client";

import { useState } from "react";

import { MapView } from "@/components/kakao";

const MOCK_TIMES = [
  {
    rank: 1,
    date: "5월 24일 (일)",
    timeRange: "오후 6:00 - 오후 8:00",
    participants: 8,
    total: 8,
  },
  {
    rank: 2,
    date: "5월 25일 (월)",
    timeRange: "오후 7:00 - 오후 8:00",
    participants: 8,
    total: 8,
  },
  {
    rank: 3,
    date: "5월 27일 (화)",
    timeRange: "오후 7:30 - 오후 8:00",
    participants: 6,
    total: 8,
  },
];

const MOCK_PLACES = [
  {
    rank: 1,
    name: "파스쿠찌 부산점",
    address: "부산 동구 중앙대로 206 부산역 2층",
    lat: 35.1151,
    lng: 129.0415,
  },
  {
    rank: 2,
    name: "부산역 1번 출구",
    address: "부산 동구 중앙대로 206",
    lat: 35.1154,
    lng: 129.041,
  },
  {
    rank: 3,
    name: "카카오 프렌즈",
    address: "부산 동구 중앙대로214번길 7-8",
    lat: 35.1162,
    lng: 129.0421,
  },
];

export function RoomResultView() {
  const [selectedTimeRank, setSelectedTimeRank] = useState(1);
  const [selectedPlaceRank, setSelectedPlaceRank] = useState(1);

  return (
    <div className="flex flex-col px-4 pt-5">
      <section className="flex flex-col">
        <div className="mb-5">
          <h2 className="text-2xl font-bold leading-tight text-gray-950">
            가장 많이 모일 수 있는
            <br />
            널널한 시간을 찾았어요!
          </h2>
          <p className="mt-3 text-lg font-medium text-gray-400 leading-relaxed">
            시간과 장소를 선택하고 모임을 확정해 보세요
          </p>
        </div>

        <h2 className="mb-4 text-lg font-bold leading-6 text-text-primary">
          널널한 시간 TOP 3
        </h2>

        <div className="flex flex-col gap-2">
          {MOCK_TIMES.map((time) => {
            const isAllAvailable = time.participants === time.total;
            const isSelected = selectedTimeRank === time.rank;

            return (
              <label
                key={time.rank}
                htmlFor={`time-option-${time.rank}`}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-3xl border bg-white p-5 ${
                  isSelected ? "border-primary-default" : "border-border-subtle"
                }`}
              >
                <input
                  id={`time-option-${time.rank}`}
                  type="radio"
                  name="recommended-time"
                  value={time.rank}
                  checked={isSelected}
                  onChange={() => setSelectedTimeRank(time.rank)}
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
                      {time.date}
                    </span>
                    <span className="text-xs leading-4 text-text-tertiary">
                      {time.timeRange}
                    </span>
                  </div>
                </div>
                <p className="flex shrink-0 items-end gap-px text-right">
                  <span className="text-sm font-bold leading-[18px] text-text-primary">
                    {isAllAvailable ? "전원" : `${time.participants}명`}{" "}
                  </span>
                  <span className="text-xs leading-4 text-text-tertiary">
                    가능
                  </span>
                </p>
              </label>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col pb-6 pt-5">
        <h2 className="mb-4 text-lg font-bold leading-6 text-text-primary">
          추천 장소 TOP 3
        </h2>

        <div className="mb-4 overflow-hidden rounded-2xl bg-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <MapView
            markers={MOCK_PLACES.map((place) => ({
              lat: place.lat,
              lng: place.lng,
              label: place.name,
            }))}
            className="h-40"
          />
        </div>

        <div className="flex flex-col gap-2">
          {MOCK_PLACES.map((place) => {
            const isSelected = selectedPlaceRank === place.rank;

            return (
              <label
                key={place.rank}
                htmlFor={`place-option-${place.rank}`}
                className={`flex cursor-pointer items-center gap-4 rounded-3xl border bg-white p-5 ${
                  isSelected ? "border-primary-default" : "border-border-subtle"
                }`}
              >
                <input
                  id={`place-option-${place.rank}`}
                  type="radio"
                  name="recommended-place"
                  value={place.rank}
                  checked={isSelected}
                  onChange={() => setSelectedPlaceRank(place.rank)}
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
          })}
        </div>
      </section>
    </div>
  );
}
