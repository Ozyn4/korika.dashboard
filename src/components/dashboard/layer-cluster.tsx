import { FC } from "react";
import { useDashboardStore } from "./store";
import { DeckGLOverlay } from "@/components/ui/maps";
import {
  Cluster,
  useClusterLayer,
} from "@/components/analysis/use-cluster-layer";
import {
  useRegenciesBorderLayer,
  useRegenciesBorderLabelLayer,
} from "@/components/analysis/use-regencies-broder-layer";

export const ClusterLayer: FC<{ cluster: Cluster }> = ({ cluster }) => {
  const show = useDashboardStore((state) => state.settings.regenciesBorder);

  const layer = useClusterLayer({
    cluster,
    onHover: (tooltip) => useDashboardStore.setState({ tooltip }),
  });

  const regenciesBorder = useRegenciesBorderLayer();

  const regenciesLabel = useRegenciesBorderLabelLayer();

  return (
    <DeckGLOverlay
      layers={[layer, ...(show ? [regenciesBorder, regenciesLabel] : [])]}
    />
  );
};
