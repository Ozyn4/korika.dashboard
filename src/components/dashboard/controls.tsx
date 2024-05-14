import { cn } from "@/utils/classnames";
import { Label } from "@/components/ui/label";
import {
  GRID_ANALYSIS_DESCRIPTION,
  GEOGRAPHIC_CLUSTER_DESCRIPTION,
  SOCIOECONOMIC_CLUSTER_DESCRIPTION,
} from "./constant";
import { GridZone } from "@/components/analysis/use-grid-layer";
import { useIsDesktop } from "@/components/hooks/use-is-desktop";
import { ComponentProps, FC, ReactNode, forwardRef } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconMap,
  IconBooks,
  IconSchool,
  IconBackpack,
  IconMountain,
  IconAmbulance,
  IconCircleOff,
  IconChartLine,
  IconSatellite,
  IconSoccerField,
  IconToolsKitchen,
  IconBuildingHospital,
} from "@tabler/icons-react";
import {
  ClusterAnalysisState,
  GridAnalysisState,
  useDashboardStore,
} from "./store";
import {
  Cluster,
  GeographicCluster,
  SocioeconomicCluster,
} from "@/components/analysis/use-cluster-layer";
import {
  GEOGRAPHIC_CLUSTER_COLOR,
  GRID_ZONE_COLORS,
  SOCIOECONOMIC_CLUSTER_COLOR,
} from "@/components/analysis/color";
import { Switch } from "../ui/switch";

type ToggleGroupCustomItemProps = {
  value?: string;
  label: string;
  icon: ReactNode;
};

const ToggleGroupCustomItem: FC<ToggleGroupCustomItemProps> = (props) => (
  <ToggleGroupItem asChild value={props.value!} aria-label={props.label}>
    <div className="flex h-16 max-w-full cursor-pointer flex-col items-start justify-center gap-2">
      {props.icon}
      <Label className="cursor-pointer text-center text-xs">
        {props.label}
      </Label>
    </div>
  </ToggleGroupItem>
);

