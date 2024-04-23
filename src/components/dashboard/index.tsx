import { Controls } from "./controls";
import { GridTooltip } from "./tooltip";
import { SingleMaps } from "../maps/maps";
import { useDashboardStore } from "./store";
import { MapProvider } from "react-map-gl/maplibre";
import { GridFillType } from "../maps/use-grid-layer";
import { WasmWrapper } from "@/components/ui/wasm-wrapper";
import { CompareGridLayer, GridLayer } from "./layer-grid";

export const DashboardMapLayer = () => {
  const active = useDashboardStore((state) => state.active);

  if (active.analysis === "grid" && active.fill === "Compare")
    return <CompareGridLayer elevation={active.elevation} />;

  return (
    <SingleMaps>
      {active.analysis === "grid" && (
        <>
          <GridTooltip />
          <GridLayer
            elevation={active.elevation}
            fill={active.fill as GridFillType}
          />
        </>
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
