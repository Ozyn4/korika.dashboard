import { tableFromIPC } from "apache-arrow";
import { GridCellLayer } from "@deck.gl/layers";
import { useQuery } from "@tanstack/react-query";
import { readParquet } from "parquet-wasm/esm/arrow2";

export type GridFillType = "FoodExpend" | "NonFoodExpend";

export type GridElevation = keyof typeof ELEVATION_SCALE;

export type GridZone = keyof typeof ZONE_COLORS;

export const ZONE_COLORS = {
  "Zona 1": [172, 250, 112],
  "Zona 2": [67, 223, 139],
  "Zona 3": [0, 188, 161],
  "Zona 4": [0, 151, 163],
  "Zona 5": [0, 116, 152],
  "Zona 6": [9, 80, 127],
  "Zona 7": [41, 47, 86],
} as const;

export const ELEVATION_SCALE = {
  Slope: 250,
  Elevation: 10,
  ES_Distance: 1,
  JHS_Distance: 1,
  SHS_Distance: 1,
  Hospital_Distance: 0.4,
  PublicHealth_Distance: 0.5,
} as const;

export interface GridHoverData {
  position: { x: number; y: number };
  data: Record<string, number | string>;
}

interface GridLayerProps {
  fill: GridFillType;
  elevation?: GridElevation;
  onHover?: (data: GridHoverData | undefined) => void;
}

export const useGridLayer = ({
  fill = "FoodExpend",
  elevation,
  onHover,
}: GridLayerProps) => {
  const { data } = useQuery({
    queryKey: ["grid"],
    gcTime: Infinity,
    staleTime: Infinity,
    queryFn: () => fetch("/maps/grid.parquet").then((res) => res.arrayBuffer()),
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
  const zones = table.getChild(fill)?.toArray();

  const colors = new Float32Array(zones.length * 3);

  for (let i = 0; i < zones.length; ++i) {
    const color = ZONE_COLORS[zones[i] as GridZone];

    colors[i * 3] = color[0] / 255;
    colors[i * 3 + 1] = color[1] / 255;
    colors[i * 3 + 2] = color[2] / 255;
  }

  return new GridCellLayer({
    cellSize: 1010, // add 10 meters for more accuracy
    pickable: true,
    extruded: !!elevation,
    elevationScale: ELEVATION_SCALE[elevation!] || 1,
    onHover: (info) => {
      if (info.index === -1) return onHover?.(undefined);

      return onHover?.({
        position: { x: info.x, y: info.y },
        data: table.get(info.index)?.toJSON() as Record<
          string,
          number | string
        >,
      });
    },
    data: {
      length: table.numRows,
      attributes: {
        getFillColor: { value: colors, size: 3 },
        getPosition: { value: flatCoordinateArray, size: 2 },
        ...(elevation && {
          getElevation: {
            value: new Float32Array(table.getChild(elevation)?.data[0].values),
          },
        }),
      },
    },
  });
};
