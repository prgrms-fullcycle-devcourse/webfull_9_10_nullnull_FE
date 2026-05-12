import { api } from "@/shared/api/axios";
import { type User } from "../types/auth.types";

export interface SyncResponse {
  message: string;
  data: {
    user: User;
    consentRequired: boolean;
  };
}

export const authApi = {
  sync: async (accessToken: string): Promise<SyncResponse> => {
    const { data } = await api.post("/auth/sync", undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  },

  consent: async (accessToken: string) => {
    const { data } = await api.post("/auth/consent", undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  },

  updateNickname: async (nickname: string) => {
    const { data } = await api.patch("/auth/nickname", { nickname });
    return data;
  },
};
