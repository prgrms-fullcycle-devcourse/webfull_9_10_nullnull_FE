import { api } from "@/shared/api/axios";
import type { RoomDetailData } from "../types/room";

interface RoomDetailResponse {
  statusCode: number;
  data: RoomDetailData;
}

export const roomApi = {
  getDetail: async (slug: string): Promise<RoomDetailData> => {
    const { data } = await api.get<RoomDetailResponse>(`/rooms/${slug}`);
    return data.data;
  },
};
