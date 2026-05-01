export type RoomStatus = "모집중" | "마감" | "확정" | "종료" | "진행중";

const STATUS_STYLE: Record<RoomStatus, string> = {
  모집중: "text-[#6B4EFF] bg-[#EDEBFF]",
  마감: "text-[#D97706] bg-[#FEF3C7]",
  확정: "text-[#65742E] bg-[#F0F4D1]",
  종료: "text-gray-400 bg-gray-100",
  진행중: "text-teal-600 bg-teal-50",
};

type CategoryConfig = {
  label: string;
  icon: string;
};

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  MEAL: { label: "식사", icon: "food" },
  ANNIVERSARY: { label: "파티", icon: "anniv" },
  CAFE: { label: "카페", icon: "coffee" },
  BAR: { label: "술", icon: "bar" },
  STUDY: { label: "스터디", icon: "study" },
  GAME: { label: "게임", icon: "game" },
  MEETING: { label: "회의", icon: "meeting" },
  EXERCISE: { label: "운동", icon: "exercise" },
  OTHER: { label: "기타", icon: "star" },
};

type Props = {
  title: string;
  hostName: string;
  category: string;
  status: RoomStatus;
};

export function RoomTitle({ title, hostName, category, status }: Props) {
  const categoryConfig = CATEGORY_CONFIG[category] ?? {
    label: category,
    icon: "star",
  };
  const statusStyle = STATUS_STYLE[status] ?? "text-gray-400 bg-gray-100";

  return (
    <div className="px-5 pt-5 pb-4 flex flex-col gap-3">
      <div className="flex gap-2 flex-wrap">
        {/* 카테고리 뱃지 */}
        <span className="flex items-center gap-1 text-xs font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
          <span
            className={`icon icon-${categoryConfig.icon} text-teal-600`}
            style={{ width: "1rem", height: "1rem" }}
            aria-hidden="true"
          />
          {categoryConfig.label}
        </span>

        {/* 상태 뱃지 */}
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyle}`}
        >
          {status}
        </span>
      </div>

      <h2 className="text-lg font-bold text-gray-900">{title}</h2>

      <div className="flex items-center gap-2">
        <span
          className="icon icon-host text-[#6B4EFF] shrink-0"
          aria-hidden="true"
        />
        <span className="text-xs text-gray-400">모임장</span>
        <span className="text-sm font-medium text-gray-700">{hostName}</span>
      </div>
    </div>
  );
}
