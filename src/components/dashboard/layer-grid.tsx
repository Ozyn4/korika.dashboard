import { FC } from "react";
import { useDashboardStore } from "./store";
import { SplittedMaps, DeckGLOverlay } from "@/components/maps/maps";
import {
  useGridLayer,
  GridFillType,
  GridElevation,
} from "@/components/maps/use-grid-layer";

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
    left={<GridLayer fill="FoodExpend" elevation={elevation} />}
    right={<GridLayer fill="NonFoodExpend" elevation={elevation} />}
  />
);
