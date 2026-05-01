import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function AppContent({ children, className }: Props) {
  return (
    <div
      className={`min-h-[inherit] px-4 py-5${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
