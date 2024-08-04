import {
  GEOGRAPHIC_CLUSTER_COLOR,
  SOCIOECONOMIC_CLUSTER_COLOR,
} from "@/components/analysis/color";
import {
  GeographicCluster,
  SocioeconomicCluster,
} from "@/components/analysis/use-cluster-layer";
import {
  ClusterAnalysisState,
  useDashboardStore,
} from "@/components/dashboard/store";
import { Label } from "@/components/ui/label";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { cn } from "@/utils/classnames";
import { ResponsiveRadar } from "@nivo/radar";
import { IconMountain, IconSchool } from "@tabler/icons-react";
import { ComponentProps } from "react";
import { ToggleGroupCustomItem } from "./components";

export const ClusterSwatch = ({
  className,
  ...props
}: ComponentProps<"div">) => {
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

/**
 * this data comes from precalculated data
 */
export const ClusterRadarChart = () => {
  const active = useDashboardStore((s) => s.active) as ClusterAnalysisState;

  return (
    <div className="aspect-square w-full">
      {active.clusters === "Geographic" ? (
        <ResponsiveRadar
          gridLabelOffset={10}
          dotBorderWidth={0.5}
          motionConfig="wobbly"
          blendMode="multiply"
          margin={{ right: 50, left: 50 }}
          indexBy="index"
          valueFormat=">-.3f"
          keys={["cluster1", "cluster2", "cluster3"]}
          colors={Object.keys(GEOGRAPHIC_CLUSTER_COLOR).map(
            (c) => `rgb(${GEOGRAPHIC_CLUSTER_COLOR[c as GeographicCluster]})`,
          )}
          data={[
            {
              index: "Food",
              cluster1: 0.466747978,
              cluster2: 0.514496674,
              cluster3: 0.866267094,
            },
            {
              index: "Non Food",
              cluster1: 0.533252022,
              cluster2: 0.485503326,
              cluster3: 0.133732906,
            },
            {
              index: "Vegetation",
              cluster1: 0.372436938,
              cluster2: 0.607455838,
              cluster3: 0.603621829,
            },
            {
              index: "Urban",
              cluster1: 0.581804036,
              cluster2: 0.251200151,
              cluster3: 0.24054495,
            },
            {
              index: "Pollution",
              cluster1: 0.756474774,
              cluster2: 0.379658214,
              cluster3: 0.368122998,
            },
          ]}
        />
      ) : (
        <ResponsiveRadar
          gridLabelOffset={10}
          dotBorderWidth={0.5}
          motionConfig="wobbly"
          blendMode="multiply"
          margin={{ right: 50, left: 50 }}
          indexBy="index"
          valueFormat=">-.3f"
          keys={["cluster1", "cluster2", "cluster3", "cluster4"]}
          colors={Object.keys(SOCIOECONOMIC_CLUSTER_COLOR).map(
            (c) =>
              `rgb(${SOCIOECONOMIC_CLUSTER_COLOR[c as SocioeconomicCluster]})`,
          )}
          data={[
            {
              index: "Food",
              cluster1: 0.41428884,
              cluster2: 0.38999789,
              cluster3: 0.61106984,
              cluster4: 0.92714162,
            },
            {
              index: "Non Food",
              cluster1: 0.58571116,
              cluster2: 0.61000211,
              cluster3: 0.38893016,
              cluster4: 0.07285838,
            },
            {
              index: "Education",
              cluster1: 0.359251,
              cluster2: 0.112224,
              cluster3: 0.106683,
              cluster4: 0.089254,
            },
            {
              index: "Health",
              cluster1: 0.326341,
              cluster2: 0.084477,
              cluster3: 0.072607,
              cluster4: 0.062862,
            },
            {
              index: "Economy",
              cluster1: 0.418042,
              cluster2: 0.248166,
              cluster3: 0.229731,
              cluster4: 0.214951,
            },
          ]}
        />
      )}
    </div>
  );
};

export const ClusterSelector = () => {
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
          defaultValue="ISPA"
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
