import { type RoomData } from "../types/room";

const convertTo24Hour = (timeStr: string): string => {
  const [ampm, time] = timeStr.split(" ");
  const [hour, minute] = time.split(":").map(Number);

  let convertedHour = hour;
  if (ampm === "오후" && hour < 12) convertedHour += 12;
  if (ampm === "오전" && hour === 12) convertedHour = 0;

  return `${convertedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
};

const getAvailableDaysArray = (data: RoomData): number[] => {
  if (data.preferredDayType === "weekday") return [1, 2, 3, 4, 5];
  if (data.preferredDayType === "weekend") return [0, 6];

  const dayMap: Record<string, number> = {
    일: 0,
    월: 1,
    화: 2,
    수: 3,
    목: 4,
    금: 5,
    토: 6,
  };
  return data.customDays.map((day) => dayMap[day]).sort();
};

export const transformToCreateRoomDto = (data: RoomData) => {
  const timeStart = convertTo24Hour(data.startTime);
  const timeEnd = convertTo24Hour(data.endTime);
  const deadlineTime = convertTo24Hour(data.deadlineTime);

  const deadlineAt = new Date(
    `${data.deadlineDate}T${deadlineTime}:00`,
  ).toISOString();

  return {
    name: data.title,
    description: data.description || "",
    category: data.category.toUpperCase(),
    dateStart: data.startDate,
    dateEnd: data.endDate,
    timeStart,
    timeEnd,
    availableDays: getAvailableDaysArray(data),
    deadlineAt,
    collectOrigin: data.collectOrigin ?? false,
  };
};
