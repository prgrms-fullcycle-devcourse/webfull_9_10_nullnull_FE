"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  dates: Date[];
  timeSlots: string[];
  selectedSlots: Set<string>;
  onChange: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const DAY = ["일", "월", "화", "수", "목", "금", "토"];
const TIME_COLUMN_WIDTH = "3.25rem";
const DATE_COLUMN_WIDTH = "2.25rem";
const TIME_ROW_HEIGHT = "2.5rem";

function slotKey(date: Date, time: string) {
  return `${date.toISOString().slice(0, 10)}_${time}`;
}

function formatDateHeader(date: Date) {
  const m = String(date.getMonth() + 1);
  const d = String(date.getDate());
  return { date: `${m}.${d}`, day: DAY[date.getDay()] };
}

export function TimeTable({
  dates,
  timeSlots,
  selectedSlots,
  onChange,
}: Props) {
  const cellScrollRef = useRef<HTMLDivElement>(null);
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const headerDragRef = useRef({
    didDrag: false,
    pointerId: null as number | null,
    startScrollLeft: 0,
    startX: 0,
  });
  const suppressHeaderClickRef = useRef(false);

  /* ─── 스크롤 양방향 동기화 ─── */
  const isSyncing = useRef(false);

  const handleCellScroll = useCallback(() => {
    if (isSyncing.current) return;
    const cell = cellScrollRef.current;
    const header = headerScrollRef.current;
    if (!cell || !header) return;
    isSyncing.current = true;
    header.scrollLeft = cell.scrollLeft;
    isSyncing.current = false;
  }, []);

  const handleHeaderScroll = useCallback(() => {
    if (isSyncing.current) return;
    const cell = cellScrollRef.current;
    const header = headerScrollRef.current;
    if (!cell || !header) return;
    isSyncing.current = true;
    cell.scrollLeft = header.scrollLeft;
    isSyncing.current = false;
  }, []);

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

  const handleCellClick = useCallback(
    (date: Date, time: string) => {
      const key = slotKey(date, time);
      onChange((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });
    },
    [onChange],
  );

  const handleHeaderPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      const header = headerScrollRef.current;
      if (!header) return;

      headerDragRef.current = {
        didDrag: false,
        pointerId: event.pointerId,
        startScrollLeft: header.scrollLeft,
        startX: event.clientX,
      };
    },
    [],
  );

  const handleHeaderPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = headerDragRef.current;
      if (drag.pointerId !== event.pointerId) return;

      const header = headerScrollRef.current;
      if (!header) return;

      const deltaX = event.clientX - drag.startX;
      if (Math.abs(deltaX) > 3) {
        drag.didDrag = true;
      }

      if (drag.didDrag) {
        header.scrollLeft = drag.startScrollLeft - deltaX;
        event.preventDefault();
      }
    },
    [],
  );

  const handleHeaderPointerEnd = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = headerDragRef.current;
      if (drag.pointerId !== event.pointerId) return;

      if (drag.didDrag) {
        suppressHeaderClickRef.current = true;
        window.setTimeout(() => {
          suppressHeaderClickRef.current = false;
        }, 0);
      }

      drag.pointerId = null;
      drag.didDrag = false;
    },
    [],
  );

  /* ─── 날짜 헤더 클릭: 해당 날짜 전체 토글 ─── */
  const handleDateHeaderClick = useCallback(
    (dateIndex: number) => {
      if (suppressHeaderClickRef.current) {
        suppressHeaderClickRef.current = false;
        return;
      }

      const allSelected = timeSlots.every((t) =>
        selectedSlots.has(slotKey(dates[dateIndex], t)),
      );
      const mode = !allSelected;
      onChange((prev) => {
        const next = new Set(prev);
        timeSlots.forEach((t) => {
          const k = slotKey(dates[dateIndex], t);
          if (mode) next.add(k);
          else next.delete(k);
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
          if (mode) next.add(k);
          else next.delete(k);
        });
        return next;
      });
    },
    [dates, timeSlots, selectedSlots, onChange],
  );

  return (
    <Card
      size="sm"
      className="select-none gap-0 rounded-[28px] border-0 bg-white py-0 ring-gray-100 shadow-[0_0_0_1px_rgba(13,12,29,0.02)]"
    >
      <CardContent className="overflow-hidden px-5 pb-0 pt-4">
        <div className="max-h-[20rem] overflow-y-auto">
          <div className="sticky top-0 z-10 flex bg-white">
            <div
              className="flex shrink-0 items-start justify-center pt-1"
              style={{ width: TIME_COLUMN_WIDTH }}
            >
              {(() => {
                const allSelected =
                  dates.length > 0 &&
                  timeSlots.length > 0 &&
                  dates.every((d) =>
                    timeSlots.every((t) => selectedSlots.has(slotKey(d, t))),
                  );
                return (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-pressed={allSelected}
                    onClick={() =>
                      onChange(() => {
                        if (allSelected) return new Set();
                        const next = new Set<string>();
                        dates.forEach((d) =>
                          timeSlots.forEach((t) => next.add(slotKey(d, t))),
                        );
                        return next;
                      })
                    }
                    className={cn(
                      "flex h-[4.25rem] w-full flex-col items-center justify-center rounded-lg px-0 hover:bg-gray-50 gap-0.5",
                      allSelected && "bg-gray-100 hover:bg-gray-100",
                    )}
                  >
                    <span className="text-[9px] leading-3 font-medium text-gray-400">
                      전체
                    </span>
                    <span className="text-[9px] leading-3 font-medium text-gray-400">
                      {allSelected ? "해제" : "선택"}
                    </span>
                  </Button>
                );
              })()}
            </div>
            <div
              className="min-w-0 flex-1 overflow-y-hidden"
              style={{ height: "4.25rem" }}
            >
              <div
                ref={headerScrollRef}
                className="cursor-grab overflow-x-auto active:cursor-grabbing"
                style={{ height: "calc(4.25rem + 20px)" }}
                onPointerCancel={handleHeaderPointerEnd}
                onPointerDown={handleHeaderPointerDown}
                onPointerMove={handleHeaderPointerMove}
                onPointerUp={handleHeaderPointerEnd}
              >
                <div
                  className="inline-grid gap-x-1"
                  style={{
                    gridTemplateColumns: `repeat(${dates.length}, ${DATE_COLUMN_WIDTH})`,
                  }}
                >
                  {dates.map((date, i) => {
                    const { date: d, day } = formatDateHeader(date);
                    const allSelected = timeSlots.every((t) =>
                      selectedSlots.has(slotKey(date, t)),
                    );
                    return (
                      <Button
                        key={i}
                        type="button"
                        variant="ghost"
                        size="sm"
                        aria-pressed={allSelected}
                        onClick={() => handleDateHeaderClick(i)}
                        className={cn(
                          "flex h-[4.25rem] w-full flex-col items-center justify-start rounded-lg px-0 pt-1 hover:bg-gray-50",
                          allSelected && "bg-gray-100 hover:bg-gray-100",
                        )}
                      >
                        <span
                          className={cn(
                            "text-[10px] leading-3",
                            i === 0 ? "text-gray-500" : "invisible",
                          )}
                        >
                          {date.getFullYear()}
                        </span>
                        <span className="mt-1 text-[10px] leading-3 font-medium text-gray-500">
                          {d}
                        </span>
                        <span className="mt-1 text-sm leading-5 font-semibold text-text-primary">
                          {day}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div
              className="flex shrink-0 flex-col gap-1"
              style={{ width: TIME_COLUMN_WIDTH }}
            >
              {timeSlots.map((time, ti) => {
                const allSelected = dates.every((d) =>
                  selectedSlots.has(slotKey(d, time)),
                );
                return (
                  <Button
                    key={time}
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-pressed={allSelected}
                    onClick={() => handleTimeHeaderClick(ti)}
                    className={cn(
                      "flex w-full justify-end rounded-lg px-0 pr-3 hover:bg-gray-50",
                      allSelected && "bg-gray-100 hover:bg-gray-100",
                    )}
                    style={{ height: TIME_ROW_HEIGHT }}
                  >
                    <span className="text-[10px] leading-3 font-medium text-gray-500">
                      {time}
                    </span>
                  </Button>
                );
              })}
            </div>

            <div className="relative min-w-0 flex-1">
              <div ref={cellScrollRef} className="overflow-x-auto">
                <div
                  className="inline-grid gap-x-1 gap-y-1"
                  style={{
                    gridTemplateColumns: `repeat(${dates.length}, ${DATE_COLUMN_WIDTH})`,
                  }}
                >
                  {timeSlots.map((time) =>
                    dates.map((date, di) => {
                      const key = slotKey(date, time);
                      const selected = selectedSlots.has(key);
                      return (
                        <Button
                          key={`${di}-${time}`}
                          type="button"
                          variant="outline"
                          size="sm"
                          data-time-slot={key}
                          aria-pressed={selected}
                          aria-label={`${formatDateHeader(date).date} ${time} 불가능`}
                          className={cn(
                            "w-full rounded-lg border p-0 hover:bg-white",
                            selected
                              ? "border-gray-200 bg-gray-200 hover:bg-gray-200"
                              : "border-gray-100 bg-white hover:border-gray-300",
                          )}
                          style={{ height: TIME_ROW_HEIGHT }}
                          onClick={() => handleCellClick(date, time)}
                        />
                      );
                    }),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mx-5 mt-2 justify-end gap-3 border-gray-100 bg-white px-0 py-4">
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-sm border border-gray-100 bg-white" />
          <span className="text-[10px] text-gray-500">가능</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-sm bg-gray-200" />
          <span className="text-[10px] text-gray-500">불가능</span>
        </div>
      </CardFooter>
    </Card>
  );
}
