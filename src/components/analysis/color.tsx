import { GeographicCluster, SocioeconomicCluster } from "./use-cluster-layer";
import { GridZone } from "./use-grid-layer";

export const GRID_ZONE_COLORS: Record<GridZone, number[]> = {
  "Zona 1": [172, 250, 112],
  "Zona 2": [67, 223, 139],
  "Zona 3": [0, 188, 161],
  "Zona 4": [0, 151, 163],
  "Zona 5": [0, 116, 152],
  "Zona 6": [9, 80, 127],
  "Zona 7": [41, 47, 86],
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
