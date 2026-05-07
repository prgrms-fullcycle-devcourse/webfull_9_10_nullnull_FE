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
import { type RoomData } from "../../CreateRoom";

const TIME_OPTIONS = Array.from({ length: 24 }).map((_, i) => {
  const isPM = i >= 12;
  const hour = i % 12 === 0 ? 12 : i % 12;
  const ampm = isPM ? "오후" : "오전";
  return `${ampm} ${hour}:00`;
});

interface Props {
  data: RoomData;
  onUpdate: (data: Partial<RoomData>) => void;
}

export function CreateRoomStep3({ data, onUpdate }: Props) {
  const [recommendPlace, setRecommendPlace] = useState(false);

  const toggleDay = (day: string) => {
    const nextDays = data.customDays.includes(day)
      ? data.customDays.filter((d) => d !== day)
      : [...data.customDays, day];
    onUpdate({ customDays: nextDays });
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          원하는 모임조건을 설정해 주세요
        </h1>
        <p className="text-sm text-gray-500">최적의 시간은 널널이 찾아드려요</p>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-gray-700">
          희망 날짜 범위 <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            className="flex-1 px-3 text-sm h-[40px] rounded-[12px] border border-[#EFF1F7] bg-[#FCFCFC]"
            value={data.startDate}
            onChange={(e) => onUpdate({ startDate: e.target.value })}
          />
          <span className="text-gray-400">~</span>
          <Input
            type="date"
            className="flex-1 px-3 text-sm h-[40px] rounded-[12px] border border-[#EFF1F7] bg-[#FCFCFC]"
            value={data.endDate}
            onChange={(e) => onUpdate({ endDate: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-gray-700">
          희망 시간대 <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-2">
          <Select
            value={data.startTime}
            onValueChange={(val) => onUpdate({ startTime: val })}
          >
            <SelectTrigger className="flex-1 !h-[40px] px-3 rounded-[12px] border border-[#EFF1F7] bg-[#FCFCFC]">
              <SelectValue placeholder="시작 시간" />
            </SelectTrigger>
            <SelectContent>
              {TIME_OPTIONS.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-gray-400">~</span>
          <Select
            value={data.endTime}
            onValueChange={(val) => onUpdate({ endTime: val })}
          >
            <SelectTrigger className="flex-1 !h-[40px] px-3 rounded-[12px] border border-[#EFF1F7] bg-[#FCFCFC]">
              <SelectValue placeholder="종료 시간" />
            </SelectTrigger>
            <SelectContent>
              {TIME_OPTIONS.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-gray-700">
          희망 요일 <span className="text-red-500">*</span>
        </Label>
        <div className="flex rounded-[12px] overflow-hidden h-[40px] border border-[#EFF1F7] bg-[#FCFCFC] divide-x divide-[#EFF1F7]">
          <button
            onClick={() => onUpdate({ preferredDayType: "weekday" })}
            className={`flex-1 font-medium text-sm transition-colors relative ${
              data.preferredDayType === "weekday"
                ? "bg-primary text-primary-foreground z-10"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            주중
          </button>
          <button
            onClick={() => onUpdate({ preferredDayType: "weekend" })}
            className={`flex-1 font-medium text-sm transition-colors relative ${
              data.preferredDayType === "weekend"
                ? "bg-primary text-primary-foreground z-10"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            주말
          </button>
          <button
            onClick={() => onUpdate({ preferredDayType: "custom" })}
            className={`flex-1 font-medium text-sm transition-colors relative ${
              data.preferredDayType === "custom"
                ? "bg-primary text-primary-foreground z-10"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            요일 선택
          </button>
        </div>
        {data.preferredDayType === "custom" && (
          <div className="flex gap-2 mt-1">
            {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`flex-1 h-[40px] rounded-[12px] font-medium text-sm transition-colors border ${
                  data.customDays.includes(day)
                    ? "bg-primary-subtle text-primary border-primary"
                    : "bg-[#FCFCFC] text-gray-700 border-[#EFF1F7] hover:bg-gray-50"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 투표 마감일 */}
      <div className="flex flex-col gap-2">
        <Label className="text-gray-700">
          투표 마감일 <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            className="flex-1 px-3 text-sm h-[40px] rounded-[12px] border border-[#EFF1F7] bg-[#FCFCFC]"
            value={data.deadlineDate}
            onChange={(e) => onUpdate({ deadlineDate: e.target.value })}
          />
          <Select
            value={data.deadlineTime}
            onValueChange={(val) => onUpdate({ deadlineTime: val })}
          >
            <SelectTrigger className="flex-1 !h-[40px] px-3 rounded-[12px] border border-[#EFF1F7] bg-[#FCFCFC]">
              <SelectValue placeholder="마감 시간" />
            </SelectTrigger>
            <SelectContent>
              {TIME_OPTIONS.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 장소 추천 */}
      <div className="flex flex-col gap-2 mb-8">
        <div>
          <Label className="text-gray-700">
            장소 추천 <span className="text-red-500">*</span>
          </Label>
          <p className="text-xs text-gray-500 mt-1">
            중간 지점을 계산해서 모임 장소를 추천해 드려요
          </p>
        </div>
        <div className="flex gap-2 h-[40px]">
          <button
            onClick={() => setRecommendPlace(false)}
            className={`flex-1 rounded-[12px] font-medium text-sm transition-colors border ${
              !recommendPlace
                ? "bg-primary-subtle text-primary border-primary"
                : "bg-[#FCFCFC] text-gray-700 border-[#EFF1F7] hover:bg-gray-50"
            }`}
          >
            아니오, 필요없어요
          </button>
          <button
            onClick={() => setRecommendPlace(true)}
            className={`flex-1 rounded-[12px] font-medium text-sm transition-colors border ${
              recommendPlace
                ? "bg-primary-subtle text-primary border-primary"
                : "bg-[#FCFCFC] text-gray-700 border-[#EFF1F7] hover:bg-gray-50"
            }`}
          >
            네, 추천해주세요
          </button>
        </div>
      </div>
    </div>
  );
}
