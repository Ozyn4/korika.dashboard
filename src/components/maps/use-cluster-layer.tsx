import { GeoJsonLayer } from "@deck.gl/layers";
import { useQuery } from "@tanstack/react-query";

export type Cluster = "Geographic" | "Socioeconomic";

interface ClusterHoverData {
  position: { x: number; y: number };
  data: Record<string, number | string>;
}

interface ClusterLayerProps {
  cluster: Cluster;
  onHover?: (data: ClusterHoverData | undefined) => void;
}

type GeographicCluster = "Cluster 1" | "Cluster 2" | "Cluster 3";

type SocioeconomicCluster =
  | "Cluster 1"
  | "Cluster 2"
  | "Cluster 3"
  | "Cluster 4";

const GeographicClusterColor: Record<GeographicCluster, Uint8Array> = {
  "Cluster 1": new Uint8Array([247, 122, 82]),
  "Cluster 2": new Uint8Array([33, 201, 255]),
  "Cluster 3": new Uint8Array([242, 208, 59]),
};

const SocioeconomicClusterColor: Record<SocioeconomicCluster, Uint8Array> = {
  "Cluster 1": new Uint8Array([247, 122, 82]),
  "Cluster 2": new Uint8Array([187, 164, 255]),
  "Cluster 3": new Uint8Array([0, 218, 214]),
  "Cluster 4": new Uint8Array([242, 208, 59]),
};

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
        ? GeographicClusterColor[f.properties.Geographic] || [0, 0, 0, 0]
        : SocioeconomicClusterColor[f.properties.Socioeconomic] || [0, 0, 0, 0];
    },
    updateTriggers: {
      getFillColor: [cluster],
    },
  });
};
