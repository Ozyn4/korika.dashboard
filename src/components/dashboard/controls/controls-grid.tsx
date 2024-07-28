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
  IconBuildingHospital,
  IconCircleOff,
} from "@tabler/icons-react";
import{
 FaMosquito,
} from "react-icons/fa6"
import{
FaCloudRain ,
FaTemperatureHigh ,
} from "react-icons/fa"
import{
  WiHumidity ,
} from "react-icons/wi"
import { 
  GiNoseSide,
  GiLiver, 
  GiStomach ,
 } from "react-icons/gi";
 import { PiCampfireBold } from "react-icons/pi";
 import { GiPoisonGas } from "react-icons/gi";
 import { TbBrandCarbon } from "react-icons/tb";
import { ComponentProps } from "react";
import { ToggleGroupCustomItem } from "./components";

export const GridSwatch = ({ className, ...props }: ComponentProps<"div">) => {
  // const active = useDashboardStore((s) => s.active as GridAnalysisState);

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
        <Label className="font-bold text-xs">High</Label>
        <div className="relative flex flex-1 items-center justify-center">
          <Label className="z-[100] bg-background px-2 text-xs">
            {/* {active.fill} */}
            Legend
          </Label>
          <div className="absolute w-full border-foreground/50 border-b border-dashed" />
        </div>
        <Label className="font-bold text-xs">Low</Label>
      </div>
    </div>
  );
};

export const GridDescription = () => (
  <p className="text-sm">
    Pemetaan resiko penyakit 5m x 5m menggunakan indikator lingkungan
  </p>
);

export const GridSelector = () => {
  const active = useDashboardStore((s) => s.active as GridAnalysisState);

  const FILL_TYPE_CONTROL = [
    {
      value: "FoodExpend",
      label: "Resiko ISPA",
      icon: <GiNoseSide/>,
    },
    {
      value: "FoodExpend",
      label: "Resiko Hepatitis",
      icon: <GiLiver/>,
    },
    {
      value: "FoodExpend",
      label: "Resiko Diare",
      icon: <GiStomach />,
    },
    {
      value: "FoodExpend",
      label: "Resiko Malaria",
      icon: <FaMosquito  className="stroke-1" />,
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
      label: "Curah Hujan",
      icon: <FaCloudRain className="stroke-1" />,
    },
    {
      value: "Slope",
      label: "Suhu",
      icon: <FaTemperatureHigh  className="stroke-1" />,
    },
    {
      value: "ES_Distance",
      label: "Kelembapan",
      icon: <WiHumidity className="stroke-1" />,
    },
    {
      value: "JHS_Distance",
      label: "CO",
      icon: <TbBrandCarbon className="stroke-1" />,
    },
    {
      value: "SHS_Distance",
      label: "SO2",
      icon: <GiPoisonGas className="stroke-1" />,
    },
    {
      value: "Hospital_Distance",
      label: "NO2",
      icon: <PiCampfireBold className="stroke-1" />,
    },
    {
      value: "Hospital_Distance",
      label: "Fasilitas Kesehatan",
      icon: <IconBuildingHospital className="stroke-1" />,
    },
  ];

  return (
    <div className="flex flex-col gap-y-8 py-2">
      <div className="flex flex-col gap-4">
        <Label className="font-bold">Resiko Penyakit</Label>
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
            <Label className="font-bold"> Indikator Lingkungan</Label>
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
