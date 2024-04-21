import { useCallback, useRef, useState } from "react";

type Size = {
  width: number | null;
  height: number | null;
};

export const useMeasure = <T extends Element | null>(): [
  React.RefCallback<T>,
  Size,
] => {
  const [dimensions, setDimensions] = useState<Size>({
    width: null,
    height: null,
  });

  const previousObserver = useRef<ResizeObserver | null>(null);

  const customRef = useCallback((node: T) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();

      previousObserver.current = null;
    }

    if (node?.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } =
            entry.borderBoxSize[0];

          setDimensions({ width, height });
        }
      });

      observer.observe(node);

      previousObserver.current = observer;
    }
  }, []);

  return [customRef, dimensions];
};
