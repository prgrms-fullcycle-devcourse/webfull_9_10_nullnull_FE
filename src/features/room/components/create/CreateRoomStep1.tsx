import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type RoomData } from "../../types/room";
import { type RoomErrors } from "../../hooks/useCreateRoom";
import { cn } from "@/lib/utils";

interface Props {
  data: RoomData;
  errors: RoomErrors;
  onUpdate: (data: Partial<RoomData>) => void;
}

export function CreateRoomStep1({ data, errors, onUpdate }: Props) {
  return (
    <div className="flex-1 flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-bold leading-tight text-gray-950">
          닉네임을 확인해 주세요
        </h1>
        <p className="mt-2 text-lg font-medium text-gray-400 leading-relaxed">
          모임에서 표시될 이름이에요
        </p>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="nickname"
          className="text-sm font-semibold text-gray-700"
        >
          나의 닉네임 <span className="text-red-500 font-bold">*</span>
        </Label>
        <Input
          id="nickname"
          type="text"
          placeholder="발넓은모임장"
          value={data.nickname}
          onChange={(e) => onUpdate({ nickname: e.target.value })}
          className={cn(
            "h-10 rounded-xl border-border-subtle bg-white px-4 text-sm transition-all placeholder:text-gray-300",
            errors.nickname
              ? "border-red-500 ring-1 ring-red-500/10 focus-visible:ring-red-500/20"
              : "focus-visible:border-primary-default focus-visible:ring-primary-default/10",
          )}
        />

        {errors.nickname && (
          <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1 ml-1">
            {errors.nickname}
          </p>
        )}
      </div>
    </div>
  );
}
