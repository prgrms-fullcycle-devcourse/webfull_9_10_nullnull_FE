import { KakaoScript } from "@/components/kakao";

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
