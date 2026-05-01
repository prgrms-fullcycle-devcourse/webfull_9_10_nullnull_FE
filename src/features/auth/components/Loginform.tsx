import Link from "next/link";
import { AppShell, AppContent, AppLogoLink } from "@/components/layout";
import { Button } from "@/components/ui/button";

const loginFeatures = [
  {
    icon: "var(--ico-main-link)",
    title: "빠른 링크 공유",
    description: "참여자들에게 링크만 전달하세요",
  },
  {
    icon: "var(--ico-main-timer)",
    title: "자동 시간 추천",
    description: "가장 많이 겹치는 시간을 찾아드려요",
  },
];

export function LoginForm() {
  return (
    <AppShell
      leftSlot={<AppLogoLink />}
      bottomSlot={
        <Button className="h-14 w-full gap-2 rounded-2xl border-0 bg-[#FEE500] text-base font-semibold text-black/90 shadow-[0_4px_7px_rgba(254,229,0,0.4)] hover:bg-[#FEE500]/90">
          <span
            className="icon !size-[18px] [--icon-mask:var(--ico-kakao)]"
            aria-hidden="true"
          />
          카카오로 3초 만에 시작하기
        </Button>
      }
    >
      <AppContent>
        <section className="flex w-full flex-col items-center py-10 text-center">
          <h1 className="text-3xl font-bold leading-9 text-gray-950">
            <span className="block">모두의 시간을</span>
            <span className="block bg-gradient-to-r from-[#5B6EE1] to-[#5FA8D3] bg-clip-text text-transparent">
              하나로 맞추다
            </span>
          </h1>

          <div className="mt-5 text-base font-medium leading-5 text-gray-500">
            <p>복잡한 일정 조율은 이제 그만,</p>
            <p className="mt-1">링크 하나로 간편하게 약속을 잡아보세요</p>
          </div>
        </section>

        <section className="mt-5 flex w-full max-w-[311px] flex-col gap-4">
          {loginFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500">
                <span
                  className="icon size-5"
                  style={{ "--icon-mask": feature.icon } as React.CSSProperties}
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm font-semibold leading-[18px] text-foreground">
                  {feature.title}
                </p>
                <p className="mt-1 text-xs leading-4 text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 flex flex-col items-center text-center">
          <p className="text-xs leading-4 text-gray-400">
            가입 시 NULLNULL의 서비스 이용약관과
            <br />
            개인정보 처리방침에 동의하게 됩니다.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-medium leading-4 text-gray-400">
            <Link href="/terms" className="border-b border-gray-300 pb-px">
              이용약관
            </Link>
            <span
              className="size-[3px] rounded-full bg-gray-300"
              aria-hidden="true"
            />
            <Link href="/privacy" className="border-b border-gray-300 pb-px">
              개인정보 수집・이용 동의
            </Link>
          </div>
        </section>
      </AppContent>
    </AppShell>
  );
}
