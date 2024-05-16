import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroupCustomItem } from "./components";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { IconMap, IconSatellite } from "@tabler/icons-react";
import { useDashboardStore } from "@/components/dashboard/store";

/**
 * global control for all analysis, basemaps, tooltip, and region
 */
export const SettingsControl = () => {
  const settings = useDashboardStore((state) => state.settings);

  return (
    <div className="flex flex-col gap-4 p-2">
      <Label className="font-bold">Settings</Label>
      <div className="flex flex-col gap-y-2">
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
        <div className="flex flex-row items-center justify-between">
          <Label className="text-sm">Tooltip</Label>
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
          <Label className="text-sm">Region Border</Label>
          <Switch
            checked={settings.region}
            onCheckedChange={(v) =>
              useDashboardStore.setState((s) => ({
                settings: { ...s.settings, region: v },
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};
