import {
  RoomStatusBadge,
  ROOM_STATUS_LABEL,
} from "@/features/room/components/RoomTitle";
import { RoomParticipationProgressCard } from "@/features/room/components/RoomParticipationProgressCard";
import { Button } from "@/components/ui/button";
import type { RoomApiResponse } from "@/features/room/types/room";

const MOCK_ATTENDANCE = {
  attending: [
    "난방 고양이",
    "아프리카청춘이다",
    "트와이스",
    "노스트라단무지",
    "잭스패로우",
  ],
  declined: ["스칼렛위치"],
  pending: ["조셉", "생갈치1호의행방불명"],
};

const MOCK_CONFIRMED = {
  date: "26. 05. 24 금요일",
  time: "오후 4:00 - 오후 6:00",
  attendeeCount: 5,
  placeName: "부산 앞 바다",
  placeAddress: "부산광역시 강서구 녹산산단382로14번가길 10-29번지(송정동)",
};

type Props = {
  room: RoomApiResponse;
};

export function RoomDashboardView({ room }: Props) {
  const isConfirmed = room.status === "CONFIRMED" || room.status === "CLOSED";
  const isHostCollecting =
    room.viewerRole === "HOST" && room.status === "COLLECTING";
  const hasUnsubmittedParticipants =
    MOCK_ATTENDANCE.declined.length > 0 || MOCK_ATTENDANCE.pending.length > 0;

  return (
    <div className="flex flex-col gap-5 px-4 py-5">
      <RoomSummary room={room} />

      {isConfirmed ? (
        <ConfirmedInfoCard isHighlighted={room.status === "CONFIRMED"} />
      ) : (
        <RoomParticipationProgressCard
          current={room.participantCount ?? 0}
          max={room.maxParticipants ?? 0}
        />
      )}

      <AttendanceCard
        compact={isHostCollecting && !hasUnsubmittedParticipants}
        showReminder={isHostCollecting && hasUnsubmittedParticipants}
      />
    </div>
  );
}

function RoomSummary({ room }: { room: RoomApiResponse }) {
  const statusMessage = getStatusMessage(room);

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-lg font-bold leading-6 text-text-primary">
          {room.name}
        </h1>
        <RoomStatusBadge status={ROOM_STATUS_LABEL[room.status]} />
      </div>

      {statusMessage && (
        <p className="flex items-center gap-1.5 text-sm leading-[18px] text-text-tertiary">
          <span
            className="icon icon-time !size-3.5 text-text-disabled"
            aria-hidden="true"
          />
          {statusMessage}
        </p>
      )}
    </section>
  );
}

function ConfirmedInfoCard({ isHighlighted }: { isHighlighted: boolean }) {
  return (
    <section
      className={`flex flex-col gap-4 rounded-3xl border border-border-subtle bg-white p-5 ${
        isHighlighted
          ? "[--info-icon-bg:var(--color-info-subtle)] [--info-icon-color:var(--color-info)]"
          : "[--info-icon-bg:var(--color-bg-muted)] [--info-icon-color:var(--color-gray-400)]"
      }`}
    >
      <InfoRow icon="calendar" label="날짜" value={MOCK_CONFIRMED.date} />
      <InfoRow icon="time" label="시간" value={MOCK_CONFIRMED.time} />
      <InfoRow
        icon="person"
        label="참석 인원"
        value={`${MOCK_CONFIRMED.attendeeCount}명`}
      />
      <InfoRow
        icon="pin"
        label="장소"
        value={MOCK_CONFIRMED.placeName}
        description={MOCK_CONFIRMED.placeAddress}
      />
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  description,
}: {
  icon: string;
  label: string;
  value: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--info-icon-bg)]">
        <span
          className={`icon icon-${icon} text-[var(--info-icon-color)]`}
          aria-hidden="true"
        />
      </span>
      <div className="flex flex-col gap-0.5 pt-0.5">
        <span className="text-xs font-medium leading-4 text-text-disabled">
          {label}
        </span>
        <span className="text-sm font-bold leading-[18px] text-text-primary">
          {value}
        </span>
        {description && (
          <span className="text-xs font-medium leading-4 text-text-secondary">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}

function AttendanceCard({
  compact = false,
  showReminder = false,
}: {
  compact?: boolean;
  showReminder?: boolean;
}) {
  return (
    <section className="flex flex-col gap-5 rounded-3xl border border-border-subtle bg-white p-5">
      <h2 className="text-sm font-bold leading-[18px] text-text-primary">
        참여자 명단
      </h2>
      <AttendanceGroup
        tone="success"
        label="참석"
        names={MOCK_ATTENDANCE.attending}
      />
      {!compact && (
        <>
          <AttendanceGroup
            tone="danger"
            label="불참"
            names={MOCK_ATTENDANCE.declined}
          />
          <AttendanceGroup
            tone="muted"
            label="미정"
            names={MOCK_ATTENDANCE.pending}
          />
        </>
      )}
      {showReminder && (
        <Button
          type="button"
          variant="secondary"
          className="h-10 w-full rounded-xl text-sm font-semibold text-text-primary"
          onClick={() => {}}
        >
          리마인드 알림 보내기
        </Button>
      )}
    </section>
  );
}

function AttendanceGroup({
  tone,
  label,
  names,
}: {
  tone: "success" | "danger" | "muted";
  label: string;
  names: string[];
}) {
  const dotClassName = {
    success: "bg-success",
    danger: "bg-danger",
    muted: "bg-border-default",
  }[tone];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className={`size-2 rounded-full ${dotClassName}`} />
        <span className="text-sm font-bold leading-[18px] text-text-primary">
          {label} {names.length}명
        </span>
      </div>
      <div className="flex flex-wrap gap-2 pl-5">
        {names.map((name) => (
          <span
            key={name}
            className="rounded-full border border-border-subtle bg-bg-subtle px-3 py-1 text-xs font-medium leading-4 text-text-secondary"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function getStatusMessage(room: RoomApiResponse) {
  if (room.status === "COLLECTING") {
    const deadline = new Date(room.deadlineAt);
    return `${deadline.getMonth() + 1}월 ${deadline.getDate()}일 모집이 마감돼요`;
  }

  if (room.status === "READY") {
    return "모임장의 확정을 기다리고 있어요";
  }

  return null;
}
