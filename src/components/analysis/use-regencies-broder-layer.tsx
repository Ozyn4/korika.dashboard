import { GeoJsonLayer } from "@deck.gl/layers";
import { useQuery } from "@tanstack/react-query";

export const useRegenciesBorderLayer = () => {
  const { data } = useQuery({
    queryKey: ["regencies"],
    gcTime: Infinity,
    staleTime: Infinity,
    queryFn: () => fetch("/maps/west-java.geojson").then((res) => res.json()),
  });

  return new GeoJsonLayer({
    data: data,
    getFillColor: [0, 0, 0, 0],
    getLineColor: [0, 0, 0, 255],
    getLineWidth: 250,
  });
};

export const useRegenciesBorderLabelLayer = () => {
  const { data } = useQuery({
    queryKey: ["regencies-label"],
    gcTime: Infinity,
    staleTime: Infinity,
    queryFn: () =>
      fetch("/maps/west-java-label.geojson").then((res) => res.json()),
  });

  return new GeoJsonLayer({
    data: data,
    pointType: "text",

    getText: (f: { properties: { name: string } }) => f.properties.name,
    getTextSize: 12,
    getTextColor: [255, 0, 0, 255],
    textOutlineWidth: 1000,
  });
};
