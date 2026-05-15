"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AppHeader } from "./AppHeader";
import { FixedBottom } from "./FixedBottom";

type Props = {
  title?: ReactNode;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  bottomSlot?: ReactNode;
  bottomReserveClassName?: string;
  bottomContentClassName?: string;
  children: ReactNode;
};

export function AppShell({
  title,
  leftSlot,
  rightSlot,
  bottomSlot,
  bottomReserveClassName,
  bottomContentClassName,
  children,
}: Props) {
  // AppShell은 이제 PCLayout 내부의 app-container 안에서 동작합니다.
  return (
    <>
      <AppHeader title={title} leftSlot={leftSlot} rightSlot={rightSlot} />

      <main className="flex flex-1 flex-col lg:overflow-y-auto lg:scrollbar-hide">
        <div className="main-container flex flex-1 flex-col">{children}</div>
      </main>

      {bottomSlot && (
        <FixedBottom
          className={cn(
            "min-h-[calc(var(--layout-bottom-stacked-fallback-height)+env(safe-area-inset-bottom))]",
            bottomReserveClassName,
          )}
          contentClassName={bottomContentClassName}
        >
          {bottomSlot}
        </FixedBottom>
      )}
    </>
  );
}
