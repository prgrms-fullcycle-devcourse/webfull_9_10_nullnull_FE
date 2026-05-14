"use client";

import { useState, useSyncExternalStore } from "react";

type UseDialogOpenOptions = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useDialogOpen({
  open,
  defaultOpen = false,
  onOpenChange,
}: UseDialogOpenOptions) {
  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const currentOpen = isClient && (isControlled ? open : internalOpen);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  return {
    open: currentOpen,
    onOpenChange: handleOpenChange,
    isControlled,
  };
}
