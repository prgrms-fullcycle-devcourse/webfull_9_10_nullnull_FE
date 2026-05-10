export type RoomStatus = "COLLECTING" | "READY" | "CONFIRMED" | "CLOSED";

export type ClosedFromStatus = Exclude<RoomStatus, "CLOSED">;

export type ParticipantStatus = "JOINED" | "SUBMITTED" | "DECLINED";

export type ViewerRole = "HOST" | "MEMBER" | "GUEST";

// ---- API 응답 타입 ----

export type RoomViewer = {
  role: ViewerRole;
  participantStatus?: ParticipantStatus;
  nickname?: string;
  consentRequired: boolean;
};

export type RoomInfo = {
  slug: string;
  name: string;
  category: string;
  status: RoomStatus;
  hostNickname: string;
  badge: string;
  text: string;
  dateStart: string;
  dateEnd: string;
  availableDays: number[];
  timeStart: string;
  timeEnd: string;
  collectOrigin: boolean;
  deadlineAt: string;
};

export type RoomSummary = {
  totalCount: number;
  submittedCount: number;
  declinedCount: number;
  joinedCount: number;
  submittedRatio: number;
};

export type RoomParticipants = {
  submitted: string[];
  declined: string[];
  joined: string[];
};

export type BlockedSlot = {
  date: string;
  slotIndex: number;
};

export type MySubmission = {
  nickname: string;
  status: ParticipantStatus;
  blockedSlots: BlockedSlot[];
  origin?: { address: string };
} | null;

export type ConfirmedMeeting = {
  startAt: string;
  endAt: string;
  place: { name: string; address: string };
  confirmedCount: number;
} | null;

export type ClosedInfo = {
  closedAt: string;
  closedFromStatus: ClosedFromStatus;
  closedTrigger: string;
} | null;

export type RoomDetailData = {
  viewer: RoomViewer;
  room: RoomInfo;
  summary: RoomSummary;
  participants: RoomParticipants;
  mySubmission: MySubmission;
  confirmedMeeting: ConfirmedMeeting;
  closed: ClosedInfo;
};

// ---- 컴포넌트용 평탄화 타입 (하위 컴포넌트 호환) ----

export type RoomApiResponse = {
  slug: string;
  name: string;
  category: string;
  status: RoomStatus;
  participantStatus?: ParticipantStatus;
  viewerRole?: ViewerRole;
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
  collectOrigin?: boolean;
  role?: "guest" | "member" | "host";
  nickname?: string;
};

export type RoomLocation = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export interface RoomData {
  nickname: string;
  title: string;
  description?: string;
  category: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  preferredDayType: string;
  customDays: string[];
  deadlineDate: string;
  deadlineTime: string;
  collectOrigin: boolean;
}
