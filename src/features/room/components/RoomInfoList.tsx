type InfoRowProps = {
  icon: string;
  label: string;
  value: string;
  valueClassName?: string;
};

function InfoRow({ icon, label, value, valueClassName }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
        <span
          className={`icon icon-${icon} !size-4 text-gray-400`}
          aria-hidden="true"
        />
      </span>
      <div className="flex flex-col gap-0.5 pt-0.5">
        <span className="text-xs text-gray-400">{label}</span>
        <span
          className={`text-sm font-medium text-gray-700 ${valueClassName ?? ""}`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

type Props = {
  dateRange: { start: string; end: string };
  timeRange: { start: string; end: string };
  days: string[];
  deadline: string;
};

export function RoomInfoList({ dateRange, timeRange, days, deadline }: Props) {
  return (
    <div className="px-5 py-4 flex flex-col gap-4">
      <InfoRow
        icon="calendar"
        label="예상 기간"
        value={`${dateRange.start} ~ ${dateRange.end}`}
      />
      <InfoRow
        icon="time"
        label="희망 시간대"
        value={`${timeRange.start} - ${timeRange.end}`}
      />
      <InfoRow icon="deily" label="후보 요일" value={days.join(", ")} />
      <InfoRow
        icon="deadline"
        label="응답 마감"
        value={`${deadline} 까지`}
        valueClassName="text-red-500"
      />
    </div>
  );
}
