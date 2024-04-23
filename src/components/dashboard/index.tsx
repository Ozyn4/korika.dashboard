import { Controls } from "./controls";
import { Tooltip } from "./tooltip";
import { DeckGLOverlay, SingleMaps } from "../maps/maps";
import { useDashboardStore } from "./store";
import { MapProvider } from "react-map-gl/maplibre";
import { GridFillType } from "../maps/use-grid-layer";
import { WasmWrapper } from "@/components/ui/wasm-wrapper";
import { CompareGridLayer, GridLayer } from "./layer-grid";
import { FC } from "react";
import { Cluster, useClusterLayer } from "@/components/maps/use-cluster-layer";

const ClusterLayer: FC<{ cluster: Cluster }> = ({ cluster }) => {
  const layer = useClusterLayer({
    cluster,
    onHover: (tooltip) => useDashboardStore.setState({ tooltip }),
  });

  console.log(cluster)

  return <DeckGLOverlay layers={[layer]} />;
};

const DashboardMapLayer = () => {
  const active = useDashboardStore((state) => state.active);

  if (active.analysis === "grid" && active.fill === "Compare")
    return <CompareGridLayer elevation={active.elevation} />;

  return (
    <SingleMaps>
      <Tooltip />
      {active.analysis === "cluster" && (
        <ClusterLayer cluster={active.clusters} />
      )}
      {active.analysis === "grid" && (
        <GridLayer
          elevation={active.elevation}
          fill={active.fill as GridFillType}
        />
      )}
    </SingleMaps>
  );
};

export const Dashboard = () => {
  return (
    <WasmWrapper>
      <MapProvider>
        <Controls />
        <DashboardMapLayer />
      </MapProvider>
    </WasmWrapper>
  );
};
