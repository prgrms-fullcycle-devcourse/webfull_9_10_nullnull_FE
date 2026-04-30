"use client";

import { Button } from "@/components/ui/button";

type Props = {
  onClose: () => void;
  onAgree: () => void;
};

export function PrivacyConsentSheet({ onClose, onAgree }: Props) {
  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end bg-black/20"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl px-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-1" />

        <div className="flex items-center justify-between pt-4 pb-3">
          <h2 className="text-lg font-bold text-gray-900">
            개인정보 수집·이용 동의
          </h2>
          <button
            onClick={onClose}
            className="icon icon-close text-gray-400"
            aria-label="닫기"
          />
        </div>

        <div className="text-sm text-gray-600 leading-relaxed max-h-64 overflow-y-auto pr-1">
          <p className="mb-3">
            서비스는 다음과 같이 개인정보를 수집·이용합니다.
          </p>

          <p className="font-semibold text-gray-800 mb-1">1. 수집 항목</p>
          <ul className="list-disc pl-4 mb-3 flex flex-col gap-1">
            <li>닉네임</li>
            <li>서비스 이용 정보 (모임 참여 정보, 불가능 시간, 출발지 등)</li>
            <li>접속 로그 및 기기 정보</li>
            <li>비활성화 식별을 위한 브라우저식별자(UUID)</li>
          </ul>

          <p className="font-semibold text-gray-800 mb-1">2. 수집 목적</p>
          <ul className="list-disc pl-4 mb-3 flex flex-col gap-1">
            <li>모임 생성 및 일정 조율 기능 제공</li>
            <li>서비스 이용 통계 분석 및 개선</li>
          </ul>

          <p className="font-semibold text-gray-800 mb-1">3. 보유 이용기간</p>
          <ul className="list-disc pl-4 mb-3 flex flex-col gap-1">
            <li>회원 탈퇴 또는 서비스 이용 목적 달성 시 즉시 삭제 시킵니다.</li>
            <li>
              단, 모임 데이터는 서비스 종료 후 30일 보존 후 삭제될 수 있습니다.
            </li>
          </ul>

          <p className="font-semibold text-gray-800 mb-1">
            4. 동의를 거부할 권리
          </p>
          <p>
            이용자는 개인정보 수집·이용에 대한 동의를 거부할 수 있으며, 이 경우
            서비스 이용에 제한이 있을 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Button size="cta" onClick={onAgree}>
            동의하고 계속하기
          </Button>
          <Button size="cta" variant="ghost" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}
