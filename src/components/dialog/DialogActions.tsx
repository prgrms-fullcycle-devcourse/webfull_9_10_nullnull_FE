"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { DialogAction, DialogSize } from "./types";

type DialogActionsProps = {
  actions: DialogAction[];
  size?: DialogSize;
  onClose?: () => void;
};

const actionVariantClassName: Record<
  NonNullable<DialogAction["variant"]>,
  string
> = {
  primary: "",
  secondary: "border-0 bg-gray-50 text-text-primary hover:bg-gray-100",
  danger: "bg-red-500 text-white hover:bg-red-500/90",
  ghost: "bg-transparent text-text-primary hover:bg-gray-50",
};

const actionSizeClassName: Record<DialogSize, string> = {
  default: "!h-14 rounded-xl text-sm",
  compact: "!h-14 rounded-xl text-base",
};

export function DialogActions({
  actions,
  size = "default",
  onClose,
}: DialogActionsProps) {
  return (
    <>
      {actions.map((action, index) => (
        <Button
          key={`${action.label}-${index}`}
          type="button"
          className={cn(
            "w-full font-semibold",
            actionSizeClassName[size],
            actionVariantClassName[action.variant ?? "primary"],
            action.className,
          )}
          disabled={action.disabled}
          onClick={async () => {
            await action.onClick?.();

            if (action.closeOnClick !== false) {
              onClose?.();
            }
          }}
        >
          {action.label}
        </Button>
      ))}
    </>
  );
}
