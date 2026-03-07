import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
}

export default function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  showLabel = false,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      <div className="h-1.5 bg-surface2 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", barClassName || "bg-gold")}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[10px] text-muted mt-0.5">{pct}%</span>
      )}
    </div>
  );
}
