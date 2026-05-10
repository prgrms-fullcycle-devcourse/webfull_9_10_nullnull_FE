"use client";

import { useState, type ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { DialogActions } from "./DialogActions";
import type { AppDialogProps, DialogAction, DialogSize } from "./types";
import { useDialogOpen } from "./useDialogOpen";

const DEFAULT_ALERT_ACTIONS: DialogAction[] = [{ label: "확인" }];

const DEFAULT_CONFIRM_ACTIONS: DialogAction[] = [
  { label: "취소", variant: "secondary" },
  { label: "확인" },
];

const alertContentClassName: Record<DialogSize, string> = {
  default: "w-[calc(100%-40px)] max-w-[320px] rounded-2xl p-5",
  compact: "w-[calc(100%-40px)] max-w-[320px] rounded-3xl px-4 pb-4 pt-7",
};

const alertTitleClassName: Record<DialogSize, string> = {
  default: "text-base font-bold",
  compact: "text-xl font-semibold",
};

const alertDescriptionClassName: Record<DialogSize, string> = {
  default: "text-sm leading-[18px]",
  compact: "text-base font-medium leading-6",
};

const alertHeaderClassName: Record<DialogSize, string> = {
  default: "gap-1",
  compact: "gap-4",
};

const alertFooterClassName: Record<DialogSize, string> = {
  default: "gap-2 pt-3",
  compact: "gap-3 pt-4",
};

export function AppDialog({
  type,
  engine = "sheet",
  dialogSize = "default",
  title,
  description,
  content,
  actions,
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
}: AppDialogProps) {
  const dialog = useDialogOpen({ open, defaultOpen, onOpenChange });
  const resolvedActions =
    actions ??
    (type === "alert" ? DEFAULT_ALERT_ACTIONS : DEFAULT_CONFIRM_ACTIONS);

  if (type === "bottom") {
    return (
      <BottomDialogContent
        engine={engine}
        title={title}
        description={description}
        content={content}
        actions={resolvedActions}
        className={className}
        dialogSize={dialogSize}
        trigger={children}
        open={dialog.open}
        onOpenChange={dialog.onOpenChange}
      />
    );
  }

  return (
    <AlertDialogContentByType
      type={type}
      title={title}
      description={description}
      content={content}
      actions={resolvedActions}
      className={className}
      dialogSize={dialogSize}
      trigger={children}
      open={dialog.open}
      onOpenChange={dialog.onOpenChange}
    />
  );
}

function AlertDialogContentByType({
  type,
  title,
  description,
  content,
  actions,
  className,
  dialogSize,
  trigger,
  open,
  onOpenChange,
}: {
  type: AppDialogProps["type"];
  title?: string;
  description?: string;
  content?: ReactNode;
  actions: DialogAction[];
  className?: string;
  dialogSize: DialogSize;
  trigger?: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [lastDialogText, setLastDialogText] = useState({ title, description });
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setLastDialogText({ title, description });
    }

    onOpenChange(nextOpen);
  };

  const displayTitle = title ?? lastDialogText.title;
  const displayDescription =
    description || (!open ? lastDialogText.description : undefined);

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent
        className={cn(alertContentClassName[dialogSize], className)}
      >
        <AlertDialogHeader
          className={cn(
            "place-items-start text-left",
            alertHeaderClassName[dialogSize],
          )}
        >
          <AlertDialogTitle
            className={cn("text-text-primary", alertTitleClassName[dialogSize])}
          >
            {displayTitle ?? (type === "alert" ? "알림" : "확인")}
          </AlertDialogTitle>
          <AlertDialogDescription
            className={cn(
              "text-text-secondary",
              alertDescriptionClassName[dialogSize],
            )}
          >
            {displayDescription ?? "내용을 확인해주세요."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {content}

        <AlertDialogFooter
          className={cn(
            "!grid border-0 bg-transparent p-0",
            alertFooterClassName[dialogSize],
            actions.length === 1 && "!grid-cols-1",
            actions.length === 2 && "!grid-cols-2",
            actions.length === 3 && "!grid-cols-3",
          )}
        >
          <DialogActions
            actions={actions}
            size={dialogSize}
            onClose={() => onOpenChange(false)}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function BottomDialogContent({
  engine,
  title,
  description,
  content,
  actions,
  className,
  dialogSize,
  trigger,
  open,
  onOpenChange,
}: {
  engine: NonNullable<AppDialogProps["engine"]>;
  title?: string;
  description?: string;
  content?: ReactNode;
  actions: DialogAction[];
  className?: string;
  dialogSize: DialogSize;
  trigger?: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (engine === "drawer") {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerContent className={cn("rounded-t-2xl", className)}>
          <DrawerHeader className="p-5 text-left">
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          {content}
          {actions.length > 0 && (
            <DrawerFooter className="p-5 pt-0">
              <DialogActions
                actions={actions}
                size={dialogSize}
                onClose={() => onOpenChange(false)}
              />
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className={cn("rounded-t-2xl p-0", className)}
      >
        <SheetHeader className="p-5 text-left">
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {content}
        {actions.length > 0 && (
          <SheetFooter className="p-5 pt-0">
            <DialogActions
              actions={actions}
              size={dialogSize}
              onClose={() => onOpenChange(false)}
            />
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
