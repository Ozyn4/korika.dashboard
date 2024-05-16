import { FC } from "react";
import { useDashboardStore } from "./store";
import { DeckGLOverlay } from "@/components/ui/maps";
import { useRegionLayer } from "@/components/analysis/use-regencies-broder-layer";
import {
  Cluster,
  useClusterLayer,
} from "@/components/analysis/use-cluster-layer";

export const ClusterLayer: FC<{ cluster: Cluster }> = ({ cluster }) => {
  const show = useDashboardStore((state) => state.settings.region);

  const layer = useClusterLayer({
    cluster,
    onHover: (tooltip) => useDashboardStore.setState({ tooltip }),
  });

  const region = useRegionLayer({ disabled: !show });

  return <DeckGLOverlay layers={[layer, ...region]} />;
};
