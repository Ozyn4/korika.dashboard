import { MapViewState } from "@deck.gl/core";
import {
  GeographicCluster,
  SocioeconomicCluster,
} from "@/components/analysis/use-cluster-layer";

/**
 * West Java view
 */
export const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 107.5315,
  latitude: -6.79924,
  zoom: 8,
};

export const GRID_ANALYSIS_DESCRIPTION =
  "Grid 1km x 1km calculated from some variables from socioeconomic and geographic";

export const GEOGRAPHIC_CLUSTER_DESCRIPTION: Record<GeographicCluster, string> =
  {
    "Cluster 1":
      "Wilayah dengan vegetasi rendah, urbanisasi dan polusi tinggi. Wilayah ini merupakan wilayah dengan pola konsumsi yang cenderung lebih banyak mengeluarkan uangnya untuk pengeluaran nonmakanannya dibanding pengeluaran makanannya",
    "Cluster 2":
      "Wilayah dengan pola konsumsi yang mirip dengan klaster 1 yaitu cenderung lebih banyak mengeluarkan uangnya untuk pengeluaran nonmakanannya dibanding pengeluaran makanannya. Akan tetapi klaster ini memiliki karakteristik geografis yang cenderung berbeda dengan kalster 1, yaitu vegetasi tinggi, serta urbanisasi dan polusi yang cenderung lebih rendah. ",
    "Cluster 3":
      "Wilayah dengan karakteristik geografis mirip dengan klaster 2, yaitu vegetasi tinggi, serta urbanisasi dan polusi yang cenderung lebih rendah. Akan tetapi, klaster ini memiliki pola konsumsi yang berbeda, yaitu cenderung lebih banyak mengeluarkan uangnya untuk kebutuhan makanan, dibanding kebutuhan non makanannya. ",
  };

export const SOCIOECONOMIC_CLUSTER_DESCRIPTION: Record<
  SocioeconomicCluster,
  string
> = {
  "Cluster 1":
    "Wilayah dengan kondisi sosioekonomi (Education, Health, and Economy) terpenuhi dengan baik. Pola konsumsi klaster ini cenderung mengalokasikan pengeluaran nonmakanan yang lebih tinggi dibanding pengeluaran makanan.",
  "Cluster 2":
    "Wilayah dengan pola konsumsi yang mirip dengan klaster 1 yaitu cenderung lebih banyak mengeluarkan uangnya untuk pengeluaran nonmakanannya dibanding pengeluaran makanannya. Akan tetapi klaster ini memiliki karakteristik pemenuhan kondisi sosioekonomi yang lebih rendah dibanding klaster 1.",
  "Cluster 3":
    "Wilayah dengan pemenuhan kondisi sosioekonomi mirip dengan klaster 2. Akan tetapi, klaster ini memiliki pola konsumsi yang berbeda, yaitu cenderung lebih banyak mengeluarkan uangnya untuk kebutuhan makanan, dibanding kebutuhan non makanannya.",
  "Cluster 4":
    "Wilayah dengan pemenuhan kondisi sosioekonomi paling rendah diantara ketiga klaster sebelumnya. Klaster ini memiliki pola konsumsi yang cenderung lebih banyak mengeluarkan uangnya untuk kebutuhan makanan, dibanding kebutuhan non makanannya. ",
};
