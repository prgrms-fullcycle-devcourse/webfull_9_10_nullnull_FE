"use client";

import { MapView } from "@/components/MapView";
import { ParticipationStatus } from "@/features/room/components/ParticipationStatus";

const MOCK_TIMES = [
  {
    rank: 1,
    date: "5월 27일 화요일",
    timeRange: "20:00 ~ 22:00",
    participants: 8,
    total: 8,
    absentees: [] as string[],
  },
  {
    rank: 2,
    date: "5월 28일 수요일",
    timeRange: "20:30 ~ 22:00",
    participants: 6,
    total: 8,
    absentees: ["최동훈", "삼순이"],
  },
  {
    rank: 3,
    date: "5월 25일 일요일",
    timeRange: "21:00 ~ 22:00",
    participants: 5,
    total: 8,
    absentees: ["최동훈", "삼순이", "홍길동"],
  },
];

const MOCK_PLACES = [
  {
    rank: 1,
    name: "강남역 근처",
    address: "서울 강남구 강남대로",
    distance: "1.2km",
    lat: 37.4979,
    lng: 127.0276,
  },
  {
    rank: 2,
    name: "홍대입구역 근처",
    address: "서울 마포구 와우산로",
    distance: "2.4km",
    lat: 37.5572,
    lng: 126.9238,
  },
  {
    rank: 3,
    name: "건대입구역 근처",
    address: "서울 광진구 아차산로",
    distance: "3.1km",
    lat: 37.5403,
    lng: 127.0695,
  },
];

export function RoomResultView() {
  return (
    <div className="flex flex-col">
      {/* Top 3 Recommended Times */}
      <section className="flex flex-col gap-4 border-b border-border-subtle px-6 py-6">
        {/* Date range header */}
        <div className="flex h-[50px] items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium leading-4 text-text-tertiary">
              가능 날짜
            </span>
            <span className="text-sm font-semibold leading-[18px] text-text-primary">
              5월 24일 ~ 5월 26일
            </span>
          </div>
          <div className="flex flex-col gap-0.5 text-right">
            <span className="text-xs font-medium leading-4 text-text-tertiary">
              가능 시간
            </span>
            <span className="text-sm font-semibold leading-[18px] text-text-primary">
              09:00 ~ 22:00
            </span>
          </div>
        </div>

        {/* Participation info */}
        <ParticipationStatus current={6} max={8} />

        {/* Section heading */}
        <h2 className="text-lg font-bold leading-[27px] text-gray-950">
          베스트 타임 Top 3
        </h2>

        {/* Time cards */}
        <div className="flex flex-col gap-3">
          {MOCK_TIMES.map((t) => {
            const isAllAvailable = t.participants === t.total;
            return (
              <div
                key={t.rank}
                className={`flex items-center justify-between rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] ${
                  t.rank === 1
                    ? "border-2 border-primary-default"
                    : "border border-border-subtle"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      t.rank === 1
                        ? "bg-primary-default text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {t.rank}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-gray-950">
                      {t.date}
                    </span>
                    <span className="text-xs text-text-tertiary">
                      {t.timeRange}
                    </span>
                    {t.absentees.length > 0 && (
                      <div className="flex flex-col gap-0.5 pt-1">
                        <div className="flex items-center gap-1">
                          <span className="size-1.5 rounded-full bg-red-400" />
                          <span className="text-xs text-text-tertiary">
                            불가능
                          </span>
                        </div>
                        <span className="text-xs text-text-secondary">
                          {t.absentees.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="shrink-0 text-right">
                  <span className="text-sm font-bold text-gray-950">
                    {isAllAvailable ? "전원" : `${t.participants}명`}{" "}
                  </span>
                  <span className="text-[10px] font-normal text-gray-400">
                    가능
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top 3 Recommended Locations */}
      <section className="flex flex-col gap-5 px-6 pb-6 pt-5">
        <h2 className="text-lg font-bold leading-[27px] text-gray-950">
          추천 장소 Top 3
        </h2>

        {/* Map preview */}
        <div className="overflow-hidden rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <MapView
            markers={MOCK_PLACES.map((p) => ({
              lat: p.lat,
              lng: p.lng,
              label: p.name,
            }))}
            className="h-40"
          />
        </div>

        {/* Place cards */}
        <div className="flex flex-col gap-3">
          {MOCK_PLACES.map((p) => (
            <div
              key={p.rank}
              className={`flex items-center justify-between rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] ${
                p.rank === 1
                  ? "border-2 border-primary-default"
                  : "border border-border-subtle"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex size-6 items-center justify-center rounded-full text-xs font-bold ${
                    p.rank === 1
                      ? "bg-primary-default text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {p.rank}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold leading-[18px] text-gray-950">
                    {p.name}
                  </span>
                  <span className="text-xs leading-4 text-text-tertiary">
                    {p.address}
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium text-text-secondary">
                {p.distance}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
