import { api } from "@/shared/api/axios";
import type { BlockedSlot, RoomDetailData } from "../types/room";

interface SubmitParticipationPayload {
  blockedSlots: BlockedSlot[];
  origin?: { placeName: string; address: string; lat: number; lng: number };
}

interface RoomDetailResponse {
  statusCode: number;
  data: RoomDetailData;
}

export interface CreateRoomResponse {
  slug: string;
  id: number;
}

export interface JoinRoomResponse {
  participantId: number;
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

  declineRoom: async (participantId: number): Promise<void> => {
    await api.patch(`/participants/${participantId}/decline`);
  },

  joinRoom: async (
    roomId: number,
    nickname: string,
  ): Promise<JoinRoomResponse> => {
    const { data } = await api.post<{ data: JoinRoomResponse }>(
      `/rooms/${roomId}/participants`,
      { nickname },
    );
    return data.data;
  },

  submitParticipation: async (
    participantId: number,
    payload: SubmitParticipationPayload,
  ): Promise<void> => {
    await api.patch(`/participants/${participantId}/participation`, payload);
  },
};
