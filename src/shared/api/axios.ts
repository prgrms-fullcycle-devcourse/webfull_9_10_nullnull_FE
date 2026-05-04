import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

import { supabase } from "@/lib/supabase/client";

api.interceptors.request.use(async (config) => {
  // Supabase SDK를 통해 세션을 가져오면 만료 시 자동 갱신(Token Refresh) 처리됨
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
    // 쿠키 최신화 (미들웨어용)
    Cookies.set("access_token", session.access_token, { expires: 7 });
  } else {
    // 세션이 없을 경우 기존 쿠키 폴백
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("인증이 만료되었습니다.");
      Cookies.remove("access_token");
      // Handle logout if needed
    }
    return Promise.reject(error);
  },
);
