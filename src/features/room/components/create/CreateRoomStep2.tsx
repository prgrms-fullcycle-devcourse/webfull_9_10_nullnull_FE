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
import type { RoomData } from "../../CreateRoom";

interface Props {
  data: RoomData;
  onUpdate: (data: Partial<RoomData>) => void;
}

export function CreateRoomStep2({ data, onUpdate }: Props) {
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
        <Label className="text-gray-700">
          모임 이름 <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          placeholder="2자 ~ 40자"
          value={data.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onUpdate({ title: e.target.value })
          }
          className="h-[40px] rounded-[12px] border border-[#EFF1F7] bg-[#FCFCFC]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-gray-700">
          모임 카테고리 <span className="text-red-500">*</span>
        </Label>
        <Select
          value={data.category}
          onValueChange={(val: string) => onUpdate({ category: val })}
        >
          <SelectTrigger className="w-full !h-[40px] px-4 rounded-[12px] border border-[#EFF1F7] bg-[#FCFCFC]">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="food">식사</SelectItem>
            <SelectItem value="anniv">기념일</SelectItem>
            <SelectItem value="coffee">카페</SelectItem>
            <SelectItem value="bar">주점</SelectItem>
            <SelectItem value="game">게임</SelectItem>
            <SelectItem value="study">공부</SelectItem>
            <SelectItem value="exercise">운동</SelectItem>
            <SelectItem value="meeting">미팅</SelectItem>
            <SelectItem value="etc">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
