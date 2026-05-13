import { api } from "@/shared/api/axios";
import type {
  ConfirmRoomPayload,
  RoomCandidates,
  RoomDetailData,
} from "../types/room";

interface RoomDetailResponse {
  statusCode: number;
  data: RoomDetailData;
}

interface RoomCandidatesResponse {
  statusCode: number;
  data: RoomCandidates;
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

  readyRoom: async (roomId: number): Promise<void> => {
    await api.post(`/rooms/${roomId}/ready`);
  },

  getCandidates: async (roomId: number): Promise<RoomCandidates> => {
    const { data } = await api.get<RoomCandidatesResponse>(
      `/rooms/${roomId}/candidates`,
    );
    return data.data;
  },

  confirmRoom: async (
    roomId: number,
    payload: ConfirmRoomPayload,
  ): Promise<void> => {
    await api.post(`/rooms/${roomId}/confirm`, payload);
  },
};
