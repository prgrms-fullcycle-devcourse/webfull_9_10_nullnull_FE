// src/app/(main)/new/page.tsx

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";

export default function NewPage() {
  return (
    <AppShell
      title="방 만들기"
      leftSlot={
        <button className="ico ico-back" aria-label="뒤로가기"></button>
      }
      rightSlot={<button>취소</button>}
      bottomSlot={<Button className="w-full h-14">다음</Button>}
    >
      <div className="" style={{ height: "calc(100vh + 200px)", }}>
      </div>
    </AppShell>
  );
}
