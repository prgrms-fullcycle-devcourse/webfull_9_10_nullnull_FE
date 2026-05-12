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

const bottomTitleClassName =
  "whitespace-pre-line text-left text-2xl font-bold leading-8 text-bg-import";

const bottomHeaderClassName = "px-4 pb-3.5 pt-7 text-left";

const bottomDescriptionClassName = "pb-3.5 pt-3.5";

const bottomFooterClassName = "gap-3 px-4 pb-4 pt-7";

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

  if (type === "full") {
    return (
      <FullDialogContent
        title={title}
        content={content}
        className={className}
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
        <DrawerContent className={cn("rounded-t-2xl p-0", className)}>
          <DrawerHeader className={bottomHeaderClassName}>
            {title && (
              <DrawerTitle className={bottomTitleClassName}>
                {title}
              </DrawerTitle>
            )}
            {description && (
              <DrawerDescription className={bottomDescriptionClassName}>
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <div className="mt-3.5 px-4">{content}</div>
          {actions.length > 0 && (
            <DrawerFooter className={bottomFooterClassName}>
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
        <SheetHeader className={bottomHeaderClassName}>
          {title && (
            <SheetTitle className={bottomTitleClassName}>{title}</SheetTitle>
          )}
          {description && (
            <SheetDescription className={bottomDescriptionClassName}>
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        <div className="mt-3.5 px-4">{content}</div>
        {actions.length > 0 && (
          <SheetFooter className={bottomFooterClassName}>
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

function FullDialogContent({
  title,
  content,
  className,
  trigger,
  open,
  onOpenChange,
}: {
  title?: string;
  content?: ReactNode;
  className?: string;
  trigger?: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className={cn(
          "flex h-full w-full flex-col border-none rounded-none p-0 top-0",
          className,
        )}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{title} 상세 내용입니다.</SheetDescription>
        </SheetHeader>
        <header className="relative flex h-14 shrink-0 items-center justify-center border-b bg-white px-4">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 rounded-lg p-1 transition-colors hover:bg-gray-100"
            aria-label="닫기"
          >
            <i className="icon icon-close size-6" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto bg-white p-5">{content}</div>
      </SheetContent>
    </Sheet>
  );
}
