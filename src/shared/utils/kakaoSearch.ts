import type { RoomLocation } from "@/features/room/types/room";

type KakaoPlaceResult = {
  place_name: string;
  road_address_name: string;
  address_name: string;
  x: string; // lng
  y: string; // lat
};

type KakaoAddressResult = {
  address_name: string;
  address: { address_name: string } | null; // 지번주소
  road_address: { address_name: string } | null; // 도로명주소
  x: string; // lng
  y: string; // lat
};

async function waitForKakaoSDK(maxWaitMs = 5000): Promise<boolean> {
  const interval = 100;
  const maxAttempts = maxWaitMs / interval;

  for (let i = 0; i < maxAttempts; i++) {
    if (window?.kakao?.maps) break;
    await new Promise((r) => setTimeout(r, interval));
  }

  if (!window?.kakao?.maps) return false;

  if (!window.kakao.maps.services) {
    await new Promise<void>((resolve) => {
      window.kakao.maps.load(resolve);
    });
  }

  return !!window.kakao?.maps?.services;
}

function searchByPlaces(query: string): Promise<RoomLocation[]> {
  return new Promise((resolve) => {
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(query, (data, status) => {
      if (status !== window.kakao.maps.services.Status.OK) {
        resolve([]);
        return;
      }
      resolve(
        (data as KakaoPlaceResult[]).map((item) => ({
          name: item.place_name,
          address: item.road_address_name || item.address_name,
          lat: parseFloat(item.y),
          lng: parseFloat(item.x),
        })),
      );
    });
  });
}

function searchByAddress(query: string): Promise<RoomLocation[]> {
  return new Promise((resolve) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(query, (data: unknown[], status: string) => {
      if (status !== window.kakao.maps.services.Status.OK) {
        resolve([]);
        return;
      }
      resolve(
        (data as KakaoAddressResult[]).map((item) => ({
          name: item.road_address?.address_name || item.address_name,
          address: item.address?.address_name || item.address_name,
          lat: parseFloat(item.y),
          lng: parseFloat(item.x),
        })),
      );
    });
  });
}

export async function searchByKakaoPlaces(
  query: string,
): Promise<RoomLocation[]> {
  if (typeof window === "undefined" || !query.trim()) return [];

  const ready = await waitForKakaoSDK();
  if (!ready) {
    const scriptTag = document.querySelector('script[src*="dapi.kakao.com"]');
    if (!scriptTag) {
      console.error(
        "[Kakao] 스크립트 태그 없음 → NEXT_PUBLIC_KAKAO_MAP_KEY 미설정 또는 dev 서버 재시작 필요",
      );
    } else if (!window.kakao) {
      console.error(
        "[Kakao] window.kakao 없음 → 도메인 미등록 또는 키 오류 (카카오 개발자 콘솔 확인)",
      );
    } else {
      console.error("[Kakao] kakao.maps.load() 후에도 services 없음");
    }
    return [];
  }

  const [placeResults, addressResults] = await Promise.all([
    searchByPlaces(query),
    searchByAddress(query),
  ]);

  // 장소 결과 우선, 좌표가 겹치지 않는 주소 결과만 추가
  const seen = new Set(placeResults.map((r) => `${r.lat},${r.lng}`));
  const uniqueAddressResults = addressResults.filter(
    (r) => !seen.has(`${r.lat},${r.lng}`),
  );

  return [...placeResults, ...uniqueAddressResults];
}
