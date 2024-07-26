import { GeographicCluster, SocioeconomicCluster } from "./use-cluster-layer";
import { GridZone } from "./use-grid-layer";

export const GRID_ZONE_COLORS: Record<GridZone, number[]> = {
"Zona 1": [51, 0, 0],
"Zona 2": [128, 0, 0],
"Zona 3": [102, 0, 0],
"Zona 4": [153, 0, 0],
"Zona 5": [204, 0, 0],
"Zona 6": [255, 51, 51],
"Zona 7": [255, 102, 102],

};

export const GEOGRAPHIC_CLUSTER_COLOR: Record<GeographicCluster, Uint8Array> = {
  "Cluster 1": new Uint8Array([247, 122, 82]),
  "Cluster 2": new Uint8Array([33, 201, 255]),
  "Cluster 3": new Uint8Array([242, 208, 59]),
};

export const SOCIOECONOMIC_CLUSTER_COLOR: Record<
  SocioeconomicCluster,
  Uint8Array
> = {
  "Cluster 1": new Uint8Array([247, 122, 82]),
  "Cluster 2": new Uint8Array([187, 164, 255]),
  "Cluster 3": new Uint8Array([0, 218, 214]),
  "Cluster 4": new Uint8Array([242, 208, 59]),
};
