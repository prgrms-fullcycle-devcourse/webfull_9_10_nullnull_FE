"use client";

import React from "react";
import { AppDialog } from "@/components/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function PrivacyPolicy({ open, onOpenChange, trigger }: Props) {
  return (
    <AppDialog
      type="full"
      title="개인정보처리방침"
      open={open}
      onOpenChange={onOpenChange}
      content={
        <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
          <section>
            <h3 className="font-bold text-gray-900 mb-2">
              1. 개인정보의 수집 및 이용 목적
            </h3>
            <p>
              널널 (NullNull)(이하 &quot;회사&quot;)은 다음의 목적을 위하여
              개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
              용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의
              동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>서비스 제공 및 이용자 식별</li>
              <li>모임 생성 및 일정 조율 기능 제공</li>
              <li>서비스 개선 및 통계 분석</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2">
              2. 수집하는 개인정보 항목
            </h3>
            <p>
              회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집하고
              있습니다.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>필수항목: 닉네임, 접속 로그, 쿠키, 기기 정보</li>
              <li>
                선택항목: 서비스 이용 과정에서 생성되는 모임 정보, 출발지 정보
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2">
              3. 개인정보의 보유 및 이용 기간
            </h3>
            <p>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 이용자로부터
              개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서
              개인정보를 처리·보유합니다.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>회원 탈퇴 시까지</li>
              <li>
                다만, 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는
                해당 수사·조사 종료 시까지
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2">
              4. 이용자의 권리·의무 및 행사방법
            </h3>
            <p>
              이용자는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지
              요구 등의 권리를 행사할 수 있습니다.
            </p>
          </section>
        </div>
      }
    >
      {trigger}
    </AppDialog>
  );
}
