import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import roomLogo from "@/assets/images/room/logo.svg";
import bgPositiveTitle from "@/assets/images/components/bg_positive_title.svg";

import type { RoomData } from "../../CreateRoom";

export function CreateRoomComplete({
  _roomId = "v3-x91-azq",
  data,
}: {
  _roomId?: string;
  data: RoomData;
}) {
  const categoryConfigs: Record<
    string,
    { label: string; color: string; bgColor: string }
  > = {
    food: { label: "식사", color: "#00C271", bgColor: "#E5F7ED" },
    anniv: { label: "기념일", color: "#FF5D5D", bgColor: "#FFF0F0" },
    coffee: { label: "카페", color: "#8B5E3C", bgColor: "#F5ECE5" },
    bar: { label: "주점", color: "#7048E8", bgColor: "#F1EDFF" },
    game: { label: "게임", color: "#FF9F0A", bgColor: "#FFF4E5" },
    study: { label: "공부", color: "#007AFF", bgColor: "#E5F1FF" },
    exercise: { label: "운동", color: "#FF2D55", bgColor: "#FFF0F2" },
    meeting: { label: "미팅", color: "#5856D6", bgColor: "#EEEDFA" },
    etc: { label: "기타", color: "#8E8E93", bgColor: "#F2F2F7" },
  };

  const currentCategory = categoryConfigs[data.category] || categoryConfigs.etc;

  const getDayLabel = () => {
    if (data.preferredDayType === "weekday") return "주중";
    if (data.preferredDayType === "weekend") return "주말";
    return data.customDays.join(", ");
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 pb-8 min-h-[inherit] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[120%] max-w-[500px] pointer-events-none z-0">
        <Image
          src={bgPositiveTitle}
          alt="Background Glow"
          className="w-full h-auto opacity-70"
          priority
        />
      </div>

      <div className="pt-[60px] pb-[40px] flex flex-col items-center text-center px-5 relative z-10">
        <div className="w-[84px] h-[84px] rounded-full bg-[#E5EEFF] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(101,70,255,0.1)]">
          <Image
            src={roomLogo}
            alt="Room Logo"
            className="w-[64px] h-[64px] rounded-full object-cover shadow-sm"
          />
        </div>
        <h1 className="text-gray-900 text-2xl font-bold mb-3">
          모임을 만들었어요
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          아래 링크를 공유해 주세요
          <br />
          모임원이 들어오면 바로 알려드릴게요
        </p>
      </div>

      <div className="px-5 relative z-20 flex flex-col gap-4">
        {/* 알림 받기 토글 */}
        <div className="bg-white rounded-[20px] p-5 shadow-sm border border-[#EFF1F7] flex items-center justify-between">
          <span className="font-bold text-gray-900 text-sm">
            모임원이 들어오면 알림 받기
          </span>
          <Switch />
        </div>

        {/* 모임 정보 카드 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#EFF1F7] flex flex-col">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1.5">
              <span
                className="px-2.5 py-1 rounded-[8px] text-[11px] font-bold flex items-center gap-1.5"
                style={{
                  backgroundColor: currentCategory.bgColor,
                  color: currentCategory.color,
                }}
              >
                <i
                  className={`icon icon-${data.category} w-3.5 h-3.5 inline-block`}
                  style={{ color: currentCategory.color }}
                ></i>
                {currentCategory.label}
              </span>
              <span className="px-2.5 py-1 rounded-[8px] bg-blue-50 text-blue-600 text-[11px] font-bold border border-blue-100/50">
                모집중
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {data.title || "제목 없음"}
            </h2>
            <div className="flex items-center gap-2 pb-5 border-b border-gray-100">
              <span className="text-primary font-bold text-xs flex items-center gap-1">
                <i className="icon icon-host w-4 h-4 text-primary inline-block"></i>{" "}
                모임장
              </span>
              <span className="text-gray-700 text-sm font-medium">
                {data.nickname}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                <i className="icon icon-calendar w-4 h-4 text-gray-400 inline-block"></i>
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-[11px] text-gray-400 font-medium">
                  예상 기간
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {data.startDate.replace(/-/g, ". ")} ~{" "}
                  {data.endDate.replace(/-/g, ". ")}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                <i className="icon icon-time w-4 h-4 text-gray-400 inline-block"></i>
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-[11px] text-gray-400 font-medium">
                  희망 시간대
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {data.startTime} - {data.endTime}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                <i className="icon icon-calendar w-4 h-4 text-gray-400 inline-block"></i>
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-[11px] text-gray-400 font-medium">
                  후보 요일
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {getDayLabel()}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                <i className="icon icon-deadline w-4 h-4 text-gray-400 inline-block"></i>
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-[11px] text-gray-400 font-medium">
                  응답 마감
                </span>
                <span className="text-sm font-bold text-red-500">
                  {data.deadlineDate.slice(5).replace("-", ".")} (
                  {data.deadlineTime}) 까지
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
