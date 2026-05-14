const DAY = ["일", "월", "화", "수", "목", "금", "토"] as const;

/** "2024-05-24" → "2024.05.24 (금)" */
export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${y}.${m}.${d} (${DAY[new Date(dateStr).getDay()]})`;
}

/** "18:00" → "18:00" */
export function formatTime(timeStr: string): string {
  return timeStr;
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

/** 요일 숫자 배열 [0, 1, 6] → ["일", "월", "토"] (0=일 ~ 6=토) */
export function formatDays(days: number[]): string[] {
  const DAY_LABEL: Record<number, string> = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
  };
  return days.map((d) => DAY_LABEL[d] ?? String(d));
}
