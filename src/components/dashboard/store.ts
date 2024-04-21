import { create } from "zustand";

export type GridActiveState = {
  type: "grid";
  view: "FoodExpend" | "NonFoodExpend" | "Compare";
};

export type ClusterActiveState = {
  type: "cluster";
  view: "socials" | "green";
};

type ActiveState = GridActiveState | ClusterActiveState;

interface DashboardState {
  active: ActiveState;
}

export const useDashboardStore = create<DashboardState>()(() => ({
  active: {
    type: "grid",
    view: "FoodExpend",
  },
}));
