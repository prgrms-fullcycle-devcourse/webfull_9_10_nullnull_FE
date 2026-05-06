import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type Props = Omit<ComponentProps<"button">, "type" | "children">;

export function AppShareButton({ onClick, ...props }: Props) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="공유하기"
      onClick={onClick}
      {...props}
    >
      <span className="icon icon-share !size-4 text-text-primary" />
    </Button>
  );
}
