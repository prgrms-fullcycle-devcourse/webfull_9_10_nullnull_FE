"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell, AppContent, AppLogoLink } from "@/components/layout";
import { KakaoLoginBtn } from "./KakaoLoginBtn";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import TitlePositiveBg from "@/assets/images/components/bg_positive_title.svg";

const loginFeatures = [
  {
    icon: "icon-main-link",
    title: "빠른 링크 공유",
    description: "참여자들에게 링크만 전달하세요",
  },
  {
    icon: "icon-main-timer",
    title: "자동 시간 추천",
    description: "가장 많이 겹치는 시간을 찾아드려요",
  },
];

import { supabase } from "@/lib/supabase/client";
import { authApi } from "../api/auth.api";
import { toast } from "sonner";

import { AppDialog } from "@/components/dialog";

export function LoginForm() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTestLogin = async (email: string, pass: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) throw error;

      if (data.session) {
        const response = await authApi.sync(data.session.access_token);
        setUser(response.data.user);

        Cookies.set("access_token", data.session.access_token, {
          expires: 1 / 24,
        });

        if (response.data.consentRequired) {
          await authApi.consent(data.session.access_token);
        }

        toast.success(`${response.data.user.nickname}님, 환영합니다!`);
        router.push("/");
      }
    } catch (error: any) {
      console.error("테스트 로그인 실패:", error);
      setErrorMsg(
        error.message || "로그인에 실패했습니다. 계정 정보를 확인해주세요.",
      );
    }
  };

  return (
    <>
      <AppDialog
        type="alert"
        open={!!errorMsg}
        onOpenChange={(open) => !open && setErrorMsg(null)}
        title="로그인 실패"
        description={errorMsg || ""}
      />

      <AppShell
        leftSlot={<AppLogoLink />}
        bottomSlot={
          <div className="flex w-full flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => handleTestLogin("host@test.com", "host1234")}
              >
                호스트 로그인
              </Button>
              <Button
                variant="outline"
                onClick={() => handleTestLogin("member@test.com", "member1234")}
              >
                멤버 로그인
              </Button>
            </div>
            <KakaoLoginBtn />
          </div>
        }
      >
        <AppContent className="px-0 py-0">
          <div className="relative min-h-[inherit] overflow-hidden">
            <div
              className="pointer-events-none absolute left-0 top-8 h-[280px] w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${TitlePositiveBg.src})` }}
            />

            <section className="relative z-10 flex w-full flex-col items-center pt-[52px] text-center">
              <h1 className="text-[30px] font-bold leading-9 text-text-primary">
                <span className="block">모두의 시간을</span>
                <span className="block bg-gradient-to-r from-[#5B6EE1] to-[#5FA8D3] bg-clip-text text-transparent">
                  하나로 맞추다
                </span>
              </h1>

              <div className="mt-4 text-base font-medium leading-5 text-text-tertiary">
                <p>복잡한 일정 조율은 이제 그만,</p>
                <p className="mt-1">링크 하나로 간편하게 약속을 잡아보세요</p>
              </div>
            </section>

            <section className="relative z-10 mt-15 flex w-full flex-col gap-4 px-4">
              {loginFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="flex h-[72px] items-center gap-4 rounded-2xl border border-border-subtle bg-white px-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-subtle text-text-tertiary">
                    <span
                      className={`icon ${feature.icon} size-5`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-sm font-semibold leading-[18px] text-foreground">
                      {feature.title}
                    </p>
                    <p className="mt-1 text-xs leading-4 text-text-tertiary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </section>

            <section className="relative z-10 mt-10 flex flex-col items-center text-center">
              <p className="text-xs leading-4 text-text-disabled">
                가입 시 NULLNULL의 서비스 이용약관과
                <br />
                개인정보 처리방침에 동의하게 됩니다.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-medium leading-4 text-text-disabled">
                <Link
                  href="/terms"
                  className="border-b border-border-strong pb-px"
                >
                  이용약관
                </Link>
                <span
                  className="size-[3px] rounded-full bg-border-strong"
                  aria-hidden="true"
                />
                <Link
                  href="/privacy"
                  className="border-b border-border-strong pb-px"
                >
                  개인정보 수집・이용 동의
                </Link>
              </div>
            </section>
          </div>
        </AppContent>
      </AppShell>
    </>
  );
}
