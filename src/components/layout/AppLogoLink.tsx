import Link from "next/link";

export function AppLogoLink() {
  return (
    <Link
      href="/"
      className="icon size-10 [--icon-mask:var(--ico-logo)]"
      aria-label="NULLNULL 홈"
    />
  );
}
