import {
  RoomStatusBadge,
  ROOM_STATUS_LABEL,
} from "@/features/room/components/RoomTitle";
import { RoomParticipationProgressCard } from "@/features/room/components/RoomParticipationProgressCard";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/shared/utils/format";
import type {
  RoomApiResponse,
  RoomParticipants,
  ConfirmedMeeting,
} from "@/features/room/types/room";

const DAY_FULL = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

function formatConfirmedDate(isoStr: string): string {
  const date = new Date(isoStr);
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}. ${mm}. ${dd} ${DAY_FULL[date.getDay()]}`;
}

function formatConfirmedTime(startIso: string, endIso: string): string {
  const toTime = (iso: string) => {
    const date = new Date(iso);
    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    return formatTime(`${h}:${m}`);
  };
  return `${toTime(startIso)} - ${toTime(endIso)}`;
}

type Props = {
  room: RoomApiResponse;
  participants: RoomParticipants;
  confirmedMeeting: ConfirmedMeeting;
};

export function RoomDashboardView({
  room,
  participants,
  confirmedMeeting,
}: Props) {
  const isConfirmed = room.status === "CONFIRMED";
  const isClosed = room.status === "CLOSED";
  const isHostCollecting =
    room.viewerRole === "HOST" && room.status === "COLLECTING";
  const hasUnsubmittedParticipants =
    participants.declined.length > 0 || participants.joined.length > 0;

  return (
    <div className="flex flex-col gap-5 px-4 py-5">
      <RoomSummary room={room} />

      {isClosed && room.closed && <ClosureHistoryCard closed={room.closed} />}

      {isConfirmed || (isClosed && confirmedMeeting) ? (
        <ConfirmedInfoCard
          isHighlighted={isConfirmed}
          confirmedMeeting={confirmedMeeting}
        />
      ) : !isClosed ? (
        <RoomParticipationProgressCard
          current={room.participantCount ?? 0}
          max={room.maxParticipants ?? 0}
        />
      ) : null}

      <AttendanceCard
        participants={participants}
        compact={isHostCollecting && !hasUnsubmittedParticipants}
        showReminder={isHostCollecting && hasUnsubmittedParticipants}
      />
    </div>
  );
}

function ClosureHistoryCard({
  closed,
}: {
  closed: NonNullable<RoomApiResponse["closed"]>;
}) {
  const triggerLabel =
    closed.closedTrigger === "MANUAL" ? "방장 직접 종료" : "자동 종료";
  const fromStatusLabel = {
    COLLECTING: "모집 중 종료",
    READY: "확정 대기 중 종료",
    CONFIRMED: "확정 후 종료",
  }[closed.closedFromStatus];

  return (
    <section className="flex flex-col gap-3 rounded-3xl border border-border-subtle bg-bg-subtle p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-text-primary">종료 이력</h2>
        <span className="text-xs font-medium text-text-disabled">
          {new Date(closed.closedAt).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div className="flex gap-2">
        <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-text-secondary shadow-sm">
          {triggerLabel}
        </span>
        <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-text-secondary shadow-sm">
          {fromStatusLabel}
        </span>
      </div>
    </section>
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

function ConfirmedInfoCard({
  isHighlighted,
  confirmedMeeting,
}: {
  isHighlighted: boolean;
  confirmedMeeting: ConfirmedMeeting;
}) {
  return (
    <section
      className={`flex flex-col gap-4 rounded-3xl border border-border-subtle bg-white p-5 ${
        isHighlighted
          ? "[--info-icon-bg:var(--color-info-subtle)] [--info-icon-color:var(--color-info)]"
          : "[--info-icon-bg:var(--color-bg-muted)] [--info-icon-color:var(--color-gray-400)]"
      }`}
    >
      <InfoRow
        icon="calendar"
        label="날짜"
        value={
          confirmedMeeting ? formatConfirmedDate(confirmedMeeting.startAt) : "-"
        }
      />
      <InfoRow
        icon="time"
        label="시간"
        value={
          confirmedMeeting
            ? formatConfirmedTime(
                confirmedMeeting.startAt,
                confirmedMeeting.endAt,
              )
            : "-"
        }
      />
      <InfoRow
        icon="person"
        label="참석 인원"
        value={confirmedMeeting ? `${confirmedMeeting.confirmedCount}명` : "-"}
      />
      <InfoRow
        icon="pin"
        label="장소"
        value={confirmedMeeting?.place?.name ?? "-"}
        description={confirmedMeeting?.place?.address}
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
  participants,
  compact = false,
  showReminder = false,
}: {
  participants: RoomParticipants;
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
        names={participants.submitted}
      />
      {!compact && (
        <>
          <AttendanceGroup
            tone="danger"
            label="불참"
            names={participants.declined}
          />
          <AttendanceGroup
            tone="muted"
            label="미정"
            names={participants.joined}
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
