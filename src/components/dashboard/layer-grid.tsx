import { FC } from "react";
import { useDashboardStore } from "./store";
import { INITIAL_VIEW_STATE } from "./constant";
import { SplittedMaps, DeckGLOverlay } from "@/components/ui/maps";
import {
  useGridLayer,
  GridFillType,
  GridElevation,
} from "@/components/analysis/use-grid-layer";

interface GridLayerProps {
  fill: GridFillType;
  elevation?: GridElevation;
}

export const GridLayer: FC<GridLayerProps> = ({ fill, elevation }) => {
  const gridLayer = useGridLayer({
    fill,
    elevation,
    onHover: (tooltip) => useDashboardStore.setState({ tooltip }),
  });

  return <DeckGLOverlay controller layers={[gridLayer]} />;
};

export const CompareGridLayer: FC<Pick<GridLayerProps, "elevation">> = ({
  elevation,
}) => (
  <SplittedMaps
    viewState={INITIAL_VIEW_STATE}
    left={<GridLayer fill="FoodExpend" elevation={elevation} />}
    right={<GridLayer fill="NonFoodExpend" elevation={elevation} />}
  />
);
