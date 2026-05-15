"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { authApi } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        if (session) {
          // 백엔드와 동기화
          const response = await authApi.sync(session.access_token);

          setUser(response.data.user);

          // 미들웨어 및 서버 요청용 쿠키 설정
          Cookies.set("access_token", session.access_token, { expires: 7 });

          if (response.data.consentRequired) {
            // 카카오 로그인 시 이미 동의를 받았으므로 백엔드에 즉시 동의 처리 요청
            await authApi.consent(session.access_token);
          }

          toast.success(`${response.data.user.nickname}님, 환영합니다!`);
          router.push("/"); // 무조건 메인 페이지로 리다이렉트
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("인증 실패:", error);
        router.push("/login");
      }
    };

    handleAuthCallback();
  }, [router, setUser]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
        <p className="text-sm text-gray-500">로그인 처리 중입니다...</p>
      </div>
    </div>
  );
}
