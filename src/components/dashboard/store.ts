import { create } from "zustand";
import {
  GridElevation,
  GridFillType,
  GridHoverData,
} from "@/components/maps/use-grid-layer";
import { Cluster } from "@/components/maps/use-cluster-layer";

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
  tooltip?: GridHoverData;
  changeActiveAnalysis: (analysis: ActiveAnalysisState["analysis"]) => void;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  active: {
    analysis: "grid",
    fill: "FoodExpend",
  },
  changeActiveAnalysis: (analysis) =>
    set({
      active:
        analysis === "grid"
          ? { analysis: "grid", fill: "FoodExpend" }
          : { analysis: "cluster", clusters: "Geographic" },
    }),
}));
