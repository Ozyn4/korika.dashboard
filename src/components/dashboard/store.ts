import { create } from "zustand";
import {
  Cluster,
  ClusterHoverData,
} from "@/components/analysis/use-cluster-layer";
import {
  GridElevation,
  GridFillType,
  GridHoverData,
} from "@/components/analysis/use-grid-layer";

export type GridAnalysisState = {
  analysis: "grid";
  fill: GridFillType | "Compare";
  elevation?: GridElevation;
};

export type ClusterAnalysisState = {
  analysis: "cluster";
  clusters: Cluster;
};

type ActiveAnalysisState = GridAnalysisState | ClusterAnalysisState;

interface DashboardState {
  active: ActiveAnalysisState;

  tooltip?: GridHoverData | ClusterHoverData;

  changeActiveAnalysis: (analysis: ActiveAnalysisState["analysis"]) => void;

  settings: {
    region: boolean;
    tooltip: boolean;
    baseMap: "default" | "satellite";
  };
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  active: {
    analysis: "grid",
    fill: "FoodExpend",
  },
  settings: {
    region: true,
    tooltip: false,
    baseMap: "default",
  },
  changeActiveAnalysis: (analysis) =>
    set({
      active:
        analysis === "grid"
          ? { analysis: "grid", fill: "FoodExpend" }
          : { analysis: "cluster", clusters: "Geographic" },
    }),
}));
