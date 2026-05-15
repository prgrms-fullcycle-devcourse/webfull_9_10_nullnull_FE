"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/useAuthStore";
import { authApi } from "@/features/auth/api/auth.api";
import Cookies from "js-cookie";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore();

  useEffect(() => {
    // 앱 시작 시 및 인증 상태 변경 시 세션 동기화
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(
        "Auth state changed:",
        event,
        session ? "Session exists" : "No session",
      );

      if (session) {
        // 이미 유저 정보가 있는 경우에는 세션 쿠키만 갱신 (선택 사항)
        // 만약 강제 동기화가 필요하다면 여기서 authApi.sync 호출
        if (event === "SIGNED_IN") {
          try {
            const response = await authApi.sync(session.access_token);
            setUser(response.data.user);
            Cookies.set("access_token", session.access_token, {
              expires: 7,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
            });
          } catch (error) {
            console.error("Auth provider sync failed:", error);
          }
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        Cookies.remove("access_token");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  return <>{children}</>;
}
