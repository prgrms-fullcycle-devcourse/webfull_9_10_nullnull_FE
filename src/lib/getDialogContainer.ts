export function getDialogContainer() {
  if (typeof document === "undefined") {
    return undefined;
  }

  return document.querySelector<HTMLElement>(".wrap-container") ?? undefined;
}
