export type RoomStatus = "COLLECTING" | "READY" | "CONFIRMED" | "CLOSED";

export type ClosedFromStatus = Exclude<RoomStatus, "CLOSED">;

export type ParticipantStatus = "JOINED" | "SUBMITTED" | "DECLINED";

export type ViewerRole = "HOST" | "MEMBER" | "GUEST";

// ---- API 응답 타입 ----

export type RoomViewer = {
  role: ViewerRole;
  participantId?: number | null;
  participantStatus?: ParticipantStatus | null;
  nickname?: string | null;
  consentRequired: boolean;
};

export type RoomInfo = {
  roomId: number;
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
  slotIndexes: number[];
};

export type MySubmission = {
  nickname: string;
  status: ParticipantStatus;
  blockedSlots: { date: string; slotIndex: number }[];
  origin?: { placeName: string; address: string; lat: number; lng: number };
} | null;

export type RoomListItem = {
  roomId: number;
  slug: string;
  name: string;
  category: string;
  status: RoomStatus;
  myRole: "HOST" | "MEMBER";
  hostNickname: string;
  participantCount: number;
  submittedCount: number;
  submittedRatio: number;
  confirmedMeeting: {
    startAt: string;
    placeName: string | null;
  } | null;
  dateStart: string;
  dateEnd: string;
  deadlineAt: string;
  createdAt: string;
};

export type RoomListResponse = {
  totalCount: number;
  rooms: RoomListItem[];
};

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

export type RoomTimeCandidate = {
  id: number;
  date: string;
  rank: number;
  startAt: string;
  endAt: string;
  availableCount: number;
  durationMinutes: number;
  unavailableParticipants: {
    participantId: number;
    nickname: string;
  }[];
};

export type RoomPlaceCandidate = {
  id: number;
  rank: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type RoomCandidates = {
  submittedParticipantCount: number;
  timeCandidates: RoomTimeCandidate[];
  placeCandidates: RoomPlaceCandidate[];
};

export type ConfirmRoomPayload = {
  timeCandidateId: number;
  placeCandidateId?: number | null;
};

export type RoomDetailData = {
  viewer: RoomViewer;
  room: RoomInfo;
  summary: RoomSummary;
  participants: RoomParticipants;
  mySubmission: MySubmission;
  confirmedMeeting: ConfirmedMeeting;
  closed: ClosedInfo;
};

// ---- API 요청/응답 타입 ----

export interface CreateRoomResponse {
  slug: string;
  id: number;
}

export interface JoinRoomResponse {
  participantId: number;
}

export interface SubmitParticipationPayload {
  blockedSlots: BlockedSlot[];
  origin?: { placeName: string; address: string; lat: number; lng: number };
}

// ---- 컴포넌트용 평탄화 타입 (하위 컴포넌트 호환) ----

export type RoomApiResponse = {
  roomId: number;
  slug: string;
  name: string;
  category: string;
  status: RoomStatus;
  participantStatus?: ParticipantStatus | null;
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
  nickname?: string | null;
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
