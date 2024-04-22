import { create } from "zustand";
import { GridElevation } from "@/components/maps/use-grid-maps";

export type GridActiveState = {
  type: "grid";
  fill: "FoodExpend" | "NonFoodExpend" | "Compare";
  elevation?: GridElevation;
};

export type ClusterActiveState = {
  type: "cluster";
  view: "socials" | "green";
};

type ActiveState = GridActiveState | ClusterActiveState;

interface DashboardState {
  active: ActiveState;
  tooltip?: {
    x: number;
    y: number;
    data: Record<string, number | string>;
  };
}

export const useDashboardStore = create<DashboardState>()(() => ({
  active: {
    type: "grid",
    fill: "FoodExpend",
  },
}));
