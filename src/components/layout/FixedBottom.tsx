"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useElementSize } from "@/shared/hooks/useElementSize";

type FixedBottomProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

type FixedBottomActionsProps = {
  children: ReactNode;
  direction?: "vertical" | "horizontal";
  className?: string;
};

export function FixedBottom({
  children,
  className,
  contentClassName,
}: FixedBottomProps) {
  const [fixedElement, setFixedElement] = useState<HTMLDivElement | null>(null);
  const { height } = useElementSize(fixedElement);

  return (
    <div
      className={cn(
        // 클라이언트에서 fixed 영역 높이를 측정하기 전까지 사용할 기본 여백입니다.
        "min-h-[calc(var(--layout-bottom-fallback-height)+env(safe-area-inset-bottom))]",
        className,
      )}
      // fixed 하단 영역 뒤로 페이지 콘텐츠가 가려지지 않도록 실제 높이를 반영합니다.
      style={height > 0 ? { height } : undefined}
    >
      <div
        ref={setFixedElement}
        className="fixed bottom-0 left-1/2 z-50 w-full max-w-[var(--layout-content)] -translate-x-1/2 bg-background lg:left-[calc(50%+125px)]"
      >
        <div
          className={cn(
            // iOS 홈 인디케이터 영역을 피하고, 여러 하단 액션을 세로로 쌓을 수 있게 합니다.
            "flex flex-col gap-1 bg-gray-50 px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]",
            contentClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function FixedBottomActions({
  children,
  direction = "vertical",
  className,
}: FixedBottomActionsProps) {
  return (
    <div
      className={cn(
        // 하단 액션을 세로 또는 가로 배치로 재사용하기 위한 공통 레이아웃입니다.
        "flex w-full gap-3",
        direction === "vertical" ? "flex-col" : "flex-row",
        className,
      )}
    >
      {children}
    </div>
  );
}
