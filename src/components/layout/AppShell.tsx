import type { ReactNode } from "react";
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
  return (
    <div className="Wrap min-h-dvh bg-background">
      <div className="relative wrap-container bg-gray-50">
        <AppHeader title={title} leftSlot={leftSlot} rightSlot={rightSlot} />

        <main className="flex flex-1 flex-col">
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
      </div>
    </div>
  );
}
