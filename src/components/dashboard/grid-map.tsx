import { FC } from "react";
import { useDashboardStore } from "./store";
import {
  GridElevation,
  GridFillType,
  useGridMaps,
} from "@/components/maps/use-grid-maps";
import {
  SingleMaps,
  SplittedMaps,
  DeckGLOverlay,
} from "@/components/maps/maps";
import { Label } from "@radix-ui/react-label";

const GridTooltip = () => {
  const tooltip = useDashboardStore((state) => state.tooltip);

  if (!tooltip) return null;

  return (
    <div
      style={{ left: tooltip.x, top: tooltip.y }}
      className="-translate-x-[50%] -translate-y-full pointer-events-none absolute z-[100] w-64 cursor-pointer rounded-sm border bg-background p-4 shadow-sm"
    >
      {Object.keys(tooltip.data)
        .filter((key) => key !== "geometry")
        .map((key) => (
          <div key={key} className="flex flex-row items-center justify-between">
            <Label className="font-bold">{key}</Label>
            <Label>{tooltip.data[key]}</Label>
          </div>
        ))}
    </div>
  );
};

interface GridMapsProps {
  fill: GridFillType;
  elevation?: GridElevation;
}

const GridLayer: FC<GridMapsProps> = ({ fill, elevation }) => {
  const gridLayer = useGridMaps(fill, elevation);

  return <DeckGLOverlay controller layers={[gridLayer]} />;
};

const CompareGridMaps: FC<{ elevation?: GridElevation }> = ({ elevation }) => (
  <SplittedMaps
    left={<GridLayer fill="FoodExpend" elevation={elevation} />}
    right={<GridLayer fill="NonFoodExpend" elevation={elevation} />}
  />
);

export const GridMaps = () => {
  const active = useDashboardStore((state) => state.active);

  if (active.type !== "grid") return;

  if (active.fill === "Compare")
    return <CompareGridMaps elevation={active.elevation} />;

  return (
    <SingleMaps>
      <GridTooltip />
      <GridLayer fill={active.fill} elevation={active.elevation} />
    </SingleMaps>
  );
};
