import { useDashboardStore } from "./store";
import { useGridZone } from "@/components/maps/use-grid-zone";
import {
  SingleMaps,
  SplittedMaps,
  DeckGLOverlay,
} from "@/components/maps/maps";

const NonFoodGridMaps = () => {
  const gridLayer = useGridZone("NonFoodExpend");

  return <DeckGLOverlay controller layers={[gridLayer]} />;
};

const FoodGridMaps = () => {
  const gridLayer = useGridZone("FoodExpend");

  return <DeckGLOverlay controller layers={[gridLayer]} />;
};

export const CompareGridMaps = () => (
  <SplittedMaps left={<FoodGridMaps />} right={<NonFoodGridMaps />} />
);

export const GridMaps = () => {
  const active = useDashboardStore((state) => state.active);

  if (active.type !== "grid") return;

  if (active.view === "Compare") return <CompareGridMaps />;

  return (
    <SingleMaps>
      {active.view === "FoodExpend" ? <FoodGridMaps /> : <NonFoodGridMaps />}
    </SingleMaps>
  );
};
