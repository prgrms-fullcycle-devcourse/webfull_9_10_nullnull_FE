import { useQuery } from "@tanstack/react-query";
import { roomApi } from "../api/room.api";

export const roomKeys = {
  detail: (slug: string) => ["room", slug] as const,
};

export function useRoomDetail(slug: string) {
  return useQuery({
    queryKey: roomKeys.detail(slug),
    queryFn: () => roomApi.getDetail(slug),
    staleTime: 30_000,
    retry: 1,
  });
}
