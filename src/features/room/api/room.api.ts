import { api } from "@/shared/api/axios";
import type { RoomDetailData } from "../types/room";

interface RoomDetailResponse {
  statusCode: number;
  data: RoomDetailData;
}

export interface CreateRoomResponse {
  slug: string;
  id: number;
}

export const roomApi = {
  getDetail: async (slug: string): Promise<RoomDetailData> => {
    const { data } = await api.get<RoomDetailResponse>(`/rooms/${slug}`);
    return data.data;
  },

  create: async (payload: any): Promise<CreateRoomResponse> => {
    const { data } = await api.post<{ data: CreateRoomResponse }>(
      "/rooms",
      payload,
    );
    return data.data;
  },
};
