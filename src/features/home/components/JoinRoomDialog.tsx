"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface JoinRoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinRoomDialog({ open, onOpenChange }: JoinRoomDialogProps) {
  const [joinUrl, setJoinUrl] = useState("");
  const router = useRouter();

  const handleJoinSubmit = () => {
    if (!joinUrl.trim()) {
      toast.warning("링크를 입력해 주세요.");
      return;
    }

    try {
      const url = new URL(joinUrl);
      const pathParts = url.pathname.split("/");
      const slug = pathParts[pathParts.indexOf("room") + 1];

      if (slug) {
        router.push(`/room/${slug}`);
        onOpenChange(false);
      } else {
        toast.error("올바른 초대 링크가 아닙니다.");
      }
    } catch {
      if (joinUrl.length > 5) {
        router.push(`/room/${joinUrl.split("/").pop()}`);
        onOpenChange(false);
      } else {
        toast.error("올바른 초대 링크 형식이 아닙니다.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[320px] rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            모임 참가하기
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 pt-1">
            친구에게 받은 초대 링크를
            <br />
            아래에 붙여넣어 주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Input
            placeholder="https://nullnull.app/room/..."
            value={joinUrl}
            onChange={(e) => setJoinUrl(e.target.value)}
            className="rounded-xl border-gray-100 bg-gray-50 px-4 text-sm"
          />
        </div>

        <DialogFooter className="mt-6 border-none bg-transparent p-0">
          <Button onClick={handleJoinSubmit}>참가하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
