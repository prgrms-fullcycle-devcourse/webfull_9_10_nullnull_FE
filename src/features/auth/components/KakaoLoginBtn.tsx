"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

export const KakaoLoginBtn = () => {
  const handleKakaoLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });
  };

  return (
    <Button
      onClick={handleKakaoLogin}
      className="w-full bg-[#FEE500] text-[#000000] hover:bg-[#FEE500]/90 flex items-center justify-center gap-2 h-12 text-base font-bold rounded-xl border-none shadow-none"
    >
      <i className="icon icon-kakao"></i>
      카카오로 시작하기
    </Button>
  );
};
