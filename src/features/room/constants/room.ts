export const ROOM_CATEGORIES = [
  { value: "MEAL", label: "식사" },
  { value: "CAFE", label: "카페" },
  { value: "DRINK", label: "술자리" },
  { value: "STUDY", label: "스터디" },
  { value: "MEETING", label: "회의/미팅" },
  { value: "EXERCISE", label: "운동" },
  { value: "GAME", label: "게임/오락" },
  { value: "PARTY", label: "파티" },
  { value: "ETC", label: "기타" },
] as const;

export const TIME_OPTIONS = Array.from({ length: 48 }).map((_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const ampm = hour < 12 ? "오전" : "오후";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${ampm} ${displayHour}:${minute}`;
});
