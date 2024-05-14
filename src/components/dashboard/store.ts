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
    tooltip: boolean;
    regenciesBorder: boolean;
  };
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  active: {
    analysis: "grid",
    fill: "FoodExpend",
  },
  settings: {
    tooltip: true,
    regenciesBorder: true,
  },
  changeActiveAnalysis: (analysis) =>
    set({
      active:
        analysis === "grid"
          ? { analysis: "grid", fill: "FoodExpend" }
          : { analysis: "cluster", clusters: "Geographic" },
    }),
}));
