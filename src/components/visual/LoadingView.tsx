import { cn } from "@/lib/utils";

import styles from "./LoadingView.module.css";

type LoadingViewProps = {
  className?: string;
};

export function LoadingView({ className }: LoadingViewProps) {
  return (
    <div
      className={cn(
        "flex min-h-dvh flex-col items-center justify-center",
        className,
      )}
    >
      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g transform="translate(0, -10)">
          <path
            d="M65 75V115L100 75V115 M120 75V115L155 75V115"
            className={styles.drawPath}
            stroke="#C8CCD8"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M65 135H100L65 175H100 M120 135H155L120 175H155"
            className={`${styles.drawPath} ${styles.delay}`}
            stroke="#C8CCD8"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      <p className="mt-3 pl-5 text-base font-medium text-[#C8CCD8]">
        널널한 시간을 찾는 중
        <span className={styles.dots} aria-hidden="true" />
      </p>
    </div>
  );
}
