import { tableFromIPC } from "apache-arrow";
import { GridCellLayer } from "@deck.gl/layers";
import { useQuery } from "@tanstack/react-query";
import initWasm, { readParquet } from "parquet-wasm/esm/arrow2";

await initWasm();

type GridType = "FoodExpend" | "NonFoodExpend";

type GridZone = keyof typeof ZONE_COLORS;

const ZONE_COLORS = {
  "Zona 1": [50, 50, 10],
  "Zona 2": [50, 50, 20],
  "Zona 3": [50, 50, 30],
  "Zona 4": [50, 50, 40],
  "Zona 5": [50, 50, 50],
  "Zona 6": [50, 50, 60],
  "Zona 7": [50, 50, 70],
} as const;

export const useGridZone = (type: GridType = "FoodExpend") => {
  const { data } = useQuery({
    queryKey: ["grid"],
    gcTime: Infinity,
    staleTime: Infinity,
    queryFn: () => fetch("/data/grid.parquet").then((res) => res.arrayBuffer()),
  });

  if (!data) return;

  const parquetBytes = new Uint8Array(data);

  const wasmArrowTable = readParquet(parquetBytes).intoIPCStream();

  const table = tableFromIPC(wasmArrowTable);

  const flatCoordinateArray = table.getChild("geometry")?.getChildAt(0)
    ?.data[0].values;

  /**
   * we calculate the color and save it to float array
   */
  const zones = table.getChild(type)?.toArray();

  const colors = new Float32Array(zones.length * 3);

  for (let i = 0; i < zones.length; ++i) {
    const color = ZONE_COLORS[zones[i] as GridZone];

    colors[i * 3] = color[0] / 100;
    colors[i * 3 + 1] = color[1] / 100;
    colors[i * 3 + 2] = color[2] / 100;
  }

  return new GridCellLayer({
    data: {
      length: table.numRows,
      attributes: {
        getPosition: { value: flatCoordinateArray, size: 2 },
        getFillColor: { value: colors, size: 3 },
      },
    },
    extruded: false,
    cellSize: 1010, // add 10 meters for more accuracy
  });
};
