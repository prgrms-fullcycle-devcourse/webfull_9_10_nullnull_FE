const DAY = ["일", "월", "화", "수", "목", "금", "토"] as const;

/** "2024-05-24" → "2024.05.24 (금)" */
export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${y}.${m}.${d} (${DAY[new Date(dateStr).getDay()]})`;
}

/** "09:00" → "오전 09:00" / "22:00" → "오후 10:00" */
export function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(":").map(Number);
  const period = h < 12 ? "오전" : "오후";
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${period} ${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** "2026-10-25T23:59:00+09:00" → "10.25(토) 23:59" */
export function formatDeadline(isoStr: string): string {
  const date = new Date(isoStr);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${m}.${d}(${DAY[date.getDay()]}) ${h}:${min}`;
}

/** ISO 요일 숫자 배열 [6, 7, 1] → ["토", "일", "월"] (1=월 ~ 7=일) */
export function formatDays(days: number[]): string[] {
  const DAY_LABEL: Record<number, string> = {
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
    7: "일",
  };
  return days.map((d) => DAY_LABEL[d] ?? String(d));
}
