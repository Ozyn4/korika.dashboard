import { useDashboardStore } from "@/components/dashboard/store";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { IconMap, IconSatellite } from "@tabler/icons-react";
import { ToggleGroupCustomItem } from "./components";

/**
 * global control for all analysis, basemaps, tooltip, and region
 */
export const SettingsControl = () => {
  const settings = useDashboardStore((state) => state.settings);

  return (
    <div className="flex flex-col gap-4 p-2">
      <Label className="font-bold">Settings</Label>
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row items-center justify-between">
          <Label className="font-light text-sm">Tooltip</Label>
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
          <Label className="font-light text-sm">Region Border</Label>
          <Switch
            checked={settings.region}
            onCheckedChange={(v) =>
              useDashboardStore.setState((s) => ({
                settings: { ...s.settings, region: v },
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
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
          <Label className="flex flex-row justify-end gap-1 font-extralight text-xs">
            <span>&copy;</span>
            <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
            <span>&copy;</span>
            <a href="https://maplibre.org/">MapLibre</a>
            <span>&copy;</span>
            {settings.baseMap === "default" ? (
              <a href="https://carto.com/attributions">CARTO</a>
            ) : (
              <a href="https://arcgis.com/">ESRI</a>
            )}
          </Label>
        </div>
      </div>
    </div>
  );
};
