import {
  Cluster,
  useClusterLayer,
} from "@/components/analysis/use-cluster-layer";
import { useRegionLayer } from "@/components/analysis/use-regencies-broder-layer";
import { useDashboardStore } from "@/components/dashboard/store";
import { DeckGLOverlay } from "@/components/ui/maps";
import { FC } from "react";

export const ClusterLayer: FC<{ cluster: Cluster }> = ({ cluster }) => {
  const show = useDashboardStore((state) => state.settings.region);

  const layer = useClusterLayer({
    cluster,
    onHover: (tooltip) => useDashboardStore.setState({ tooltip }),
  });

  const region = useRegionLayer({ disabled: !show });

  return <DeckGLOverlay layers={[layer, ...region]} />;
};
