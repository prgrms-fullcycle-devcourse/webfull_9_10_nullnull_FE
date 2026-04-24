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
      <div className="wrap-container">
        <AppHeader title={title} leftSlot={leftSlot} rightSlot={rightSlot} />

        <main className="">{children}</main>

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
