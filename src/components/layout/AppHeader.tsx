import type { ReactNode } from "react";

type Props = {
  title?: ReactNode;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
};

export function AppHeader({ title, leftSlot, rightSlot }: Props) {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 border-b bg-background">
      <div className="Wrap flex h-full items-center justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {leftSlot && (
            <div className="flex shrink-0 items-center gap-2">{leftSlot}</div>
          )}
          {title && (
            <h1 className="min-w-0 flex-1 truncate text-xl font-bold text-foreground">
              {title}
            </h1>
          )}
        </div>

        {rightSlot && (
          <div className="ml-3 flex shrink-0 items-center justify-end gap-2">
            {rightSlot}
          </div>
        )}
      </div>
    </header>
  );
}
