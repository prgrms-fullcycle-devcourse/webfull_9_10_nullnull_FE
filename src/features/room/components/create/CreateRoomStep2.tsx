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
import { type RoomData } from "../../types/room";
import { type RoomErrors } from "../../hooks/useCreateRoom";
import { cn } from "@/lib/utils";

import { ROOM_CATEGORIES } from "../../constants/room";

interface Props {
  data: RoomData;
  errors: RoomErrors;
  onUpdate: (data: Partial<RoomData>) => void;
}

export function CreateRoomStep2({ data, errors, onUpdate }: Props) {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold leading-tight text-gray-950">
          모임을 소개해 주세요
        </h2>
        <p className="mt-3 text-lg font-medium text-gray-400 leading-relaxed">
          참여자들이 한눈에 이해할 수 있게 해요
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <TitleInput data={data} errors={errors} onUpdate={onUpdate} />
        <CategorySelect data={data} errors={errors} onUpdate={onUpdate} />
      </div>
    </div>
  );
}

function TitleInput({ data, errors, onUpdate }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
        모임 이름 <span className="text-red-500 font-bold">*</span>
      </Label>
      <Input
        id="title"
        type="text"
        placeholder="우리 언제 밥 한번 먹지"
        value={data.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        className={cn(
          "placeholder:text-gray-300",
          errors.title &&
            "border-red-500 ring-1 ring-red-500/10 focus-visible:ring-red-500/20",
        )}
      />
      {errors.title && (
        <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1 ml-1">
          {errors.title}
        </p>
      )}
    </div>
  );
}

function CategorySelect({ data, errors, onUpdate }: Props) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700">
        모임 카테고리 <span className="text-red-500 font-bold">*</span>
      </Label>
      <Select
        value={data.category}
        onValueChange={(val: string) => onUpdate({ category: val })}
      >
        <SelectTrigger
          className={cn(
            errors.category && "border-red-500 ring-1 ring-red-500/10",
          )}
        >
          <SelectValue placeholder="어떤 성격의 모임인가요?" />
        </SelectTrigger>
        <SelectContent className="rounded-xl shadow-xl border-border-subtle">
          {ROOM_CATEGORIES.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.category && (
        <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1 ml-1">
          {errors.category}
        </p>
      )}
    </div>
  );
}
