import {
  GridElevation,
  GridFillType,
  useGridLayer,
} from "@/components/analysis/use-grid-layer";
import { useRegionLayer } from "@/components/analysis/use-regencies-broder-layer";
import { INITIAL_VIEW_STATE } from "@/components/dashboard/constant";
import { useDashboardStore } from "@/components/dashboard/store";
import { DeckGLOverlay, SplittedMaps } from "@/components/ui/maps";
import { FC } from "react";

interface GridLayerProps {
  fill: GridFillType;
  elevation?: GridElevation;
}

export const GridLayer: FC<GridLayerProps> = ({ fill, elevation }) => {
  const showRegion = useDashboardStore((state) => state.settings.region);

  const gridLayer = useGridLayer({
    fill,
    elevation,
    onHover: (tooltip) => useDashboardStore.setState({ tooltip }),
  });

  const region = useRegionLayer({ disabled: !showRegion });

  return <DeckGLOverlay controller layers={[gridLayer, ...region]} />;
};

type CompareGridLayerProps = Pick<GridLayerProps, "elevation">;

export const CompareGridLayer: FC<CompareGridLayerProps> = ({ elevation }) => {
  const baseMap = useDashboardStore((state) => state.settings.baseMap);

  return (
    <SplittedMaps
      viewState={INITIAL_VIEW_STATE}
      left={<GridLayer fill="FoodExpend" elevation={elevation} />}
      right={<GridLayer fill="NonFoodExpend" elevation={elevation} />}
      mapStyle={
        baseMap === "default"
          ? `${import.meta.env.BASE_URL}/maps/style.json`
          : `${import.meta.env.BASE_URL}/maps/style-satellite.json`
      }
    />
  );
};
