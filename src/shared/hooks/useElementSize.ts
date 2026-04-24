"use client";

import { useEffect, useState } from "react";

type Size = {
  width: number;
  height: number;
};

export function useElementSize<T extends HTMLElement>(
  element: T | null,
): Size {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (!element) {
      return;
    }

    const updateSize = () => {
      // getBoundingClientRect는 safe-area를 포함한 padding까지 반영합니다.
      const rect = element.getBoundingClientRect();

      setSize({
        width: rect.width,
        height: rect.height,
      });
    };

    updateSize();

    // 버튼 줄바꿈, 액션 추가, 뷰포트 변화로 높이가 바뀔 수 있어 관찰합니다.
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(element);

    window.addEventListener("resize", updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [element]);

  return size;
}
