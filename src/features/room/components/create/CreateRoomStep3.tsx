import React from "react";
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

function openDatePicker(event: React.MouseEvent<HTMLInputElement>) {
  event.currentTarget.showPicker?.();
}

function preventDateTyping(event: React.KeyboardEvent<HTMLInputElement>) {
  event.preventDefault();
}

function preventDateTextSelection(event: React.MouseEvent<HTMLInputElement>) {
  event.preventDefault();
}

export function CreateRoomStep3({ data, onUpdate }: Props) {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold leading-tight text-gray-950">
          원하는 모임조건을 설정해 주세요
        </h2>
        <p className="mt-3 text-lg font-medium text-gray-400 leading-relaxed">
          최적의 시간은 널널이 찾아드려요
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6 pb-10">
        <DateRangePicker data={data} onUpdate={onUpdate} />
        <TimeRangePicker data={data} onUpdate={onUpdate} />
        <DaySelector data={data} onUpdate={onUpdate} />
        <DeadlinePicker data={data} onUpdate={onUpdate} />
        <PlaceRecommendation data={data} onUpdate={onUpdate} />
      </div>
    </div>
  );
}

function DateRangePicker({ data, onUpdate }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const endDateMin = data.startDate || today;

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700">
        희망 날짜 범위 <span className="text-red-500 font-bold">*</span>
      </Label>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Input
          type="date"
          className="cursor-pointer select-none"
          min={today}
          value={data.startDate}
          onMouseDown={preventDateTextSelection}
          onClick={openDatePicker}
          onKeyDown={preventDateTyping}
          onChange={(e) => onUpdate({ startDate: e.target.value })}
        />
        <span className="text-sm font-medium text-text-disabled">~</span>
        <Input
          type="date"
          className="cursor-pointer select-none"
          min={endDateMin}
          value={data.endDate}
          onMouseDown={preventDateTextSelection}
          onClick={openDatePicker}
          onKeyDown={preventDateTyping}
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
          <SelectTrigger>
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
          <SelectTrigger>
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

      <div className="relative flex h-10 w-full overflow-hidden rounded-xl border border-border-subtle bg-white p-0">
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
                "relative h-full flex-1 border-y border-l border-transparent border-r border-r-border-subtle text-sm font-medium transition-all last:border-r-transparent focus:outline-none",
                isActive
                  ? "z-10 border-transparent bg-primary/10 text-primary ring-1 ring-inset ring-primary"
                  : "bg-white text-gray-400 hover:text-gray-600",
                idx === 0 && "rounded-l-xl",
                idx === 2 && "rounded-r-xl",
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
            spacing={3}
            className="grid w-full grid-cols-7 gap-3"
          >
            {["월", "화", "수", "목", "금", "토", "일"].map((day) => {
              const isSelected = data.customDays.includes(day);
              return (
                <ToggleGroupItem
                  key={day}
                  value={day}
                  className={cn(
                    "!h-10 !rounded-xl border border-border-subtle bg-white text-sm font-medium text-text-primary transition-all focus:outline-none",
                    isSelected
                      ? "!border-primary !bg-primary/10 !text-primary"
                      : "hover:text-text-primary",
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
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700">
        투표 마감일 <span className="text-red-500 font-bold">*</span>
      </Label>
      <div className="grid grid-cols-2 items-center gap-2">
        <Input
          type="date"
          className="flex-1 cursor-pointer select-none"
          min={today}
          value={data.deadlineDate}
          onMouseDown={preventDateTextSelection}
          onClick={openDatePicker}
          onKeyDown={preventDateTyping}
          onChange={(e) => onUpdate({ deadlineDate: e.target.value })}
        />
        <div className="flex-1">
          <Select
            value={data.deadlineTime}
            onValueChange={(val) => onUpdate({ deadlineTime: val })}
          >
            <SelectTrigger>
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

function PlaceRecommendation({ data, onUpdate }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-semibold text-gray-700">장소 추천</Label>
        <p className="text-xs text-gray-400 leading-normal">
          중간 지점을 계산해서 모임 장소를 추천해 드려요
        </p>
      </div>
      <div className="relative flex h-10 w-full overflow-hidden rounded-xl border border-border-subtle bg-white p-0">
        {[false, true].map((val, idx) => (
          <button
            key={val ? "yes" : "no"}
            type="button"
            onClick={() => onUpdate({ collectOrigin: val })}
            className={cn(
              "relative h-full flex-1 border-y border-l border-transparent border-r border-r-border-subtle text-sm font-medium transition-all last:border-r-transparent focus:outline-none",
              data.collectOrigin === val
                ? "z-10 border-transparent bg-primary/10 text-primary ring-1 ring-inset ring-primary"
                : "bg-white text-gray-400 hover:text-gray-600",
              idx === 0 && "rounded-l-xl",
              idx === 1 && "rounded-r-xl",
            )}
          >
            {val ? "네, 추천해주세요" : "아니요"}
          </button>
        ))}
      </div>
    </div>
  );
}
