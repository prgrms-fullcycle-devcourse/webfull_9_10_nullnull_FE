import Image from "next/image";
import roomLogo from "@/assets/images/room/logo.svg";

export function CreateRoomComplete({
  roomId = "v3-x91-azq",
}: {
  roomId?: string;
}) {
  const inviteUrl = `nznz.app/room/${roomId}`;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 pb-8 min-h-[inherit]">
      <div className="bg-[#0B0A26] relative overflow-hidden px-5 pt-8 pb-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative z-10">
          <Image
            src={roomLogo}
            alt="Room Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <h1 className="text-white text-2xl font-bold mb-2 relative z-10">
          모임이 만들어졌어요
        </h1>
        <p className="text-gray-400 text-sm relative z-10">
          참여자에게 링크를 공유해 보세요
        </p>
        <div className="absolute top-0 left-0 w-full h-full opacity-10"></div>
      </div>

      <div className="px-5 mt-4 relative z-20 flex flex-col gap-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#E5F7ED] text-[#00C271] text-xs font-bold">
                🍴 식사
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-subtle text-primary text-xs font-bold">
                진행중
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              우리 언제 밥 한번 먹지
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-xs flex items-center gap-1">
                <span>🏆</span> 모임장
              </span>
              <span className="text-gray-700 text-sm font-medium">
                발넓은모임장
              </span>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                📅
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-xs text-gray-400 font-medium">
                  예상 기간
                </span>
                <span className="text-sm font-medium text-gray-900">
                  2024. 05. 24 (금) ~ 05. 26 (일)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                🕒
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-xs text-gray-400 font-medium">
                  희망 시간대
                </span>
                <span className="text-sm font-medium text-gray-900">
                  오전 09:00 - 오후 22:00
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                📅
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-xs text-gray-400 font-medium">
                  후보 요일
                </span>
                <span className="text-sm font-medium text-gray-900">
                  토, 일, 월
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                ⌛
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-xs text-gray-400 font-medium">
                  응답 마감
                </span>
                <span className="text-sm font-bold text-red-500">
                  10.14(월) 18:00 까지
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900 text-sm">참여 현황</span>
            <div className="font-bold">
              <span className="text-lg text-gray-900">6</span>
              <span className="text-gray-400 text-sm font-normal"> / 8명</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[75%] rounded-full" />
            </div>
            <span className="text-xs text-gray-500 text-right">
              75% 제출 완료
            </span>
          </div>
        </div>

        <hr className="my-2 border-gray-200" />

        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <span>👥</span> 초대하기
          </h3>

          <div className="flex gap-2">
            <div className="flex-1 h-12 bg-gray-100 rounded-xl px-4 flex items-center text-sm text-gray-500 truncate border border-gray-200">
              {inviteUrl}
            </div>
            <button className="h-12 px-5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 shrink-0 shadow-sm">
              공유
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
