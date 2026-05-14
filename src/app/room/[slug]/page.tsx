import { use } from "react";
import { RoomDetail } from "@/features/room/RoomDetail";

export default function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <RoomDetail slug={slug} />;
}
