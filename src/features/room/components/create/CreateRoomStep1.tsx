import React from "react";
import { Input } from "@/components/ui/input";

export function CreateRoomStep1() {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          닉네임을 확인해 주세요
        </h1>
        <p className="text-sm text-gray-500">모임에서 표시될 이름이에요</p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          닉네임 <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          placeholder="발넓은모임장"
          defaultValue="발넓은모임장"
        />
      </div>
    </div>
  );
}
