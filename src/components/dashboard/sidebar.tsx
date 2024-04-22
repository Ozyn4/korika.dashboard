import { ComponentProps, FC, ReactNode } from "react";
import { cn } from "@/utils/classnames";
import { Label } from "@/components/ui/label";
import { GridActiveState, useDashboardStore } from "./store";
import { useIsDesktop } from "@/components/hooks/use-is-desktop";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
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

const GridSwatch = ({ className, ...props }: ComponentProps<"div">) => {
  const active = useDashboardStore((state) => state.active as GridActiveState);

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="grid w-full grid-cols-7">
        <div className="flex aspect-square bg-[#acfa70]" />
        <div className="flex aspect-square bg-[#43df8b]" />
        <div className="flex aspect-square bg-[#00bca1]" />
        <div className="flex aspect-square bg-[#0097a3]" />
        <div className="flex aspect-square bg-[#007498]" />
        <div className="flex aspect-square bg-[#09507f]" />
        <div className="flex aspect-square bg-[#292f56]" />
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

const GridDescription = () => (
  <p className="text-sm">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum sed fuga, ullam
    ducimus tempore molestias a inventore harum iure dolore repellendus non amet
    laboriosam mollitia debitis odit numquam officiis commodi.
  </p>
);

const GridSelector = () => {
  const active = useDashboardStore((state) => state.active as GridActiveState);

  type ToggleGroupCustomItemProps = {
    value?: string;
    label: string;
    icon: ReactNode;
  };

  const ToggleGroupCustomItem: FC<ToggleGroupCustomItemProps> = (props) => (
    <ToggleGroupItem asChild value={props.value!} aria-label={props.label}>
      <div className="flex h-16 max-w-full cursor-pointer flex-col items-center justify-center gap-2">
        {props.icon}
        <Label className="cursor-pointer text-center text-xs">
          {props.label}
        </Label>
      </div>
    </ToggleGroupItem>
  );

  return (
    <div className="flex flex-col gap-y-8 py-2">
      <div className="flex flex-col gap-4">
        <Label className="font-bold">Fill By :</Label>
        <ToggleGroup
          type="single"
          value={active.fill}
          defaultValue="FoodExpend"
          className="grid grid-cols-3"
          onValueChange={(value) =>
            useDashboardStore.setState((state) => ({
              active: {
                ...state.active,
                fill: value as (typeof active)["fill"],
                type: "grid",
              },
            }))
          }
        >
          {[
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
          ].map((i) => (
            <ToggleGroupCustomItem key={i.value} {...i} />
          ))}
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-4">
        <Label className="font-bold">Elevated Maps By :</Label>
        <ToggleGroup
          type="single"
          value={active.elevation}
          className="grid grid-cols-3"
          onValueChange={(value) =>
            useDashboardStore.setState((state) => ({
              active: {
                elevation: value as (typeof active)["elevation"],
                fill: (state.active as typeof active).fill,
                type: "grid",
              },
            }))
          }
        >
          {[
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
              value: "Hospital_Distance",
              label: "Hospital",
              icon: <IconBuildingHospital className="stroke-1" />,
            },
            {
              value: "PublicHealth_Distance",
              label: "Public Health",
              icon: <IconAmbulance className="stroke-1" />,
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
            // "ES_Distance" | "JHS_Distance" | "SHS_Distance" | "Hospital_Distance" | "PublicHealth_Distance" | "Elevation" | "Slope" | undefined
          ].map((i) => (
            <ToggleGroupCustomItem key={i.value} {...i} />
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

/**
 * return sidebar content based on active state
 *
 * @returns
 */
const SidebarContent = () => {
  const active = useDashboardStore((state) => state.active);

  if (active.type !== "grid") return;

  return (
    <div className="space-y-2 p-2">
      <GridSwatch />
      <GridDescription />
      <GridSelector />
    </div>
  );
};

/**
 * wrapper for sidebar in desktop and mobile
 *
 * @returns
 */
export const Sidebar = () => {
  const isDesktop = useIsDesktop();

  if (isDesktop)
    return (
      <div className="absolute left-0 z-[1000] flex w-96 flex-col p-10">
        <div className="w-full flex-1 rounded-sm border bg-white shadow-sm">
          <SidebarContent />
        </div>
      </div>
    );

  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <div className="absolute bottom-5 left-0 z-[1000] w-full p-2">
          <GridSwatch className="m-auto max-w-xs flex-1 overflow-hidden rounded-sm rounded-t-sm bg-white" />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="m-auto max-w-sm">
          <SidebarContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
