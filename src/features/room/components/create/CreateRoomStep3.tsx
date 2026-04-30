"use client";

import React, { useState } from "react";

const TIME_OPTIONS = Array.from({ length: 24 }).map((_, i) => {
  const isPM = i >= 12;
  const hour = i % 12 === 0 ? 12 : i % 12;
  const ampm = isPM ? "오후" : "오전";
  return `${ampm} ${hour}:00`;
});

export function CreateRoomStep3() {
  const [preferredDay, setPreferredDay] = useState("weekday");
  const [customDays, setCustomDays] = useState<string[]>([]);
  const [recommendPlace, setRecommendPlace] = useState(false);

  const toggleDay = (day: string) => {
    setCustomDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
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
        <label className="text-sm font-medium text-gray-700">
          희망 날짜 범위 <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="flex-1 h-12 px-3 rounded-xl border border-gray-200 text-sm bg-white"
            defaultValue="2026-05-01"
          />
          <span className="text-gray-400">~</span>
          <input
            type="date"
            className="flex-1 h-12 px-3 rounded-xl border border-gray-200 text-sm bg-white"
            defaultValue="2026-05-30"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          희망 시간대 <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <select
            className="flex-1 h-12 px-3 rounded-xl border border-gray-200 text-sm appearance-none bg-white"
            defaultValue="오후 6:00"
          >
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <span className="text-gray-400">~</span>
          <select
            className="flex-1 h-12 px-3 rounded-xl border border-gray-200 text-sm appearance-none bg-white"
            defaultValue="오후 10:00"
          >
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          희망 요일 <span className="text-red-500">*</span>
        </label>
        <div className="flex rounded-xl overflow-hidden h-12 border border-gray-200 bg-white divide-x divide-gray-200">
          <button
            onClick={() => setPreferredDay("weekday")}
            className={`flex-1 font-medium text-sm transition-colors relative ${
              preferredDay === "weekday"
                ? "bg-[#6B4EFF] text-white z-10"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            주중
          </button>
          <button
            onClick={() => setPreferredDay("weekend")}
            className={`flex-1 font-medium text-sm transition-colors relative ${
              preferredDay === "weekend"
                ? "bg-[#6B4EFF] text-white z-10"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            주말
          </button>
          <button
            onClick={() => setPreferredDay("custom")}
            className={`flex-1 font-medium text-sm transition-colors relative ${
              preferredDay === "custom"
                ? "bg-[#6B4EFF] text-white z-10"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            요일 선택
          </button>
        </div>
        {preferredDay === "custom" && (
          <div className="flex gap-2 mt-1">
            {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`flex-1 h-10 rounded-xl font-medium text-sm transition-colors border ${
                  customDays.includes(day)
                    ? "bg-[#F5F3FF] text-[#6B4EFF] border-[#6B4EFF]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
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
        <label className="text-sm font-medium text-gray-700">
          투표 마감일 <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="flex-1 h-12 px-3 rounded-xl border border-gray-200 text-sm bg-white"
            defaultValue="2026-05-07"
          />
          <select
            className="flex-1 h-12 px-3 rounded-xl border border-gray-200 text-sm appearance-none bg-white"
            defaultValue="오전 9:00"
          >
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 장소 추천 */}
      <div className="flex flex-col gap-2 mb-8">
        <div>
          <label className="text-sm font-medium text-gray-700">
            장소 추천 <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">
            중간 지점을 계산해서 모임 장소를 추천해 드려요
          </p>
        </div>
        <div className="flex gap-2 h-12">
          <button
            onClick={() => setRecommendPlace(false)}
            className={`flex-1 rounded-xl font-medium text-sm transition-colors border ${
              !recommendPlace
                ? "bg-[#F5F3FF] text-[#6B4EFF] border-[#6B4EFF]"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            아니오, 필요없어요
          </button>
          <button
            onClick={() => setRecommendPlace(true)}
            className={`flex-1 rounded-xl font-medium text-sm transition-colors border ${
              recommendPlace
                ? "bg-[#F5F3FF] text-[#6B4EFF] border-[#6B4EFF]"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            네, 추천해주세요
          </button>
        </div>
      </div>
    </div>
  );
}
