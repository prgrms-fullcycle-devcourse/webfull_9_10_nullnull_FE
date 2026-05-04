import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import roomLogo from "@/assets/images/room/logo.svg";
import bgPositiveTitle from "@/assets/images/components/bg_positive_title.svg";

export function CreateRoomComplete({
  roomId = "v3-x91-azq",
}: {
  roomId?: string;
}) {
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
            <div className="flex gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#E5F7ED] text-[#00C271] text-[10px] font-bold flex items-center gap-1">
                <i className="icon icon-food w-3 h-3 bg-[#00C271]"></i> 식사
              </span>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-500 text-[10px] font-bold">
                모집중
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              우리 언제 밥 한번 먹지
            </h2>
            <div className="flex items-center gap-2 pb-5 border-b border-gray-100">
              <span className="text-primary font-bold text-xs flex items-center gap-1">
                <i className="icon icon-host w-4 h-4 bg-primary"></i> 모임장
              </span>
              <span className="text-gray-700 text-sm font-medium">
                발넓은모임장
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                <i className="icon icon-calendar w-4 h-4 bg-gray-400"></i>
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-[11px] text-gray-400 font-medium">
                  예상 기간
                </span>
                <span className="text-sm font-medium text-gray-900">
                  2024. 05. 24 (금) ~ 05. 26 (일)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                <i className="icon icon-time w-4 h-4 bg-gray-400"></i>
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-[11px] text-gray-400 font-medium">
                  희망 시간대
                </span>
                <span className="text-sm font-medium text-gray-900">
                  오전 09:00 - 오후 22:00
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                <i className="icon icon-calendar w-4 h-4 bg-gray-400"></i>
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-[11px] text-gray-400 font-medium">
                  후보 요일
                </span>
                <span className="text-sm font-medium text-gray-900">
                  토, 일, 월
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                <i className="icon icon-deadline w-4 h-4 bg-gray-400"></i>
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-[11px] text-gray-400 font-medium">
                  응답 마감
                </span>
                <span className="text-sm font-bold text-red-500">
                  10.14(월) 18:00 까지
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
