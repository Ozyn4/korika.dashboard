import "maplibre-gl/dist/maplibre-gl.css";

import { useGridZone } from "./use-grid-zone";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { DeckProps, MapViewState } from "@deck.gl/core";
import MapLibre, { useControl } from "react-map-gl/maplibre";

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 107.5315,
  latitude: -6.79924,
  zoom: 8,
};

const DeckGLOverlay = (props: DeckProps) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
};

export const Dashboard = () => {
  const gridLayer = useGridZone("FoodExpend");

  return (
    <MapLibre
      attributionControl={false}
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
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
