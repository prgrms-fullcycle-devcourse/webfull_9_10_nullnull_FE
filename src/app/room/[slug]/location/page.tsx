import { LocationPage } from "@/features/room/components/location/LocationPage";

export default function LocationRoute({
  params,
}: {
  params: { slug: string };
}) {
  return <LocationPage slug={params.slug} />;
}
