"use client";

import React, { useState, useCallback, useEffect } from "react";

type Props = {
  dates: Date[];
  timeSlots: string[];
  selectedSlots: Set<string>;
  onChange: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const DAY = ["일", "월", "화", "수", "목", "금", "토"];

function slotKey(date: Date, time: string) {
  return `${date.toISOString().slice(0, 10)}_${time}`;
}

function formatDateHeader(date: Date) {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return { date: `${m}.${d}`, day: DAY[date.getDay()] };
}

export function TimeTable({
  dates,
  timeSlots,
  selectedSlots,
  onChange,
}: Props) {
  const [dragMode, setDragMode] = useState<boolean | null>(null);

  /* ─── 셀 드래그 선택 ─── */
  const handleCellPointerDown = useCallback(
    (date: Date, time: string) => {
      const key = slotKey(date, time);
      const mode = !selectedSlots.has(key);
      setDragMode(mode);
      onChange((prev) => {
        const next = new Set(prev);
        mode ? next.add(key) : next.delete(key);
        return next;
      });
    },
    [selectedSlots, onChange],
  );

  const handleCellPointerEnter = useCallback(
    (date: Date, time: string) => {
      if (dragMode === null) return;
      const key = slotKey(date, time);
      onChange((prev) => {
        const next = new Set(prev);
        dragMode ? next.add(key) : next.delete(key);
        return next;
      });
    },
    [dragMode, onChange],
  );

  useEffect(() => {
    const stop = () => setDragMode(null);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, []);

  /* ─── 날짜 헤더 클릭: 해당 날짜 전체 토글 ─── */
  const handleDateHeaderClick = useCallback(
    (dateIndex: number) => {
      const allSelected = timeSlots.every((t) =>
        selectedSlots.has(slotKey(dates[dateIndex], t)),
      );
      const mode = !allSelected;
      onChange((prev) => {
        const next = new Set(prev);
        timeSlots.forEach((t) => {
          const k = slotKey(dates[dateIndex], t);
          mode ? next.add(k) : next.delete(k);
        });
        return next;
      });
    },
    [dates, timeSlots, selectedSlots, onChange],
  );

  /* ─── 시간 레이블 클릭: 해당 시간 전체 토글 ─── */
  const handleTimeHeaderClick = useCallback(
    (timeIndex: number) => {
      const allSelected = dates.every((d) =>
        selectedSlots.has(slotKey(d, timeSlots[timeIndex])),
      );
      const mode = !allSelected;
      onChange((prev) => {
        const next = new Set(prev);
        dates.forEach((d) => {
          const k = slotKey(d, timeSlots[timeIndex]);
          mode ? next.add(k) : next.delete(k);
        });
        return next;
      });
    },
    [dates, timeSlots, selectedSlots, onChange],
  );

  return (
    <div className="overflow-x-auto select-none">
      <div
        className="inline-grid"
        style={{ gridTemplateColumns: `3rem repeat(${dates.length}, 2.75rem)` }}
        onPointerLeave={() => setDragMode(null)}
      >
        {/* 헤더 행 */}
        <div className="sticky top-0 left-0 z-20 bg-gray-50" />
        {dates.map((date, i) => {
          const { date: d, day } = formatDateHeader(date);
          const allSelected = timeSlots.every((t) =>
            selectedSlots.has(slotKey(date, t)),
          );
          return (
            <button
              key={i}
              onClick={() => handleDateHeaderClick(i)}
              className={`sticky top-0 z-10 flex flex-col items-center justify-center pb-2 border-b transition-colors cursor-pointer ${
                allSelected
                  ? "bg-[#F0EDFF] border-[#6B4EFF]"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <span
                className={`text-xs font-medium ${allSelected ? "text-[#6B4EFF]" : "text-gray-700"}`}
              >
                {d}
              </span>
              <span
                className={`text-[10px] ${allSelected ? "text-[#6B4EFF]" : "text-gray-400"}`}
              >
                {day}
              </span>
            </button>
          );
        })}

        {/* 시간 행 */}
        {timeSlots.map((time, ti) => {
          const allSelected = dates.every((d) =>
            selectedSlots.has(slotKey(d, time)),
          );
          return (
            <React.Fragment key={time}>
              {/* 시간 레이블 */}
              <button
                onClick={() => handleTimeHeaderClick(ti)}
                className={`sticky left-0 z-10 flex items-start justify-end pr-2 pt-1 cursor-pointer transition-colors ${
                  allSelected ? "bg-[#F0EDFF]" : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <span
                  className={`text-[10px] leading-none ${allSelected ? "text-[#6B4EFF] font-semibold" : "text-gray-400"}`}
                >
                  {time}
                </span>
              </button>

              {/* 날짜별 셀 */}
              {dates.map((date, di) => {
                const key = slotKey(date, time);
                const selected = selectedSlots.has(key);
                return (
                  <div
                    key={`${di}-${time}`}
                    className={`h-8 mx-0.5 rounded-sm border transition-colors cursor-pointer touch-none ${
                      selected
                        ? "bg-[#6B4EFF] border-[#6B4EFF]"
                        : "bg-white border-gray-200 hover:border-[#6B4EFF]/40"
                    }`}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      handleCellPointerDown(date, time);
                    }}
                    onPointerEnter={() => handleCellPointerEnter(date, time)}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="flex items-center justify-end gap-4 mt-3 px-1">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-sm bg-white border border-gray-200" />
          <span className="text-xs text-gray-500">가능</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-sm bg-[#6B4EFF]" />
          <span className="text-xs text-gray-500">불가능</span>
        </div>
      </div>
    </div>
  );
}
