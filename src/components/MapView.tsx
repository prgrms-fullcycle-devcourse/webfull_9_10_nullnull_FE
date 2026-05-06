"use client";

import { useEffect, useRef } from "react";

export type MapMarker = {
  lat: number;
  lng: number;
  label?: string;
  color?: string;
};

type Props = {
  markers: MapMarker[];
  className?: string;
};

export function MapView({ markers, className = "h-44" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || markers.length === 0) return;

    const initMap = () => {
      if (!containerRef.current) return;

      const { Map, LatLng, LatLngBounds, Marker, InfoWindow } =
        window.kakao.maps;

      const center = new LatLng(markers[0].lat, markers[0].lng);
      const map = new Map(containerRef.current, { center, level: 4 });

      const bounds = new LatLngBounds();

      markers.forEach((m) => {
        const position = new LatLng(m.lat, m.lng);
        new Marker({ position, map });
        bounds.extend(position);

        if (m.label) {
          const infoWindow = new InfoWindow({
            content: `<div style="padding:5px 8px;font-size:12px;white-space:nowrap;">${m.label}</div>`,
          });
          infoWindow.open(map, new Marker({ position, map }));
        }
      });

      // 마커가 2개 이상이면 모두 보이도록 지도 범위 자동 조정
      if (markers.length > 1) {
        map.setBounds(bounds);
      }
    };

    if (window.kakao?.maps?.Map) {
      initMap();
    } else if (window.kakao?.maps?.load) {
      window.kakao.maps.load(initMap);
    } else {
      const timer = setInterval(() => {
        if (window.kakao?.maps) {
          clearInterval(timer);
          window.kakao.maps.load(initMap);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [markers]);

  return <div ref={containerRef} className={`w-full ${className}`} />;
}
