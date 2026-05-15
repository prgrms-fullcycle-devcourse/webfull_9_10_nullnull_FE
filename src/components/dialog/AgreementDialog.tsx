"use client";

import { useMemo, useState, type ReactNode } from "react";

import { Checkbox } from "@/components/ui/checkbox";

import { AppDialog } from "./AppDialog";

const REQUIRED_TERMS = [
  { id: "service", label: "서비스 이용약관" },
  { id: "privacy", label: "개인정보 수집 · 이용 동의" },
] as const;

type AgreementTermId = (typeof REQUIRED_TERMS)[number]["id"];

type AgreementDialogProps = {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAgree: () => void;
  onOpenTerm?: (termId: AgreementTermId) => void;
};

export function AgreementDialog({
  children,
  open,
  onOpenChange,
  onAgree,
  onOpenTerm,
}: AgreementDialogProps) {
  const [checkedTerms, setCheckedTerms] = useState<
    Record<AgreementTermId, boolean>
  >({
    service: false,
    privacy: false,
  });

  const isAllChecked = useMemo(
    () => REQUIRED_TERMS.every((term) => checkedTerms[term.id]),
    [checkedTerms],
  );

  const handleAllCheckedChange = (checked: boolean) => {
    setCheckedTerms({
      service: checked,
      privacy: checked,
    });
  };

  const handleTermCheckedChange = (id: AgreementTermId, checked: boolean) => {
    setCheckedTerms((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const resetCheckedTerms = () => {
    setCheckedTerms({
      service: false,
      privacy: false,
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetCheckedTerms();
    }
  };

  return (
    <AppDialog
      type="bottom"
      engine="drawer"
      open={open}
      onOpenChange={(isOpen) => {
        handleOpenChange(isOpen);
        onOpenChange?.(isOpen);
      }}
      title={"모임을 시작하기 위해\n약관에 동의해주세요"}
      content={
        <AgreementContent
          checkedTerms={checkedTerms}
          isAllChecked={isAllChecked}
          onAllCheckedChange={handleAllCheckedChange}
          onTermCheckedChange={handleTermCheckedChange}
          onOpenTerm={onOpenTerm}
        />
      }
      actions={[
        {
          label: "동의하고 계속하기",
          disabled: !isAllChecked,
          onClick: onAgree,
        },
        { label: "닫기", variant: "ghost" },
      ]}
    >
      {children}
    </AppDialog>
  );
}

function AgreementContent({
  checkedTerms,
  isAllChecked,
  onAllCheckedChange,
  onTermCheckedChange,
  onOpenTerm,
}: {
  checkedTerms: Record<AgreementTermId, boolean>;
  isAllChecked: boolean;
  onAllCheckedChange: (checked: boolean) => void;
  onTermCheckedChange: (id: AgreementTermId, checked: boolean) => void;
  onOpenTerm?: (termId: AgreementTermId) => void;
}) {
  return (
    <>
      <label className="flex h-12 cursor-pointer items-center justify-between rounded-xl bg-bg-muted px-4">
        <span className="text-base font-medium leading-5 text-text-primary">
          필수 항목 모두 체크하기
        </span>
        <Checkbox
          checked={isAllChecked}
          onCheckedChange={(checked) => onAllCheckedChange(checked === true)}
          aria-label="필수 항목 모두 체크하기"
          className="size-6 border-2"
        />
      </label>

      <div className="mt-2 flex flex-col gap-2">
        {REQUIRED_TERMS.map((term) => (
          <div
            key={term.id}
            className="flex h-10 items-center justify-between px-4"
          >
            <button
              type="button"
              className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
              onClick={() => onOpenTerm?.(term.id)}
            >
              <span className="text-sm font-normal leading-[18px] text-text-primary">
                필수
              </span>
              <span className="truncate text-sm font-normal leading-[18px] text-text-tertiary">
                {term.label}
              </span>
              <span
                className="icon icon-arrow-right size-3 text-gray-300"
                aria-hidden="true"
              />
            </button>
            <Checkbox
              checked={checkedTerms[term.id]}
              onCheckedChange={(checked) =>
                onTermCheckedChange(term.id, checked === true)
              }
              aria-label={`${term.label} 동의`}
              className="size-6 border-2"
            />
          </div>
        ))}
      </div>
    </>
  );
}
