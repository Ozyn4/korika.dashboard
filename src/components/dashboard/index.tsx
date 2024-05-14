import { Tooltip } from "./tooltip";
import { Controls } from "./controls";
import { useDashboardStore } from "./store";
import { ClusterLayer } from "./layer-cluster";
import { INITIAL_VIEW_STATE } from "./constant";
import { SingleMaps } from "@/components/ui/maps";
import { MapProvider } from "react-map-gl/maplibre";
import { GridFillType } from "../analysis/use-grid-layer";
import { WasmWrapper } from "@/components/ui/wasm-wrapper";
import { CompareGridLayer, GridLayer } from "./layer-grid";

const DashboardMapLayer = () => {
  const baseMap = useDashboardStore((state) => state.settings.baseMap);

  const active = useDashboardStore((state) => state.active);

  if (active.analysis === "grid" && active.fill === "Compare")
    return <CompareGridLayer elevation={active.elevation} />;

  return (
    <SingleMaps
      mapStyle={
        baseMap === "default"
          ? "/maps/style.json"
          : "/maps/style-satellite.json"
      }
      initialViewState={INITIAL_VIEW_STATE}
    >
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
