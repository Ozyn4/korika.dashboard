import { Sidebar } from "./sidebar";
import { GridMaps } from "./grid-map";
import { MapProvider } from "react-map-gl/maplibre";
import { WasmWrapper } from "@/components/ui/wasm-wrapper";

export const Dashboard = () => {
  return (
    <WasmWrapper>
      <MapProvider>
        <Sidebar />
        <GridMaps />
      </MapProvider>
    </WasmWrapper>
  );
};
