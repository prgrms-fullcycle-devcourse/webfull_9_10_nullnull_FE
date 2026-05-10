"use client";

import React from "react";
import { AppDialog } from "@/components/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function ServiceTerms({ open, onOpenChange, trigger }: Props) {
  return (
    <AppDialog
      type="full"
      title="서비스 이용약관"
      open={open}
      onOpenChange={onOpenChange}
      content={
        <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
          <section>
            <h3 className="font-bold text-gray-900 mb-2">제 1조 (목적)</h3>
            <p>
              이 약관은 널널 (NullNull)(이하 &quot;회사&quot;)이 제공하는 관련
              제반 서비스의 이용과 관련하여 회사와 이용자 사이의 권리, 의무 및
              책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2">제 2조 (정의)</h3>
            <p>
              1. &quot;서비스&quot;라 함은 구현되는 단말기(PC, 휴대형단말기 등의
              각종 유무선 장치를 포함)와 상관없이 이용자가 이용할 수 있는 널널
              및 관련 제반 서비스를 의미합니다.
            </p>
            <p className="mt-2">
              2. &quot;이용자&quot;라 함은 회사의 서비스에 접속하여 이 약관에
              따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2">
              제 3조 (약관의 게시와 개정)
            </h3>
            <p>
              1. 회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기
              화면에 게시합니다.
            </p>
            <p className="mt-2">
              2. 회사는 약관의 규제에 관한 법률, 정보통신망 이용촉진 및 정보보호
              등에 관한 법률 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할
              수 있습니다.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2">
              제 4조 (서비스의 제공)
            </h3>
            <p>
              회사는 이용자에게 아래와 같은 서비스를 제공합니다.
              <br />
              1. 모임 일정 조율 및 최적 시간 추천 서비스
              <br />
              2. 모임 장소 추천 및 검색 서비스
              <br />
              3. 기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해
              이용자에게 제공하는 일체의 서비스
            </p>
          </section>
        </div>
      }
    >
      {trigger}
    </AppDialog>
  );
}
