import { FC } from "react";
import { useDashboardStore } from "./store";
import { GridElevation, useGridMaps } from "@/components/maps/use-grid-maps";
import {
  SingleMaps,
  SplittedMaps,
  DeckGLOverlay,
} from "@/components/maps/maps";

const FoodGridMaps: FC<{ elevation?: GridElevation }> = ({ elevation }) => {
  const gridLayer = useGridMaps("FoodExpend", elevation);

  return <DeckGLOverlay controller layers={[gridLayer]} />;
};

const NonFoodGridMaps: FC<{ elevation?: GridElevation }> = ({ elevation }) => {
  const gridLayer = useGridMaps("NonFoodExpend", elevation);

  return <DeckGLOverlay controller layers={[gridLayer]} />;
};

const CompareGridMaps: FC<{ elevation?: GridElevation }> = ({ elevation }) => (
  <SplittedMaps
    left={<FoodGridMaps elevation={elevation} />}
    right={<NonFoodGridMaps elevation={elevation} />}
  />
);

export const GridMaps = () => {
  const active = useDashboardStore((state) => state.active);

  if (active.type !== "grid") return;

  if (active.fill === "Compare")
    return <CompareGridMaps elevation={active.elevation} />;

  return (
    <SingleMaps>
      {active.fill === "FoodExpend" ? (
        <FoodGridMaps elevation={active.elevation} />
      ) : (
        <NonFoodGridMaps elevation={active.elevation} />
      )}
    </SingleMaps>
  );
};
