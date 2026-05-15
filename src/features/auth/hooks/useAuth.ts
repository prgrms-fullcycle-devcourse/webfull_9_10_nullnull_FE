import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/useAuthStore";
import { authApi } from "../api/auth.api";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, setUser } = useAuthStore();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // 프론트엔드 세션 종료 (Supabase)
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
      console.error("로그아웃 실패:", error);
      alert("로그아웃 처리 중 문제가 발생했습니다.");
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: async () => {
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

  const updateNicknameMutation = useMutation({
    mutationFn: async (nickname: string) => {
      const response = await authApi.updateNickname(nickname);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.user) {
        // 백엔드 응답의 id를 프론트엔드의 userId로 매핑하여 스토어 업데이트
        setUser({
          ...user!,
          userId: data.user.id,
          nickname: data.user.nickname,
        });
        toast.success("닉네임이 성공적으로 변경되었습니다.");
      }
    },
    onError: (error: any) => {
      console.error("닉네임 변경 실패:", error);
      toast.error(
        `변경 실패: ${error.response?.data?.message || error.message}`,
      );
    },
  });

  return {
    user,
    isAuthenticated,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    withdraw: withdrawMutation.mutate,
    isWithdrawing: withdrawMutation.isPending,
    updateNickname: updateNicknameMutation.mutate,
    isUpdatingNickname: updateNicknameMutation.isPending,
  };
};
