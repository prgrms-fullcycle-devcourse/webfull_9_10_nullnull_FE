"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

export const handleKakaoLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${window.location.origin}/callback`,
    },
  });
};

interface KakaoLoginBtnProps {
  onClick?: () => void;
}

export const KakaoLoginBtn = ({ onClick }: KakaoLoginBtnProps) => {
  return (
    <Button
      onClick={onClick || handleKakaoLogin}
      className="flex w-full items-center justify-center gap-2 rounded-xl border-none bg-[#FEE500] text-[15px] font-semibold leading-[22.5px] text-[#000000] shadow-none hover:bg-[#FEE500]/90"
    >
      <i className="icon icon-kakao" aria-hidden="true" />
      카카오로 3초 만에 시작하기
    </Button>
  );
};
