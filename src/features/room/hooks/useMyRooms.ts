import { useQuery } from "@tanstack/react-query";
import { roomApi } from "../api/room.api";

export function useMyRooms() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["myRooms"],
    queryFn: () => roomApi.getMyRooms(),
  });

  return {
    rooms: data?.rooms ?? [],
    isLoading,
    error,
    refresh: refetch,
  };
}
