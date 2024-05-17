import { cn } from "@/utils/classnames";
import { IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import img from "@/assets/satellite-imagery.png";
import {
  GEOGRAPHIC_CLUSTER_COLOR,
  GRID_ZONE_COLORS,
  SOCIOECONOMIC_CLUSTER_COLOR,
} from "@/components/analysis/color";
import { GridZone } from "@/components/analysis/use-grid-layer";
import { Label } from "@/components/ui/label";

export const ExplainationContent = () => {
  return (
    <div className="prose">
      <p>
        This project offers a game-changing map that helps businesses and
        governments understand society better. With advanced technology, we
        provide detailed insights into consumer behavior and pinpoint areas
        where tackling poverty and shaping a brighter future for everyone is
        most crucial. Businesses can leverage this data to find new customers
        and refine their strategies, while governments can make smarter
        decisions to alleviate poverty and plan for the future. It's not just a
        map—it's your pathway to success and making a meaningful impact where
        it's needed most.
      </p>
      <p>
        We integrate multisource remote sensing satellite imagery and other
        geospatial big data by implementing artificial intelligence-machine
        learning and statistical analysis to develop more granular socioeconomic
        data in terms of coverage and time at a cheaper cost and faster rate.
      </p>
      <img className="m-auto max-w-xs" src={img} alt="Satellite Imagery" />
      <p>
        The analysis of Non-Food and Food Expenditure across seven zones shows
        that lighter colors indicate smaller zones with higher spending, while
        darker colors represent larger zones with lower spending. This means
        that in smaller zones, people spend more on both food and non-food
        items.
      </p>
      <div>
        <div className="grid max-h-4 w-full grid-cols-7 overflow-hidden">
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
            <div className="absolute w-full border-foreground/50 border-b border-dashed" />
          </div>
          <Label className="font-bold text-xs">Zona 7</Label>
        </div>
      </div>
      <p>
        We found that consumer behavior according to socioeconomic conditions
        can be clustered into four groups:
      </p>
      <ul className="list-none">
        <li className="text-sm">
          <div className="flex flex-row items-center gap-2">
            <div
              className="size-4"
              style={{
                backgroundColor: `rgb(${SOCIOECONOMIC_CLUSTER_COLOR["Cluster 1"]})`,
              }}
            />
            <span className="font-bold">Cluster 1</span>
          </div>
          <p>NonFood Expenditure &gt; Food Expenditure</p>
          <p>Well-Fulfilled Education, Health, and Economic Needs</p>
        </li>
        <li className="text-sm">
          <div className="flex flex-row items-center gap-2">
            <div
              className="size-4"
              style={{
                backgroundColor: `rgb(${SOCIOECONOMIC_CLUSTER_COLOR["Cluster 2"]})`,
              }}
            />
            <span className="font-bold">Cluster 2</span>
          </div>
          <p>NonFood Expenditure &gt; Food Expenditure</p>
          <p>Relatively Fulfilled Education, Health, and Economic Needs</p>
        </li>
        <li className="text-sm">
          <div className="flex flex-row items-center gap-2">
            <div
              className="size-4"
              style={{
                backgroundColor: `rgb(${SOCIOECONOMIC_CLUSTER_COLOR["Cluster 3"]})`,
              }}
            />
            <span className="font-bold">Cluster 3</span>
          </div>
          <p>Food Expenditure &gt; NonFood Expenditure</p>
          <p>Relatively Fulfilled Education, Health, and Economic Needs</p>
        </li>
        <li className="text-sm">
          <div className="flex flex-row items-center gap-2">
            <div
              className="size-4"
              style={{
                backgroundColor: `rgb(${SOCIOECONOMIC_CLUSTER_COLOR["Cluster 4"]})`,
              }}
            />
            <span className="font-bold">Cluster 4</span>
          </div>
          <p>Food Expenditure &gt; NonFood Expenditure</p>
          <p>Relatively Underfulfilled Education, Health, and Economic Needs</p>
        </li>
      </ul>
      <p>
        Then, according to its geographical factors can be clustered into three
        groups:
      </p>
      <ul className="list-none">
        <li className="text-sm">
          <div className="flex flex-row items-center gap-2">
            <div
              className="size-4"
              style={{
                backgroundColor: `rgb(${GEOGRAPHIC_CLUSTER_COLOR["Cluster 1"]})`,
              }}
            />
            <span className="font-bold">Cluster 1</span>
          </div>
          <p>NonFood Expenditure &gt; Food Expenditure</p>
          <p>Highest urbanization and pollution</p>
          <p>Lowest vegetation</p>
        </li>
        <li className="text-sm">
          <div className="flex flex-row items-center gap-2">
            <div
              className="size-4"
              style={{
                backgroundColor: `rgb(${GEOGRAPHIC_CLUSTER_COLOR["Cluster 2"]})`,
              }}
            />
            <span className="font-bold">Cluster 2</span>
          </div>
          <p>NonFood Expenditure &gt; Food Expenditure</p>
          <p>Higher vegetation</p>
          <p>Lower urbanization and pollution</p>
        </li>
        <li className="text-sm">
          <div className="flex flex-row items-center gap-2">
            <div
              className="size-4"
              style={{
                backgroundColor: `rgb(${GEOGRAPHIC_CLUSTER_COLOR["Cluster 3"]})`,
              }}
            />
            <span className="font-bold">Cluster 3</span>
          </div>
          <p>Food Expenditure &gt; NonFood Expenditure</p>
          <p>Higher vegetation</p>
          <p>Lower urbanization and pollution</p>
        </li>
      </ul>
    </div>
  );
};

interface ExplainationDesktopContainerProps {
  open?: boolean;
  onOpenChange?: (val: boolean) => void;
}

export const ExplainationContentDesktopContainer = ({
  open,
  onOpenChange,
}: ExplainationDesktopContainerProps) => {
  return (
    <div
      className={cn(
        "absolute top-0 right-0 z-[1000] hidden max-h-screen max-w-lg translate-x-full p-10 transition-all duration-200 ease-in-out md:flex",
        open && "translate-x-0",
      )}
    >
      <Button
        size="icon"
        onClick={() => onOpenChange && onOpenChange(!open)}
        className="absolute top-5 right-5 z-[10001] rounded-full"
      >
        <IconX />
      </Button>
      <div className="relative overflow-auto rounded-sm bg-white p-4 shadow-md">
        <ExplainationContent />
      </div>
    </div>
  );
};
