import { FC } from "react";
import { useDashboardStore } from "./store";
import { DeckGLOverlay } from "@/components/ui/maps";
import {
  Cluster,
  useClusterLayer,
} from "@/components/analysis/use-cluster-layer";

export const ClusterLayer: FC<{ cluster: Cluster }> = ({ cluster }) => {
  const layer = useClusterLayer({
    cluster,
    onHover: (tooltip) => useDashboardStore.setState({ tooltip }),
  });

  return <DeckGLOverlay layers={[layer]} />;
};
