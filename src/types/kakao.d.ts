type KakaoLatLng = object;
type KakaoLatLngBounds = { extend: (latlng: KakaoLatLng) => void };
type KakaoMap = { setBounds: (bounds: KakaoLatLngBounds) => void };
type KakaoMarker = object;
type KakaoInfoWindow = { open: (map: KakaoMap, marker: KakaoMarker) => void };

interface Window {
  kakao: {
    maps: {
      load: (callback: () => void) => void;
      Map: new (
        container: HTMLElement,
        options: { center: KakaoLatLng; level: number },
      ) => KakaoMap;
      LatLng: new (lat: number, lng: number) => KakaoLatLng;
      LatLngBounds: new () => KakaoLatLngBounds;
      Marker: new (options: {
        position: KakaoLatLng;
        map: KakaoMap;
      }) => KakaoMarker;
      InfoWindow: new (options: {
        content: string;
        removable?: boolean;
      }) => KakaoInfoWindow;
      services: {
        Places: new () => {
          keywordSearch: (
            query: string,
            callback: (result: unknown[], status: string) => void,
          ) => void;
        };
        Geocoder: new () => {
          addressSearch: (
            address: string,
            callback: (result: unknown[], status: string) => void,
          ) => void;
        };
        Status: { OK: string };
      };
    };
  };
}
