"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

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
  const dragMode = useRef<boolean | null>(null);
  const cellScrollRef = useRef<HTMLDivElement>(null);
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  /* ─── 스크롤 양방향 동기화 ─── */
  const isSyncing = useRef(false);

  const syncScrollState = useCallback(
    (scrollLeft: number, scrollWidth: number, clientWidth: number) => {
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    },
    [],
  );

  const handleCellScroll = useCallback(() => {
    if (isSyncing.current) return;
    const cell = cellScrollRef.current;
    const header = headerScrollRef.current;
    if (!cell || !header) return;
    isSyncing.current = true;
    header.scrollLeft = cell.scrollLeft;
    syncScrollState(cell.scrollLeft, cell.scrollWidth, cell.clientWidth);
    isSyncing.current = false;
  }, [syncScrollState]);

  const handleHeaderScroll = useCallback(() => {
    if (isSyncing.current) return;
    const cell = cellScrollRef.current;
    const header = headerScrollRef.current;
    if (!cell || !header) return;
    isSyncing.current = true;
    cell.scrollLeft = header.scrollLeft;
    syncScrollState(header.scrollLeft, header.scrollWidth, header.clientWidth);
    isSyncing.current = false;
  }, [syncScrollState]);

  useEffect(() => {
    const cellEl = cellScrollRef.current;
    const headerEl = headerScrollRef.current;
    if (!cellEl || !headerEl) return;
    handleCellScroll();
    cellEl.addEventListener("scroll", handleCellScroll);
    headerEl.addEventListener("scroll", handleHeaderScroll);
    window.addEventListener("resize", handleCellScroll);
    return () => {
      cellEl.removeEventListener("scroll", handleCellScroll);
      headerEl.removeEventListener("scroll", handleHeaderScroll);
      window.removeEventListener("resize", handleCellScroll);
    };
  }, [handleCellScroll, handleHeaderScroll]);

  /* ─── 셀 드래그 선택 ─── */
  const handleCellPointerDown = useCallback(
    (date: Date, time: string) => {
      const key = slotKey(date, time);
      const mode = !selectedSlots.has(key);
      dragMode.current = mode;
      onChange((prev) => {
        const next = new Set(prev);
        mode ? next.add(key) : next.delete(key);
        return next;
      });
    },
    [selectedSlots, onChange],
  );

  const handleCellPointerEnter = useCallback(
    (key: string) => {
      if (dragMode.current === null) return;
      onChange((prev) => {
        const next = new Set(prev);
        if (dragMode.current) next.add(key);
        else next.delete(key);
        return next;
      });
    },
    [onChange],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragMode.current === null) return;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const cell = el.closest("[data-slot]");
      if (!cell) return;
      const key = cell.getAttribute("data-slot");
      if (key) handleCellPointerEnter(key);
    },
    [handleCellPointerEnter],
  );

  useEffect(() => {
    const stop = () => {
      dragMode.current = null;
    };
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

  const scrollBy = useCallback((amount: number) => {
    cellScrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    headerScrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  return (
    <div className="select-none">
      {/* ── 날짜 헤더: 세로 고정(sticky), 가로는 셀과 scrollLeft 동기화 ── */}
      <div className="sticky top-0 z-20 flex bg-gray-50">
        {/* 시간 열 spacer */}
        <div className="w-12 flex-shrink-0" />
        {/*
          overflow-y-hidden(h-12)으로 스크롤바를 잘라냄.
          안쪽 div는 overflow-x-auto + 더 큰 높이로 스크롤바가 생기지만 가려짐.
        */}
        <div
          className="flex-1 min-w-0 overflow-y-hidden"
          style={{ height: "3rem" }}
        >
          <div
            ref={headerScrollRef}
            className="overflow-x-auto"
            style={{ height: "calc(3rem + 20px)" }}
          >
            <div
              className="inline-grid"
              style={{
                gridTemplateColumns: `repeat(${dates.length}, 2.75rem)`,
              }}
            >
              {dates.map((date, i) => {
                const { date: d, day } = formatDateHeader(date);
                const allSelected = timeSlots.every((t) =>
                  selectedSlots.has(slotKey(date, t)),
                );
                return (
                  <button
                    key={i}
                    onClick={() => handleDateHeaderClick(i)}
                    className={`h-12 flex flex-col items-center justify-center pb-2 border-b transition-colors cursor-pointer ${
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
            </div>
          </div>
        </div>
      </div>

      {/* ── 시간 레이블(좌측 고정) + 셀(가로 스크롤) ── */}
      <div className="flex">
        {/* 시간 레이블 */}
        <div className="flex-shrink-0 w-12">
          {timeSlots.map((time, ti) => {
            const allSelected = dates.every((d) =>
              selectedSlots.has(slotKey(d, time)),
            );
            return (
              <button
                key={time}
                onClick={() => handleTimeHeaderClick(ti)}
                className={`h-8 w-full flex items-start justify-end pr-2 pt-1 cursor-pointer transition-colors ${
                  allSelected ? "bg-[#F0EDFF]" : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <span
                  className={`text-[10px] leading-none ${
                    allSelected
                      ? "text-[#6B4EFF] font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {time}
                </span>
              </button>
            );
          })}
        </div>

        {/* 셀 영역 */}
        <div className="relative flex-1 min-w-0">
          {canScrollLeft && (
            <button
              className="absolute left-0 top-0 bottom-0 z-30 w-6 flex items-center justify-center"
              onClick={() => scrollBy(-110)}
              aria-label="왼쪽으로 스크롤"
            >
              <span className="text-gray-400 text-lg leading-none">‹</span>
            </button>
          )}
          {canScrollRight && (
            <button
              className="absolute right-0 top-0 bottom-0 z-30 w-6 flex items-center justify-center"
              onClick={() => scrollBy(110)}
              aria-label="오른쪽으로 스크롤"
            >
              <span className="text-gray-400 text-lg leading-none">›</span>
            </button>
          )}

          <div
            ref={cellScrollRef}
            className="overflow-x-auto"
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
              dragMode.current = null;
            }}
          >
            <div
              className="inline-grid"
              style={{
                gridTemplateColumns: `repeat(${dates.length}, 2.75rem)`,
              }}
            >
              {timeSlots.map((time) =>
                dates.map((date, di) => {
                  const key = slotKey(date, time);
                  const selected = selectedSlots.has(key);
                  return (
                    <div
                      key={`${di}-${time}`}
                      data-slot={key}
                      className={`h-8 mx-0.5 rounded-sm border transition-colors cursor-pointer touch-none ${
                        selected
                          ? "bg-[#6B4EFF] border-[#6B4EFF]"
                          : "bg-white border-gray-200 hover:border-[#6B4EFF]/40"
                      }`}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        handleCellPointerDown(date, time);
                      }}
                      onPointerEnter={() => handleCellPointerEnter(key)}
                    />
                  );
                }),
              )}
            </div>
          </div>
        </div>
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
