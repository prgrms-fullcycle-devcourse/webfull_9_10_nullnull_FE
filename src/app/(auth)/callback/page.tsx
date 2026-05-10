"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { authApi } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { ConsentDialog } from "@/features/auth/components/ConsentDialog";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [showConsent, setShowConsent] = useState(false);
  const [pendingToken, setPendingToken] = useState<string | null>(null);

  const handleConsentConfirm = async () => {
    if (!pendingToken) return;
    try {
      await authApi.consent(pendingToken);
      setShowConsent(false);
      toast.success("가입을 축하합니다!");
      router.push("/");
    } catch (error) {
      console.error("동의 실패:", error);
      toast.error("동의 처리 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        if (session) {
          const token = session.access_token;
          // 백엔드와 동기화
          const response = await authApi.sync(token);

          setUser(response.data.user);

          // 미들웨어 및 서버 요청용 쿠키 설정
          Cookies.set("access_token", token, { expires: 7 });

          if (response.data.consentRequired) {
            setPendingToken(token);
            setShowConsent(true);
            return;
          }

          toast.success(`${response.data.user.nickname}님, 환영합니다!`);
          router.push("/"); // 무조건 메인 페이지로 리다이렉트
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("인증 실패:", error);
        toast.error("인증 처리 중 오류가 발생했습니다.");
        router.push("/login");
      }
    };

    handleAuthCallback();
  }, [router, setUser]);

  return (
    <>
      <ConsentDialog
        open={showConsent}
        onOpenChange={setShowConsent}
        onConfirm={handleConsentConfirm}
      />
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
          <p className="text-sm text-gray-500">로그인 처리 중입니다...</p>
        </div>
      </div>
    </>
  );
}
