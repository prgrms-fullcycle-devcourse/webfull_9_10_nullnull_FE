"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onClose: () => void;
  children: React.ReactNode;
  dragToDismiss?: boolean;
  "aria-label"?: string;
};

const DISMISS_THRESHOLD = 120;

export function BottomSheet({
  onClose,
  children,
  dragToDismiss = true,
  "aria-label": ariaLabel,
}: Props) {
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef<number | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handlePointerDown = (e: React.PointerEvent) => {
    startYRef.current = e.clientY;
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startYRef.current === null) return;
    setTranslateY(Math.max(0, e.clientY - startYRef.current));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    startYRef.current = null;
    if (translateY >= DISMISS_THRESHOLD) {
      onClose();
    } else {
      setTranslateY(0);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-full max-w-[750px] mx-auto">
        <div
          className="w-full max-w-[var(--layout-mobile)] mx-auto lg:ml-auto lg:mr-0"
          style={{
            transform: `translateY(${translateY}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        >
          <div className="bg-white rounded-t-2xl">
            {dragToDismiss && (
              <div
                className="w-full pt-3 pb-4 flex justify-center cursor-grab active:cursor-grabbing touch-none select-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
