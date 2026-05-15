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
        console.log("인증 콜백 처리 시작...");
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("getSession 에러:", error);
          throw error;
        }

        console.log("세션 확인 결과:", session ? "세션 있음" : "세션 없음");

        if (session) {
          console.log("백엔드 동기화 중...");
          const response = await authApi.sync(session.access_token);
          setUser(response.data.user);

          Cookies.set("access_token", session.access_token, {
            expires: 7,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          if (response.data.consentRequired) {
            await authApi.consent(session.access_token);
          }

          toast.success(`${response.data.user.nickname}님, 환영합니다!`);
          router.replace("/");
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("인증 실패 상세:", error);
        toast.error("로그인 중 오류가 발생했습니다.");
        router.replace("/login");
      }
    };

    handleAuthCallback();
  }, [router, setUser]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
        <p className="text-sm text-gray-500 font-medium">로그인 중입니다...</p>
      </div>
    </div>
  );
}
