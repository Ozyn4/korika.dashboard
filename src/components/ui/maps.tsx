import "maplibre-gl/dist/maplibre-gl.css";

import MapLibre from "react-map-gl/maplibre";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { useControl } from "react-map-gl/maplibre";
import { DeckProps, MapViewState } from "@deck.gl/core";
import { useMeasure } from "@/components/hooks/use-measure";
import {
  FC,
  useState,
  ReactNode,
  ComponentProps,
  PropsWithChildren,
} from "react";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const DeckGLOverlay = (props: DeckProps) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
};

export const SingleMaps: FC<
  PropsWithChildren & ComponentProps<typeof MapLibre>
> = ({ children, style, ...props }) => (
  <MapLibre
    attributionControl={false}
    mapStyle="/maps/style.json"
    style={{
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      position: "absolute",
      ...style,
    }}
    {...props}
  >
    {children}
  </MapLibre>
);

interface SplittedMapsProps {
  left: ReactNode;
  right: ReactNode;
  viewState: MapViewState;
}

export const SplittedMaps: FC<SplittedMapsProps> = ({
  left,
  right,
  viewState: initialViewState = {},
}) => {
  const [leftRef, leftSize] = useMeasure<HTMLDivElement | null>();

  const [rightRef, rightSize] = useMeasure<HTMLDivElement | null>();

  const [viewState, setViewState] = useState(initialViewState);

  /**
   * Two maps could be firing 'move' events at the same time, if the user interacts with one
   * while the other is in transition.
   * This state specifies which map to use as the source of truth
   * It is set to the map that received user input last ('movestart')
   */
  const [activeMap, setActiveMap] = useState<"left" | "right">("left");

  return (
    <ResizablePanelGroup direction="horizontal" className="z-[100]">
      <ResizablePanel>
        <div ref={leftRef} className="relative size-full">
          <SingleMaps
            id="left-map"
            {...viewState}
            {...(activeMap === "left" && {
              onMove: (evt) => setViewState(evt.viewState),
            })}
            padding={{
              top: 0,
              right: 0,
              left: leftSize.width || 0,
              bottom: 0,
            }}
            onMoveStart={() => setActiveMap("left")}
          >
            {left}
          </SingleMaps>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div ref={rightRef} className="relative size-full">
          <SingleMaps
            id="right-map"
            {...viewState}
            {...(activeMap === "right" && {
              onMove: (evt) => setViewState(evt.viewState),
            })}
            onMoveStart={() => setActiveMap("right")}
            padding={{
              top: 0,
              left: 0,
              bottom: 0,
              right: rightSize.width || 0,
            }}
          >
            {right}
          </SingleMaps>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
