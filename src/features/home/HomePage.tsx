import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import mainTitleBg from "@/assets/images/main/bg_main_title.svg";
import { HomeAnimation } from "@/features/home/components/HomeAnimation";

import Link from "next/link";

export function HomePage() {
  return (
    <AppShell
      leftSlot={<button className="icon icon-logo" aria-label="nullnull 홈" />}
      rightSlot={<Button className="h-10 rounded-xl px-4">로그인</Button>}
      bottomSlot={
        <Button size="cta" asChild>
          <Link href="/room">모임 만들기</Link>
        </Button>
      }
    >
      <div className="min-h-[inherit] px-4 pt-8">
        <section
          className="relative flex flex-col items-center overflow-hidden bg-contain bg-center bg-no-repeat bg-position-[center_top_-2rem] pb-10 pt-10 text-center"
          style={{ backgroundImage: `url(${mainTitleBg.src})` }}
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

          <HomeAnimation />
        </section>
      </div>
    </AppShell>
  );
}
