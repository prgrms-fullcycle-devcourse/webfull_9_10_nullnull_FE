"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { searchByKakaoPlaces } from "@/shared/utils/kakaoSearch";
import type { RoomLocation } from "@/features/room/types/room";

type Props = {
  onClose: () => void;
  onSelect: (location: RoomLocation) => void;
};

export function LocationSearchSheet({ onClose, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RoomLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const delay = query.trim() ? 300 : 0;

    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const found = await searchByKakaoPlaces(query);
      setResults(found);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      {/* 검색 헤더 */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <button
          onClick={onClose}
          className="icon icon-back text-gray-700 shrink-0"
          aria-label="뒤로가기"
        />
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3 h-10">
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="장소 또는 주소 검색"
            className="h-full flex-1 border-0 bg-transparent px-0 py-0 text-sm text-gray-800 shadow-none placeholder:text-gray-400 focus-visible:ring-0"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="icon icon-close text-gray-400 shrink-0"
              style={{ width: "1rem", height: "1rem" }}
              aria-label="지우기"
            />
          )}
        </div>
      </div>

      {/* 결과 목록 */}
      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">
            검색 중...
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <p className="text-sm text-gray-400">검색 결과가 없어요</p>
            <p className="text-xs text-gray-300">다른 키워드로 검색해 보세요</p>
          </div>
        )}

        {!loading && !query && (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-gray-400">
              장소명 또는 도로명 주소를 입력하세요
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <ul>
            {results.map((loc, i) => (
              <li key={i}>
                <button
                  className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => onSelect(loc)}
                >
                  <span
                    className="icon icon-deadline text-primary shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {loc.name}
                    </span>
                    <span className="text-xs text-gray-400 leading-relaxed">
                      {loc.address}
                    </span>
                  </div>
                </button>
                {i < results.length - 1 && (
                  <div className="h-px bg-gray-50 mx-5" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
