import { KakaoScript } from "@/components/KakaoScript";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <KakaoScript />
      {children}
    </>
  );
}
