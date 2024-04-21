import "maplibre-gl/dist/maplibre-gl.css";

import { MapViewState } from "@deck.gl/core";
import { WasmWrapper } from "@/components/ui/wasm-wrapper";
import { DeckGLOverlay } from "@/components/ui/maps-overlay";
import MapLibre, { MapProvider } from "react-map-gl/maplibre";
import { useGridZone } from "@/components/hooks/use-grid-zone";

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 107.5315,
  latitude: -6.79924,
  zoom: 8,
};

export const GridMaps = () => {
  const gridLayer = useGridZone("FoodExpend");

  return (
    <MapLibre
      attributionControl={false}
      mapStyle="/maps/style.json"
      initialViewState={INITIAL_VIEW_STATE}
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
    >
      <DeckGLOverlay controller layers={[gridLayer]} />
    </MapLibre>
  );
};

export const Dashboard = () => {
  return (
    <WasmWrapper>
      <MapProvider>
        <GridMaps />
      </MapProvider>
    </WasmWrapper>
  );
};
