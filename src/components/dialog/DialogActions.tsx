"use client";

import { Button } from "@/components/ui/button";

import type { DialogAction, DialogSize } from "./types";

type DialogActionsProps = {
  actions: DialogAction[];
  size?: DialogSize;
  onClose?: () => void;
};

export function DialogActions({
  actions,
  size: _size = "default",
  onClose,
}: DialogActionsProps) {
  return (
    <>
      {actions.map((action, index) => (
        <Button
          key={`${action.label}-${index}`}
          type="button"
          variant={action.variant ?? "default"}
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
