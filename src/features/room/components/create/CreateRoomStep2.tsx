import React from "react";

export function CreateRoomStep2() {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          모임을 소개해 주세요
        </h1>
        <p className="text-sm text-gray-500">
          참여자들이 한눈에 이해할 수 있게해요
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          모임 이름 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="2자 ~ 40자"
          className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6B4EFF] bg-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          모임 카테고리 <span className="text-red-500">*</span>
        </label>
        <select className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6B4EFF] bg-white appearance-none">
          <option>식사</option>
          <option>회의</option>
          <option>기타</option>
        </select>
      </div>
    </div>
  );
}
