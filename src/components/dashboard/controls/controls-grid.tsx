import { GRID_ZONE_COLORS } from "@/components/analysis/color";
import { GridZone } from "@/components/analysis/use-grid-layer";
import {
  GridAnalysisState,
  useDashboardStore,
} from "@/components/dashboard/store";
import { Label } from "@/components/ui/label";
import { ToggleGroup } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/classnames";
import {
  IconAmbulance,
  IconBackpack,
  IconBooks,
  IconBuildingHospital,
  IconChartLine,
  IconCircleOff,
  IconMountain,
  IconSchool,
  IconSoccerField,
  IconToolsKitchen,
} from "@tabler/icons-react";
import { ComponentProps } from "react";
import { ToggleGroupCustomItem } from "./components";

export const GridSwatch = ({ className, ...props }: ComponentProps<"div">) => {
  const active = useDashboardStore((s) => s.active as GridAnalysisState);

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="grid max-h-4 w-full grid-cols-7 overflow-hidden rounded-sm">
        {Object.keys(GRID_ZONE_COLORS).map((z) => (
          <Tooltip key={z}>
            <TooltipTrigger asChild>
              <div
                className="flex aspect-square"
                style={{
                  backgroundColor: `rgb(${GRID_ZONE_COLORS[z as GridZone]})`,
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={-10}>
              {z}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className="flex items-center justify-between gap-2 px-1 py-1">
        <Label className="font-bold text-xs">Zona 1</Label>
        <div className="relative flex flex-1 items-center justify-center">
          <Label className="z-[100] bg-background px-2 text-xs">
            {active.fill}
          </Label>
          <div className="absolute w-full border-foreground/50 border-b border-dashed" />
        </div>
        <Label className="font-bold text-xs">Zona 7</Label>
      </div>
    </div>
  );
};

export const GridDescription = () => (
  <p className="text-sm">
    Granular socio-economic mapping 1km x 1km based on remote sensing and other
    geospatial big data
  </p>
);

export const GridSelector = () => {
  const active = useDashboardStore((s) => s.active as GridAnalysisState);

  const FILL_TYPE_CONTROL = [
    {
      value: "FoodExpend",
      label: "Food Expend",
      icon: <IconToolsKitchen className="stroke-1" />,
    },
    {
      value: "NonFoodExpend",
      label: "Non Food Expend",
      icon: <IconSchool className="stroke-1" />,
    },
    {
      value: "Compare",
      label: "Compare Mode",
      icon: <IconSoccerField className="stroke-1" />,
    },
  ];

  const ELEVATED_MAP_CONTROL = [
    {
      value: undefined,
      label: "None",
      icon: <IconCircleOff className="stroke-1" />,
    },
    {
      value: "Elevation",
      label: "Elevation",
      icon: <IconMountain className="stroke-1" />,
    },
    {
      value: "Slope",
      label: "Slope",
      icon: <IconChartLine className="stroke-1" />,
    },
    {
      value: "ES_Distance",
      label: "Elementary Schools",
      icon: <IconBackpack className="stroke-1" />,
    },
    {
      value: "JHS_Distance",
      label: "Junior High Schools",
      icon: <IconBooks className="stroke-1" />,
    },
    {
      value: "SHS_Distance",
      label: "Senior High Schools",
      icon: <IconSchool className="stroke-1" />,
    },
    {
      value: "Hospital_Distance",
      label: "Hospital",
      icon: <IconBuildingHospital className="stroke-1" />,
    },
    {
      value: "PublicHealth_Distance",
      label: "PublicHealth",
      icon: <IconAmbulance className="stroke-1" />,
    },
  ];

  return (
    <div className="flex flex-col gap-y-8 py-2">
      <div className="flex flex-col gap-4">
        <Label className="font-bold">Fill</Label>
        <ToggleGroup
          type="single"
          value={active.fill}
          defaultValue="FoodExpend"
          className="grid grid-cols-3"
          onValueChange={(value) => {
            if (!value) return;
            useDashboardStore.setState((state) => ({
              active: {
                ...state.active,
                fill: value as (typeof active)["fill"],
                analysis: "grid",
              },
            }));
          }}
        >
          {FILL_TYPE_CONTROL.map((i) => (
            <ToggleGroupCustomItem key={i.value} {...i} />
          ))}
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Label className="font-bold">Elevated Maps</Label>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={-10}>
            Use <code>ctrl</code> and scroll or finger to show the 3d maps
          </TooltipContent>
        </Tooltip>
        <ToggleGroup
          type="single"
          value={active.elevation}
          className="grid grid-cols-3"
          onValueChange={(value) =>
            useDashboardStore.setState((state) => ({
              active: {
                elevation: value as (typeof active)["elevation"],
                fill: (state.active as typeof active).fill,
                analysis: "grid",
              },
            }))
          }
        >
          {ELEVATED_MAP_CONTROL.map((i, idx) => (
            <ToggleGroupCustomItem key={i.value || idx} {...i} />
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};
