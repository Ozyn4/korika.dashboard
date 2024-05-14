import { FC } from "react";
import { useDashboardStore } from "./store";
import { INITIAL_VIEW_STATE } from "./constant";
import { SplittedMaps, DeckGLOverlay } from "@/components/ui/maps";
import {
  useGridLayer,
  GridFillType,
  GridElevation,
} from "@/components/analysis/use-grid-layer";
import {
  useRegenciesBorderLabelLayer,
  useRegenciesBorderLayer,
} from "@/components/analysis/use-regencies-broder-layer";

interface GridLayerProps {
  fill: GridFillType;
  elevation?: GridElevation;
}

export const GridLayer: FC<GridLayerProps> = ({ fill, elevation }) => {
  const show = useDashboardStore((state) => state.settings.regenciesBorder);

  const gridLayer = useGridLayer({
    fill,
    elevation,
    onHover: (tooltip) => useDashboardStore.setState({ tooltip }),
  });

  const regenciesBorder = useRegenciesBorderLayer();

  const regenciesLabel = useRegenciesBorderLabelLayer();

  return (
    <DeckGLOverlay
      controller
      layers={[gridLayer, ...(show ? [regenciesBorder, regenciesLabel] : [])]}
    />
  );
};

export const CompareGridLayer: FC<Pick<GridLayerProps, "elevation">> = ({
  elevation,
}) => {
  const baseMap = useDashboardStore((state) => state.settings.baseMap);

  return (
    <SplittedMaps
      mapStyle={
        baseMap === "default"
          ? "/maps/style.json"
          : "/maps/style-satellite.json"
      }
      viewState={INITIAL_VIEW_STATE}
      left={<GridLayer fill="FoodExpend" elevation={elevation} />}
      right={<GridLayer fill="NonFoodExpend" elevation={elevation} />}
    />
  );
};
