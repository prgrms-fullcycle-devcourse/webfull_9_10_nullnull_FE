import type { ReactNode } from "react";

export type DialogType = "alert" | "confirm" | "bottom" /*| "dialog" | "full"*/;

export type BottomDialogEngine = "drawer" | "sheet";

export type DialogSize = "default" | "compact";

export type DialogActionVariant = "default" | "secondary" | "danger" | "ghost";

export type DialogAction = {
  label: string;
  variant?: DialogActionVariant;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  closeOnClick?: boolean;
};

export type DialogBase = {
  type: DialogType;
  title?: string;
  description?: string;
  content?: ReactNode;
  actions?: DialogAction[];
};

export type AppDialogProps = DialogBase & {
  engine?: BottomDialogEngine;
  dialogSize?: DialogSize;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children?: ReactNode;
};
