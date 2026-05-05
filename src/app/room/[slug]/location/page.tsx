import { use } from "react";
import { LocationPage } from "@/features/room/components/location/LocationPage";

export default function LocationRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <LocationPage slug={slug} />;
}
