import { cn } from "@/utils/classnames";
import { IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import img from "@/assets/satellite-imagery.png";

export const ExplainationContent = () => {
  return (
    <div className="prose">
      <p>
        Social economics is primarily concerned with the interplay between
        social processes and economic activity within a society. Social
        economics may attempt to explain how a particular social group or
        socioeconomic class behaves within a society, including their actions as
        consumers. According to BPS Statistics Indonesia, low socio-economic
        fulfillment indicates poverty. Thus, socioeconomic data is important to
        read market needs to maximize sales.
      </p>
      <p>
        On the other hand, this data is also needed to show the incidence of
        poverty. However, traditional data collecting implies that socioeconomic
        data is only presented at the district level and updated once a year. We
        develop the granular socio-economic mapping based on remote sensing and
        other geospatial big data enriched by insight into consumer behavior
        modeling and consumer behavior geographical factor analysis. This
        approach allows us to present more granular socioeconomic data in terms
        of coverage and time at a cheaper cost and faster rate.
      </p>
      <p>
        To overcome this, we integrate multisource remote sensing satellite
        imagery and other geospatial big data by implementing artificial
        intelligence-machine learning and statistical analysis.
      </p>
      <ul>
        <li>Night Time Light Intensity (NTL)</li>
        <li>Built-Up Index (BUI)</li>
        <li>Enhanced Vegetation Index (EVI)</li>
        <li>Digital Elevation Model (DEM)</li>
        <li>Land Surface Temperature (LST)</li>
        <li>Carbon Monoxide (CO) and Nitrogen Dioxide (NO2)</li>
        <li>Healthcare Point of Interest (POI)</li>
        <li>Education Point of Interest (POI)</li>
      </ul>
      <img className="m-auto max-w-xs" src={img} alt="Satellite Imagery" />
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
