"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/useAuthStore";
import { authApi } from "@/features/auth/api/auth.api";
import Cookies from "js-cookie";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useAuthStore();
  const isSyncing = useRef(false);

  useEffect(() => {
    const syncUser = async (session: any) => {
      if (isSyncing.current) return;
      isSyncing.current = true;

      try {
        console.log("AuthProvider: 백엔드 동기화 시도...");
        const response = await authApi.sync(session.access_token);
        setUser(response.data.user);

        Cookies.set("access_token", session.access_token, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
        console.log("AuthProvider: 동기화 성공");
      } catch (error) {
        console.error("AuthProvider: 동기화 실패", error);
      } finally {
        isSyncing.current = false;
      }
    };

    // 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !user) {
        syncUser(session);
      }
    });

    // 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);

      if (session) {
        if (event === "SIGNED_IN" || (event === "INITIAL_SESSION" && !user)) {
          syncUser(session);
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        Cookies.remove("access_token");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, user]);

  return <>{children}</>;
}
