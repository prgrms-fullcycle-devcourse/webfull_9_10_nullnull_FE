export type ParticipationStatus = "JOINED" | "SUBMITTED" | "DECLINED";

export type RoomApiResponse = {
  slug: string;
  name: string;
  category: string;
  status: "COLLECT" | "READY" | "CONFIRM" | "CLOSED";
  participationStatus?: ParticipationStatus;
  hostNickname: string;
  badge: string;
  text: string;
  dateStart: string;
  dateEnd: string;
  availableDays: number[];
  timeStart: string;
  timeEnd: string;
  deadlineAt: string;
  participantCount?: number;
  maxParticipants?: number;
};

export type RoomLocation = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};
