"use client";

import Link from "next/link";
import { AppShell, AppContent, AppLogoLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { RoomCardsAnimation } from "@/components/visual/RoomCardsAnimation";
import TitlePositiveBg from "@/assets/images/components/bg_positive_title.svg";

export function HomeLandingView() {
  return (
    <AppShell
      leftSlot={<AppLogoLink />}
      rightSlot={
        <Button className="h-10 rounded-xl px-4" asChild>
          <Link href="/login">로그인</Link>
        </Button>
      }
      bottomSlot={
        <Button size="cta" asChild>
          <Link href="/login">모임 만들기</Link>
        </Button>
      }
    >
      <AppContent>
        <section
          className="relative flex flex-col items-center overflow-hidden bg-contain bg-no-repeat bg-position-[center_top_-2rem] pb-10 pt-10 text-center"
          style={{ backgroundImage: `url(${TitlePositiveBg.src})` }}
        >
          <div className="relative z-10 px-5">
            <h1 className="text-3xl font-extrabold leading-tight text-gray-950">
              <span className="block">안되는 시간 빼고,</span>
              <span className="block bg-linear-to-r from-[#5B6EE1] to-[#5FA8D3] bg-clip-text text-transparent">
                널널한 시간 찾기
              </span>
            </h1>
            <div className="mt-4 text-[17px] font-medium leading-relaxed text-gray-400">
              <p>복잡한 일정 조율은 이제 그만.</p>
              <p className="mt-0.5">
                안 되는 시간만 알려주면 널널이 찾아드려요.
              </p>
            </div>
          </div>

          <RoomCardsAnimation />
        </section>
      </AppContent>
    </AppShell>
  );
}
