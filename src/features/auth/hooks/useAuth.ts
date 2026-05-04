import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";
// import { authApi } from "../api/auth.api";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, setUser } = useAuthStore();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Optional: authApi.logout() if backend adds it later
    },
    onSuccess: () => {
      queryClient.clear();
      setUser(null);
      Cookies.remove("access_token");
      router.push("/");
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 처리 중 문제가 발생했습니다.");
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: async () => {
      // TODO: 백엔드 회원탈퇴 API가 구현되면 주석 해제
      // await authApi.withdraw();

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.clear();
      setUser(null);
      Cookies.remove("access_token");
      router.push("/");
    },
    onError: (error) => {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴 처리 중 문제가 발생했습니다.");
    },
  });

  return {
    user,
    isAuthenticated,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    withdraw: withdrawMutation.mutate,
    isWithdrawing: withdrawMutation.isPending,
  };
};
