import { useDashboardStore } from "./store";
import { Label } from "@/components/ui/label";

export const Tooltip = () => {
  const tooltip = useDashboardStore((state) => state.tooltip);

  if (!tooltip) return null;

  return (
    <div
      style={{ left: tooltip.position.x, top: tooltip.position.y }}
      className="-translate-x-[50%] -translate-y-full pointer-events-none absolute z-[100] w-64 cursor-pointer rounded-sm border bg-background p-4 shadow-sm"
    >
      {Object.keys(tooltip.data)
        .filter((key) => key !== "geometry")
        .map((key) => (
          <div
            key={key}
            className="flex flex-row items-center justify-between gap-0.5"
          >
            <Label className="font-bold text-xs">{key}</Label>
            <Label className="font-mono text-xs">
              {Number.isNaN(Number(tooltip.data[key]))
                ? tooltip.data[key]
                : Number(tooltip.data[key]).toFixed(4)}
            </Label>
          </div>
        ))}
    </div>
  );
};
