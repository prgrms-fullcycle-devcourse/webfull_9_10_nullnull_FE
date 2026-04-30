export type RoomApiResponse = {
  slug: string;
  name: string;
  category: string;
  status: string;
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
