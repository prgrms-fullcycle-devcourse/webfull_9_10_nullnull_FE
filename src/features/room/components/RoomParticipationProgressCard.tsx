import { Progress } from "@/components/ui/progress";

type Props = {
  current: number;
  max: number;
};

export function RoomParticipationProgressCard({ current, max }: Props) {
  const ratio = max > 0 ? Math.round((current / max) * 100) : 0;

  return (
    <section className="rounded-3xl border border-border-subtle bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold leading-[18px] text-text-primary">
          참여 현황
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold leading-8 text-text-primary">
            {current}
          </span>
          <span className="text-sm font-medium leading-[18px] text-text-disabled">
            / {max}명
          </span>
        </div>
      </div>

      <Progress
        value={ratio}
        className="mt-2 h-2.5 bg-bg-muted [&_[data-slot=progress-indicator]]:bg-info"
      />
      <p className="mt-2 text-right text-xs leading-4 text-text-tertiary">
        {ratio}% 제출 완료
      </p>
    </section>
  );
}
