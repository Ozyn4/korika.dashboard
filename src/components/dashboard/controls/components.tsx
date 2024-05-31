import { Label } from "@/components/ui/label";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FC, ReactNode } from "react";

type ToggleGroupCustomItemProps = {
  value?: string;
  label: string;
  icon: ReactNode;
};

export const ToggleGroupCustomItem: FC<ToggleGroupCustomItemProps> = (
  props,
) => (
  <ToggleGroupItem asChild value={props.value!} aria-label={props.label}>
    <div className="h-16 max-w-full cursor-pointer">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex-1">{props.icon}</div>
            <Label className="line-clamp-2 cursor-pointer text-center font-light text-xs">
              {props.label}
            </Label>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={-10}>
          {props.label}
        </TooltipContent>
      </Tooltip>
    </div>
  </ToggleGroupItem>
);
