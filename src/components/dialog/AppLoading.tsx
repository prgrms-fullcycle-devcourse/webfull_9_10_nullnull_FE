"use client";

import { LoadingView } from "@/components/visual/LoadingView";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type AppLoadingProps = {
  open?: boolean;
  title?: string;
  className?: string;
};

export function AppLoading({
  open = false,
  title = "로딩 중",
  className,
}: AppLoadingProps) {
  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        className={cn(
          "border-0 bg-transparent p-0 shadow-none ring-0",
          className,
        )}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <LoadingView className="min-h-0 bg-transparent" />
      </DialogContent>
    </Dialog>
  );
}
