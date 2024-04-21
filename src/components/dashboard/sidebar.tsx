import { cn } from "@/utils/classnames";
import { ComponentProps, FC } from "react";
import { Label } from "@/components/ui/label";
import { GridActiveState, useDashboardStore } from "./store";
import { useIsDesktop } from "@/components/hooks/use-is-desktop";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
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
            {active.view}
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

const GridViewSelector = () => {
  const active = useDashboardStore((state) => state.active as GridActiveState);

  return (
    <ToggleGroup
      type="single"
      value={active.view}
      defaultValue="FoodExpend"
      className="grid grid-cols-3"
      onValueChange={(value) =>
        useDashboardStore.setState({
          active: { type: "grid", view: value as (typeof active)["view"] },
        })
      }
    >
      <ToggleGroupItem asChild value="FoodExpend" aria-label="Food Expend">
        <div className="flex h-16 max-w-full cursor-pointer flex-col items-center justify-center gap-2">
          <IconToolsKitchen className="stroke-1" />
          <Label className="cursor-pointer">Food</Label>
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem
        asChild
        value="NonFoodExpend"
        aria-label="Non Food Expend"
      >
        <div className="flex h-16 max-w-full cursor-pointer flex-col items-center justify-center gap-2">
          <IconSchool className="stroke-1" />
          <Label className="cursor-pointer">Non Food</Label>
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem asChild value="Compare" aria-label="Compare Mode">
        <div className="flex h-16 max-w-full cursor-pointer flex-col items-center justify-center gap-2">
          <IconSoccerField className="stroke-1" />
          <Label className="cursor-pointer">Compare</Label>
        </div>
      </ToggleGroupItem>
    </ToggleGroup>
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
      <GridViewSelector />
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
