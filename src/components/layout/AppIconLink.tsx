import Link from "next/link";
import type { ComponentProps } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BaseProps = {
  icon: "alarm" | "back" | "setting" | "share";
  label: string;
  className?: string;
};

type LinkProps = BaseProps &
  Omit<ComponentProps<typeof Link>, "aria-label" | "className" | "children"> & {
    href: ComponentProps<typeof Link>["href"];
    onClick?: never;
  };

type ButtonProps = BaseProps &
  Omit<
    ComponentProps<"button">,
    "type" | "aria-label" | "className" | "children"
  > & {
    href?: never;
    onClick?: ComponentProps<"button">["onClick"];
  };

type Props = LinkProps | ButtonProps;

export function AppIconLink({ icon, label, className, ...props }: Props) {
  const iconSizeClassName =
    icon === "alarm" || icon === "setting" ? "!size-6" : "";

  const iconElement = (
    <span
      className={cn(`icon icon-${icon}`, iconSizeClassName)}
      aria-hidden="true"
    />
  );
  const iconClassName = cn(
    buttonVariants({ variant: "ghost", size: "icon" }),
    "size-10",
    "text-text-primary hover:text-gray-700",
    className,
  );

  if ("href" in props && props.href) {
    const linkProps = props as Omit<LinkProps, keyof BaseProps>;

    return (
      <Link aria-label={label} className={iconClassName} {...linkProps}>
        {iconElement}
      </Link>
    );
  }

  const buttonProps = props as Omit<ButtonProps, keyof BaseProps>;

  return (
    <button
      {...buttonProps}
      type="button"
      aria-label={label}
      className={iconClassName}
    >
      {iconElement}
    </button>
  );
}
