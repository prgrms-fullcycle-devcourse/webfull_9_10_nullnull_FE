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

        // getSession()은 현재 세션을 가져오며, URL에 해시가 있는 경우 자동으로 파싱하여 세션을 설정합니다.
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Supabase getSession 에러:", error);
          throw error;
        }

        console.log("세션 확인 결과:", session ? "세션 있음" : "세션 없음");

        if (session) {
          console.log("백엔드 동기화 중...");
          // 백엔드와 동기화
          const response = await authApi.sync(session.access_token);
          console.log("백엔드 동기화 완료:", response);

          setUser(response.data.user);

          // 미들웨어 및 서버 요청용 쿠키 설정
          Cookies.set("access_token", session.access_token, {
            expires: 7,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          if (response.data.consentRequired) {
            console.log("추가 동의 처리 중...");
            await authApi.consent(session.access_token);
          }

          toast.success(`${response.data.user.nickname}님, 환영합니다!`);
          console.log("메인 페이지로 리다이렉트 합니다.");
          router.replace("/"); // replace를 사용하여 히스토리 관리
        } else {
          // 세션이 아직 없는 경우 잠시 기다려보거나 로그인 페이지로 보냄
          console.warn("세션을 찾을 수 없습니다. 로그인 페이지로 이동합니다.");
          router.replace("/login");
        }
      } catch (error) {
        console.error("인증 실패 상세:", error);
        toast.error("로그인 처리 중 오류가 발생했습니다.");
        router.replace("/login");
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
