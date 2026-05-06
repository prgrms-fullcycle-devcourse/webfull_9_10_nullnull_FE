import { Progress } from "@/components/ui/progress";

type Props = {
  current: number;
  max: number;
};

export function ParticipationStatus({ current, max }: Props) {
  const ratio = Math.round((current / max) * 100);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 font-medium text-gray-700">
          <span className="icon icon-person text-gray-400" aria-hidden="true" />
          참여 현황
        </span>
        <span className="flex items-baseline gap-0.5">
          <span className="text-2xl font-bold text-gray-900">{current}</span>
          <span className="text-sm text-gray-400"> / {max}명</span>
        </span>
      </div>
      <Progress value={ratio} className="h-2" />
      <p className="text-xs text-gray-400 text-right">{ratio}% 제출 완료</p>
    </div>
  );
}
