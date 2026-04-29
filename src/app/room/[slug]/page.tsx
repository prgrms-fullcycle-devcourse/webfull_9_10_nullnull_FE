export default function RoomDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-dvh bg-gray-50 p-5 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        모임 상세 페이지
      </h1>
      <p className="text-gray-500 mb-6">
        현재 접속하신 방의 고유 주소는 <br />
        <span className="font-bold text-[#6B4EFF]">{params.slug}</span> 입니다.
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-sm max-w-sm w-full">
        <p className="text-sm text-gray-700">
          이곳에서 안되는 시간 선택 및 모임 상세 정보(참여자 현황 등)를 확인할
          수 있도록 개발을 이어가면 됩니다!
        </p>
      </div>
    </div>
  );
}