const GridSwatch: FC<ComponentProps<"div">> = ({ className, ...props }) => {
  const active = useDashboardStore((s) => s.active as GridAnalysisState);

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="grid max-h-4 w-full grid-cols-7 overflow-hidden rounded-sm">
        {Object.keys(GRID_ZONE_COLORS).map((z) => (
          <div
            key={z}
            className="flex aspect-square"
            style={{
              backgroundColor: `rgb(${GRID_ZONE_COLORS[z as GridZone]})`,
            }}
          />
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

const GridDescription = () => (
  <p className="text-sm">{GRID_ANALYSIS_DESCRIPTION}</p>
);

const GridSelector = () => {
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
        <Label className="font-bold">Elevated Maps</Label>
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

const ClusterSwatch: FC<ComponentProps<"div">> = ({ className, ...props }) => {
  const active = useDashboardStore((s) => s.active as ClusterAnalysisState);

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="max-h-4 overflow-hidden rounded-sm">
        {active.clusters === "Geographic" && (
          <div className="grid grid-cols-3">
            {Object.keys(GEOGRAPHIC_CLUSTER_COLOR).map((c) => (
              <div
                key={c}
                className="flex aspect-square"
                style={{
                  backgroundColor: `rgb(${
                    GEOGRAPHIC_CLUSTER_COLOR[c as GeographicCluster]
                  })`,
                }}
              />
            ))}
          </div>
        )}
        {active.clusters === "Socioeconomic" && (
          <div className="grid grid-cols-4">
            {Object.keys(SOCIOECONOMIC_CLUSTER_COLOR).map((c) => (
              <div
                key={c}
                className="flex aspect-square"
                style={{
                  backgroundColor: `rgb(${
                    SOCIOECONOMIC_CLUSTER_COLOR[c as SocioeconomicCluster]
                  })`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-1 py-1">
        <Label className="font-bold text-xs">Cluster 1</Label>
        <div className="relative flex flex-1 items-center justify-center">
          <Label className="z-[100] bg-background px-2 text-xs">
            {active.clusters}
          </Label>
          <div className="absolute w-full border-foreground/50 border-b border-dashed" />
        </div>
        <Label className="font-bold text-xs">
          {active.clusters === "Geographic" ? "Cluster 3" : "Cluster 4"}
        </Label>
      </div>
    </div>
  );
};

const ClusterDescription: FC<{ cluster: Cluster }> = ({ cluster }) => {
  const DescriptionItem = ({
    color,
    cluster,
    description,
  }: {
    cluster: string;
    description: string;
    color: number[] | Uint8Array;
  }) => (
    <div className="text-xs">
      <div className="flex flex-row items-center justify-between border-b py-0.5">
        <Label className="font-bold text-xs">{cluster}</Label>
        <div
          className="aspect-square w-4"
          style={{ backgroundColor: `rgb(${color})` }}
        />
      </div>
      <div className="text-muted-foreground">{description}</div>
    </div>
  );

  return (
    <div className="space-y-2">
      {cluster === "Geographic" &&
        Object.keys(GEOGRAPHIC_CLUSTER_DESCRIPTION).map((c) => (
          <DescriptionItem
            key={c}
            cluster={c}
            color={GEOGRAPHIC_CLUSTER_COLOR[c as GeographicCluster]}
            description={GEOGRAPHIC_CLUSTER_DESCRIPTION[c as GeographicCluster]}
          />
        ))}
      {cluster === "Socioeconomic" &&
        Object.keys(SOCIOECONOMIC_CLUSTER_DESCRIPTION).map((c) => (
          <DescriptionItem
            key={c}
            cluster={c}
            color={SOCIOECONOMIC_CLUSTER_COLOR[c as GeographicCluster]}
            description={
              SOCIOECONOMIC_CLUSTER_DESCRIPTION[c as GeographicCluster]
            }
          />
        ))}
    </div>
  );
};

const ClusterSelector = () => {
  const active = useDashboardStore((s) => s.active as ClusterAnalysisState);

  const FILL_TYPE_CONTROL = [
    {
      value: "Geographic",
      label: "Geographic Analysis",
      icon: <IconMountain className="stroke-1" />,
    },
    {
      value: "Socioeconomic",
      label: "Socioeconomic Analysis",
      icon: <IconSchool className="stroke-1" />,
    },
  ];

  return (
    <div className="flex flex-col gap-y-8 py-2">
      <div className="flex flex-col gap-4">
        <ToggleGroup
          type="single"
          value={active.clusters}
          defaultValue="FoodExpend"
          className="grid grid-cols-2"
          onValueChange={(value) => {
            if (!value) return;

            useDashboardStore.setState({
              active: {
                clusters: value as (typeof active)["clusters"],
                analysis: "cluster",
              },
            });
          }}
        >
          {FILL_TYPE_CONTROL.map((i) => (
            <ToggleGroupCustomItem key={i.value} {...i} />
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

const SettingsControl = () => {
  const settings = useDashboardStore((state) => state.settings);

  return (
    <div className="flex flex-col gap-4 p-2">
      <Label className="font-bold">Settings</Label>
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row items-center justify-between">
          <Label>Tooltip</Label>
          <Switch
            checked={settings.tooltip}
            onCheckedChange={(v) =>
              useDashboardStore.setState((s) => ({
                settings: { ...s.settings, tooltip: v },
              }))
            }
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <Label>Regencies Border</Label>
          <Switch
            checked={settings.regenciesBorder}
            onCheckedChange={(v) =>
              useDashboardStore.setState((s) => ({
                settings: { ...s.settings, regenciesBorder: v },
              }))
            }
          />
        </div>
        <ToggleGroup
          type="single"
          value={settings.baseMap}
          className="grid grid-cols-2"
          onValueChange={(value: "default" | "satellite") =>
            useDashboardStore.setState((state) => ({
              settings: {
                ...state.settings,
                baseMap: value ? value : "default",
              },
            }))
          }
        >
          <ToggleGroupCustomItem
            label="Default"
            value="default"
            icon={<IconMap className="stroke-1" />}
          />
          <ToggleGroupCustomItem
            label="Satellite"
            value="satellite"
            icon={<IconSatellite className="stroke-1" />}
          />
        </ToggleGroup>
      </div>
    </div>
  );
};

/**
 * return control content based on active state
 *
 * @returns
 */
const ControlsContent = () => {
  const active = useDashboardStore((state) => state.active);
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs
        defaultValue="grid"
        value={active.analysis}
        onValueChange={(value) =>
          useDashboardStore
            .getState()
            .changeActiveAnalysis(value as (typeof active)["analysis"])
        }
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="cluster">Cluster</TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <div className="space-y-2 px-2">
            <GridSwatch />
            <GridDescription />
            <GridSelector />
          </div>
        </TabsContent>
        <TabsContent value="cluster">
          <div className="space-y-2 px-2">
            <ClusterSwatch />
            <ClusterSelector />
            <ClusterDescription
              cluster={(active as ClusterAnalysisState).clusters}
            />
          </div>
        </TabsContent>
      </Tabs>
      <SettingsControl />
    </div>
  );
};

/**
 * trigger for opening controls content
 */
const MobileControlsTrigger = forwardRef<HTMLDivElement>((_props, ref) => {
  const active = useDashboardStore((state) => state.active);

  return (
    <div ref={ref} className="absolute bottom-5 left-0 z-[1000] w-full p-2">
      {active.analysis === "grid" && (
        <GridSwatch className="m-auto max-w-xs flex-1 overflow-hidden rounded-sm rounded-t-sm bg-white" />
      )}
      {active.analysis === "cluster" && (
        <ClusterSwatch className="m-auto max-w-xs flex-1 overflow-hidden rounded-sm rounded-t-sm bg-white" />
      )}
    </div>
  );
});

/**
 * wrapper for control in desktop and mobile
 *
 * @returns
 */
export const Controls = () => {
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <div className="absolute left-0 z-[1000] flex w-96 flex-col p-10">
      <div className="w-full flex-1 rounded-sm border bg-white shadow-sm">
        <ControlsContent />
      </div>
    </div>
  ) : (
    <Drawer shouldScaleBackground>
      <DrawerTrigger>
        <MobileControlsTrigger />
      </DrawerTrigger>
      <DrawerContent>
        <div className="m-auto max-w-sm">
          <ControlsContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
