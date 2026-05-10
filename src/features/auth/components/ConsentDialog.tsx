"use client";

import React from "react";
import { AppDialog } from "@/components/dialog";

interface ConsentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ConsentDialog({
  open,
  onOpenChange,
  onConfirm,
}: ConsentDialogProps) {
  return (
    <AppDialog
      type="bottom"
      open={open}
      onOpenChange={onOpenChange}
      title="개인정보 수집 · 이용 동의"
      actions={[
        {
          label: "동의하고 계속하기",
          onClick: onConfirm,
          className:
            "bg-[#6B4EFF] hover:bg-[#5A3EE0] text-white h-14 rounded-2xl text-base font-bold",
        },
        {
          label: "닫기",
          variant: "secondary",
          className: "text-gray-400 h-10 text-sm font-medium",
        },
      ]}
      content={
        <div className="px-1 py-2 text-gray-600 text-sm leading-relaxed overflow-y-auto max-h-[60vh]">
          <p className="mb-4 text-gray-500">
            서비스는 다음과 같이 개인정보를 수집·이용합니다.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-800 text-[15px]">
                1. 수집 항목
              </h4>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-500">
                <li>닉네임</li>
                <li>
                  서비스 이용 정보 (모임 참여 정보, 불가능 시간, 출발지 등)
                </li>
                <li>접속 로그 및 기기 정보</li>
                <li>비회원 식별을 위한 브라우저 식별자(UUID)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 text-[15px]">
                2. 수집 목적
              </h4>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-500">
                <li>이용자 식별 및 서비스 제공</li>
                <li>모임 생성 및 일정 조율 기능 제공</li>
                <li>서비스 이용 통계 분석 및 개선</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 text-[15px]">
                3. 보유 및 이용기간
              </h4>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-500">
                <li>회원 탈퇴 또는 서비스 이용 목적 달성 시까지</li>
                <li>
                  단, 모임 데이터는 종료 후 30일 보관 후 삭제될 수 있습니다.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 text-[15px]">
                4. 동의를 거부할 권리
              </h4>
              <p className="mt-1 text-gray-500">
                이용자는 개인정보 수집·이용에 대한 동의를 거부할 수 있으며, 이
                경우 서비스 이용이 제한될 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}
