import { use } from "react";
import { SchedulePage } from "@/features/room/SchedulePage";

export default function ScheduleRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <SchedulePage slug={slug} />;
}
