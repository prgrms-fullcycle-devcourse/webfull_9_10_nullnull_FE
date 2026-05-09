import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type RoomData } from "../../types/room";
import { cn } from "@/lib/utils";
import { TIME_OPTIONS } from "../../constants/room";

interface Props {
  data: RoomData;
  onUpdate: (data: Partial<RoomData>) => void;
}

const inputBaseClass =
  "h-10! w-full rounded-xl border border-border-subtle bg-white px-4 text-sm transition-all outline-none focus-visible:border-primary-default focus-visible:ring-1 focus-visible:ring-primary-default/10";
const selectTriggerClass =
  "h-10! w-full rounded-xl border border-border-subtle bg-white px-4 text-sm transition-all outline-none focus:border-primary-default focus:ring-1 focus:ring-primary-default/10";

export function CreateRoomStep3({ data, onUpdate }: Props) {
  return (
    <div className="flex-1 flex flex-col gap-10">
      <header>
        <h1 className="text-2xl font-bold leading-tight text-gray-950">
          원하는 모임조건을 설정해 주세요
        </h1>
        <p className="mt-2 text-lg font-medium text-gray-400 leading-relaxed">
          최적의 시간은 널널이 찾아드려요
        </p>
      </header>

      <div className="flex flex-col gap-8 pb-10">
        <DateRangePicker data={data} onUpdate={onUpdate} />
        <TimeRangePicker data={data} onUpdate={onUpdate} />
        <DaySelector data={data} onUpdate={onUpdate} />
        <DeadlinePicker data={data} onUpdate={onUpdate} />
        <PlaceRecommendation />
      </div>
    </div>
  );
}

function DateRangePicker({ data, onUpdate }: Props) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700">
        희망 날짜 범위 <span className="text-red-500 font-bold">*</span>
      </Label>
      <div className="flex items-center gap-2">
        <Input
          type="date"
          className={inputBaseClass}
          value={data.startDate}
          onChange={(e) => onUpdate({ startDate: e.target.value })}
        />
        <span className="text-gray-400 font-medium">~</span>
        <Input
          type="date"
          className={inputBaseClass}
          value={data.endDate}
          onChange={(e) => onUpdate({ endDate: e.target.value })}
        />
      </div>
    </div>
  );
}

function TimeRangePicker({ data, onUpdate }: Props) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700">
        희망 시간대 <span className="text-red-500 font-bold">*</span>
      </Label>
      <div className="flex items-center gap-2">
        <Select
          value={data.startTime}
          onValueChange={(val) => onUpdate({ startTime: val })}
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue placeholder="시작 시간" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-xl border-border-subtle">
            {TIME_OPTIONS.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-gray-400 font-medium">~</span>
        <Select
          value={data.endTime}
          onValueChange={(val) => onUpdate({ endTime: val })}
        >
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue placeholder="종료 시간" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-xl border-border-subtle">
            {TIME_OPTIONS.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function DaySelector({ data, onUpdate }: Props) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700">
        희망 요일 <span className="text-red-500 font-bold">*</span>
      </Label>

      <div className="flex w-full h-10! bg-white border border-border-subtle rounded-xl relative p-0">
        {["weekday", "weekend", "custom"].map((type, idx) => {
          const label =
            type === "weekday"
              ? "주중"
              : type === "weekend"
                ? "주말"
                : "요일 선택";
          const isActive = data.preferredDayType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onUpdate({ preferredDayType: type as any })}
              className={cn(
                "flex-1 h-full text-sm font-medium transition-all relative focus:outline-none",
                isActive
                  ? "bg-primary-subtle text-primary-default border border-primary-default z-10 -m-px shadow-sm"
                  : "text-gray-400 hover:text-gray-600 bg-white border-transparent border",
                // 양 끝 라운드 처리 (중요: 컨테이너 테두리를 덮기 위해 필수)
                isActive && idx === 0 && "rounded-l-xl",
                isActive && idx === 2 && "rounded-r-xl",
                // 구분선 (선택되지 않았고 마지막이 아닐 때만)
                !isActive &&
                  idx < 2 &&
                  data.preferredDayType !==
                    ["weekday", "weekend", "custom"][idx + 1] &&
                  "after:content-[''] after:absolute after:right-0 after:top-2.5 after:bottom-2.5 after:w-px after:bg-border-subtle",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {data.preferredDayType === "custom" && (
        <div className="mt-3 animate-in fade-in slide-in-from-top-2">
          <ToggleGroup
            type="multiple"
            value={data.customDays}
            onValueChange={(vals) => onUpdate({ customDays: vals })}
            className="flex w-full h-10! bg-white border border-border-subtle rounded-xl relative p-0"
          >
            {["월", "화", "수", "목", "금", "토", "일"].map((day, idx) => {
              const isSelected = data.customDays.includes(day);
              return (
                <ToggleGroupItem
                  key={day}
                  value={day}
                  className={cn(
                    "flex-1 h-full text-sm font-medium transition-all relative focus:outline-none bg-transparent",
                    isSelected
                      ? "bg-primary-subtle text-primary-default border border-primary-default z-10 -m-px shadow-sm"
                      : "text-gray-400 hover:text-gray-600 border-transparent border",
                    // 양 끝 라운드 처리
                    isSelected && idx === 0 && "rounded-l-xl",
                    isSelected && idx === 6 && "rounded-r-xl",
                    // 구분선
                    !isSelected &&
                      idx < 6 &&
                      !data.customDays.includes(
                        ["월", "화", "수", "목", "금", "토", "일"][idx + 1],
                      ) &&
                      "after:content-[''] after:absolute after:right-0 after:top-2.5 after:bottom-2.5 after:w-px after:bg-border-subtle",
                  )}
                >
                  {day}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
      )}
    </div>
  );
}

function DeadlinePicker({ data, onUpdate }: Props) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700">
        투표 마감일 <span className="text-red-500 font-bold">*</span>
      </Label>
      <div className="flex items-center gap-2">
        <Input
          type="date"
          className={cn(inputBaseClass, "flex-1")}
          value={data.deadlineDate}
          onChange={(e) => onUpdate({ deadlineDate: e.target.value })}
        />
        <div className="flex-1">
          <Select
            value={data.deadlineTime}
            onValueChange={(val) => onUpdate({ deadlineTime: val })}
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="시간 선택" />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-xl border-border-subtle">
              {TIME_OPTIONS.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function PlaceRecommendation() {
  const [recommendPlace, setRecommendPlace] = useState(false);
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-semibold text-gray-700">장소 추천</Label>
        <p className="text-xs text-gray-400 leading-normal">
          중간 지점을 계산해서 모임 장소를 추천해 드려요
        </p>
      </div>
      <div className="flex gap-2">
        {[false, true].map((val) => (
          <button
            key={val ? "yes" : "no"}
            onClick={() => setRecommendPlace(val)}
            className={cn(
              "flex-1 h-10! rounded-xl text-sm font-bold transition-all border",
              recommendPlace === val
                ? "bg-primary-subtle text-primary-default border-primary-default shadow-sm"
                : "border-border-subtle bg-white text-gray-400 hover:bg-gray-50",
            )}
          >
            {val ? "네, 추천해주세요" : "아니오"}
          </button>
        ))}
      </div>
    </div>
  );
}
