import initWasm from "parquet-wasm/esm/arrow2";
import { FC, PropsWithChildren, useEffect, useState } from "react";

export const WasmWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadWasm = async () => {
      await initWasm();

      setLoaded(true);
    };
    loadWasm();
  }, []);

  return loaded ? <>{children}</> : null;
};
