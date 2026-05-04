"use client";

import { AppShell, AppContent, AppLogoLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import TitlePositiveBg from "@/assets/images/components/bg_positive_title.svg";
import { RoomCardsAnimation } from "@/components/visual/RoomCardsAnimation";

import Link from "next/link";
import { Bell, Settings } from "lucide-react";

export function HomePage() {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    return (
      <AppShell
        leftSlot={<AppLogoLink />}
        rightSlot={
          <div className="flex items-center gap-3 text-gray-700">
            <button aria-label="알림" className="hover:text-gray-900">
              <Bell className="size-6" />
            </button>
            <Link
              href="/setting"
              aria-label="설정"
              className="hover:text-gray-900"
            >
              <Settings className="size-6" />
            </Link>
          </div>
        }
        bottomSlot={
          <Button size="cta" asChild>
            <Link href="/room">모임 만들기</Link>
          </Button>
        }
      >
        <AppContent>
          <section className="px-5 pt-8 pb-10">
            <h1 className="text-2xl font-bold leading-8 text-gray-950">
              {user?.nickname || "사용자"} 님,
              <br />
              어떤 약속을 널널하게 맞춰볼까요?
            </h1>

            <div className="mt-6 flex rounded-xl bg-gray-50 p-1">
              <button className="flex-1 rounded-lg bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm">
                만든 모임
              </button>
              <button className="flex-1 rounded-lg py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                참여한 모임
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {/* 임시 모임 리스트 (추후 컴포넌트로 분리 필요) */}
              <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm border border-gray-50 cursor-pointer hover:shadow-md transition-shadow">
                <div>
                  <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-600 mb-2">
                    모집중
                  </span>
                  <h3 className="text-base font-bold text-gray-900">
                    우리 언제 밥 한번 먹지
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    26년 5월 2일 모집이 마감돼요
                  </p>
                  <div className="mt-3 h-1 w-full rounded-full bg-gray-100">
                    <div className="h-full w-1/2 rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div className="text-gray-400">&gt;</div>
              </div>
            </div>
          </section>
        </AppContent>
      </AppShell>
    );
  }

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
          className="relative flex flex-col items-center overflow-hidden bg-contain bg-center bg-no-repeat bg-position-[center_top_-2rem] pb-10 pt-10 text-center"
          style={{ backgroundImage: `url(${TitlePositiveBg.src})` }}
        >
          <div className="relative z-10">
            <h1 className="text-3xl font-bold leading-9 text-gray-950">
              <span className="block">안되는 시간 빼고,</span>
              <span className="block bg-gradient-to-r from-[#5B6EE1] to-[#5FA8D3] bg-clip-text text-transparent">
                널널한 시간 찾기
              </span>
            </h1>
            <div className="mt-5 text-base font-medium leading-5 text-gray-500">
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
