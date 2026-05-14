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
        <Button asChild>
          <Link href="/login">모임 만들기</Link>
        </Button>
      }
    >
      <AppContent className="px-0 py-0">
        <section className="relative flex flex-col items-center overflow-hidden pb-10 pt-[52px] text-center">
          <div
            className="pointer-events-none absolute left-0 top-8 h-[280px] w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${TitlePositiveBg.src})` }}
          />
          <div className="relative z-10 px-5">
            <h1 className="text-[30px] font-bold leading-9 text-text-primary">
              <span className="block">안되는 시간 빼고,</span>
              <span className="block text-primary">널널한 시간 찾기</span>
            </h1>
            <div className="mt-4 text-base font-medium leading-5 text-text-secondary">
              <p>안 되는 시간만 알려주세요.</p>
              <p className="mt-1">가장 완벽한 약속 시간을 찾아드려요.</p>
            </div>
          </div>

          <RoomCardsAnimation />
        </section>
      </AppContent>
    </AppShell>
  );
}
