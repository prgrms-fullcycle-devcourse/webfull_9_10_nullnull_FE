import { Switch } from "@/components/ui/switch";
import roomLogo from "@/assets/images/room/logo.svg";
import bgPositiveTitle from "@/assets/images/components/bg_positive_title.svg";
import { RoomInfoList } from "@/features/room/components/RoomInfoList";
import { RoomTitle } from "@/features/room/components/RoomTitle";
import { formatDate, formatTime, formatDeadline } from "@/shared/utils/format";

import type { RoomData } from "../../types/room";

export function CreateRoomComplete({ data }: { data: RoomData }) {
  return (
    <div className="flex-1 flex flex-col bg-gray-50 pb-8 min-h-[inherit] relative overflow-hidden">
      <div
        className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[120%] max-w-[500px] h-[300px] pointer-events-none z-0 bg-contain bg-no-repeat bg-center opacity-70"
        style={{ backgroundImage: `url(${bgPositiveTitle.src})` }}
      />

      <div className="pt-[60px] pb-[40px] flex flex-col items-center text-center px-5 relative z-10">
        <div className="w-[84px] h-[84px] rounded-full bg-[#E5EEFF] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(101,70,255,0.1)] overflow-hidden">
          <div
            className="w-[64px] h-[64px] rounded-full bg-cover bg-no-repeat bg-center shadow-sm"
            style={{ backgroundImage: `url(${roomLogo.src})` }}
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
        <div className="bg-white rounded-[20px] p-5 shadow-sm border border-[#EFF1F7] flex items-center justify-between">
          <span className="font-bold text-gray-900 text-sm">
            모임원이 들어오면 알림 받기
          </span>
          <Switch />
        </div>

        <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-[#EFF1F7] flex flex-col">
          <RoomTitle
            title={data.title}
            hostName={data.nickname}
            category={data.category.toUpperCase() as any}
            status="진행중"
          />

          <div className="h-px bg-gray-100" />

          <RoomInfoList
            dateRange={{
              start: formatDate(data.startDate),
              end: formatDate(data.endDate),
            }}
            timeRange={{
              start: formatTime(
                data.startTime.replace("오후 ", "").replace("오전 ", ""),
              ),
              end: formatTime(
                data.endTime.replace("오후 ", "").replace("오전 ", ""),
              ),
            }}
            days={
              data.preferredDayType === "custom"
                ? data.customDays
                : [data.preferredDayType === "weekday" ? "주중" : "주말"]
            }
            deadline={formatDeadline(
              `${data.deadlineDate}T${data.deadlineTime === "오전 9:00" ? "09:00" : "21:00"}:00`,
            )}
          />
        </div>
      </div>
    </div>
  );
}
