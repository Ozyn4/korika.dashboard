import { GeoJsonLayer } from "@deck.gl/layers";
import { useQuery } from "@tanstack/react-query";
import { GEOGRAPHIC_CLUSTER_COLOR, SOCIOECONOMIC_CLUSTER_COLOR } from "./color";

export type Cluster = "Geographic" | "Socioeconomic";

export interface ClusterHoverData {
  position: { x: number; y: number };
  data: Record<string, number | string>;
}

interface ClusterLayerProps {
  cluster: Cluster;
  onHover?: (data: ClusterHoverData | undefined) => void;
}

export type GeographicCluster = "Cluster 1" | "Cluster 2" | "Cluster 3";

export type SocioeconomicCluster =
  | "Cluster 1"
  | "Cluster 2"
  | "Cluster 3"
  | "Cluster 4";

export const useClusterLayer = ({ cluster, onHover }: ClusterLayerProps) => {
  const { data } = useQuery({
    queryKey: ["clusters"],
    gcTime: Infinity,
    staleTime: Infinity,
    queryFn: () => fetch("/maps/cluster.geojson").then((res) => res.json()),
  });

  return new GeoJsonLayer<{
    Geographic: GeographicCluster;
    Socioeconomic: SocioeconomicCluster;
  }>({
    data: data,
    filled: true,
    pickable: true,
    onHover: (info) => {
      if (info.index === -1) return onHover?.(undefined);

      return onHover?.({
        position: { x: info.x, y: info.y },
        data: info.object?.properties as Record<string, number | string>,
      });
    },
    getFillColor: (f) => {
      return cluster === "Geographic"
        ? GEOGRAPHIC_CLUSTER_COLOR[f.properties.Geographic] || [0, 0, 0, 0]
        : SOCIOECONOMIC_CLUSTER_COLOR[f.properties.Socioeconomic] || [0, 0, 0, 0];
    },
    updateTriggers: {
      getFillColor: [cluster],
    },
  });
};
