import { RoomDetail } from "@/features/room/RoomDetail";

export default function RoomDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <RoomDetail slug={params.slug} />;
}
