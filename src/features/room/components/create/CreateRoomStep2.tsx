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
        <Label className="text-gray-700">
          모임 이름 <span className="text-red-500">*</span>
        </Label>
        <Input type="text" placeholder="2자 ~ 40자" />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-gray-700">
          모임 카테고리 <span className="text-red-500">*</span>
        </Label>
        <Select defaultValue="food">
          <SelectTrigger className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="food">
              <div className="flex items-center gap-2">
                <i className="icon icon-food w-4 h-4 bg-gray-500"></i> 식사
              </div>
            </SelectItem>
            <SelectItem value="anniv">
              <div className="flex items-center gap-2">
                <i className="icon icon-anniv w-4 h-4 bg-gray-500"></i> 기념일
              </div>
            </SelectItem>
            <SelectItem value="coffee">
              <div className="flex items-center gap-2">
                <i className="icon icon-coffee w-4 h-4 bg-gray-500"></i> 카페
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center gap-2">
                <i className="icon icon-bar w-4 h-4 bg-gray-500"></i> 주점
              </div>
            </SelectItem>
            <SelectItem value="game">
              <div className="flex items-center gap-2">
                <i className="icon icon-game w-4 h-4 bg-gray-500"></i> 게임
              </div>
            </SelectItem>
            <SelectItem value="study">
              <div className="flex items-center gap-2">
                <i className="icon icon-study w-4 h-4 bg-gray-500"></i> 공부
              </div>
            </SelectItem>
            <SelectItem value="exercise">
              <div className="flex items-center gap-2">
                <i className="icon icon-exercise w-4 h-4 bg-gray-500"></i> 운동
              </div>
            </SelectItem>
            <SelectItem value="meeting">
              <div className="flex items-center gap-2">
                <i className="icon icon-meeting w-4 h-4 bg-gray-500"></i> 미팅
              </div>
            </SelectItem>
            <SelectItem value="etc">
              <div className="flex items-center gap-2">
                <i className="icon icon-star w-4 h-4 bg-gray-500"></i> 기타
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
