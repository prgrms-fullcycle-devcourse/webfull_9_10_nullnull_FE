import Link from "next/link";

type Props =
  | { href: string; onClick?: never }
  | { onClick: () => void; href?: never };

export function AppBackButton({ href, onClick }: Props) {
  if (href) {
    return (
      <Link
        href={href}
        className="icon [--icon-mask:var(--ico-arrow)]"
        aria-label="뒤로가기"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="icon [--icon-mask:var(--ico-arrow)]"
      aria-label="뒤로가기"
    />
  );
}
