"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { authApi } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { AgreementDialog } from "@/components/dialog/AgreementDialog";
import { ServiceTerms } from "@/components/terms/ServiceTerms";
import { PrivacyPolicy } from "@/components/terms/PrivacyPolicy";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [showAgreement, setShowAgreement] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleOpenTerm = (id: "service" | "privacy") => {
    if (id === "service") setShowTerms(true);
    if (id === "privacy") setShowPrivacy(true);
  };

  const handleAgreeConfirm = async () => {
    if (!accessToken) return;
    try {
      await authApi.consent(accessToken);
      toast.success("약관 동의가 완료되었습니다.");
      router.replace("/");
    } catch (error) {
      console.error("동의 처리 실패:", error);
      toast.error("동의 처리 중 오류가 발생했습니다.");
    }
  };

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
            // 동의가 필요한 경우에만 다이얼로그 노출
            setAccessToken(session.access_token);
            setShowAgreement(true);
          } else {
            // 이미 동의한 회원이면 즉시 메인으로
            toast.success(`${response.data.user.nickname}님, 환영합니다!`);
            router.replace("/");
          }
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

      {/* 동의가 필요할 때만 뜨는 다이얼로그 */}
      <AgreementDialog
        open={showAgreement}
        onOpenChange={setShowAgreement}
        onAgree={handleAgreeConfirm}
        onOpenTerm={handleOpenTerm}
      />

      <ServiceTerms open={showTerms} onOpenChange={setShowTerms} />
      <PrivacyPolicy open={showPrivacy} onOpenChange={setShowPrivacy} />
    </div>
  );
}
