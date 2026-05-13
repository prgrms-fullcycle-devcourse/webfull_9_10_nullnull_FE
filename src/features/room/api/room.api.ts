import { api } from "@/shared/api/axios";
import type {
  ConfirmRoomPayload,
  CreateRoomResponse,
  JoinRoomResponse,
  RoomCandidates,
  RoomDetailData,
  SubmitParticipationPayload,
} from "../types/room";

interface RoomDetailResponse {
  statusCode: number;
  data: RoomDetailData;
}

interface RoomCandidatesResponse {
  statusCode: number;
  data: RoomCandidates;
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

  confirmRoom: async (
    roomId: number,
    payload: ConfirmRoomPayload,
  ): Promise<void> => {
    await api.post(`/rooms/${roomId}/confirm`, payload);
  },

  submitParticipation: async (
    participantId: number,
    payload: SubmitParticipationPayload,
  ): Promise<void> => {
    await api.patch(`/participants/${participantId}/participation`, payload);
  },
};
