import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/useAuthStore";
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
      // 로컬 스토리지에 구버전 데이터(user_id)가 있을 수 있으므로 둘 다 체크
      const currentUserId = user?.userId || (user as any)?.user_id;

      if (!currentUserId) {
        throw new Error("사용자 ID를 찾을 수 없습니다. 다시 로그인해주세요.");
      }

      // 1. public.users 테이블 직접 업데이트 (DB 컬럼은 user_id)
      const { data, error } = await supabase
        .from("users")
        .update({ nickname })
        .eq("user_id", currentUserId)
        .select()
        .single();

      if (error) {
        console.error("Supabase Update Error:", error);
        throw new Error(error.message);
      }

      // 2. Auth metadata 동기화
      const { error: authError } = await supabase.auth.updateUser({
        data: { nickname },
      });

      if (authError) {
        console.warn("Auth Metadata Sync Warning:", authError);
      }

      return data;
    },
    onSuccess: (updatedUser) => {
      if (updatedUser) {
        // Zustand 스토어 업데이트
        setUser(updatedUser);
        toast.success("닉네임이 성공적으로 변경되었습니다.");
      }
    },
    onError: (error: any) => {
      console.error("닉네임 변경 최종 실패:", error);
      toast.error(`변경 실패: ${error.message}`);
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
