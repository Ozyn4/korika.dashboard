import { useEffect } from "react";
import initWasm from "parquet-wasm/esm/arrow2";
import { Dashboard } from "./components/dashboard";

function App() {
  useEffect(() => {
    const loadWasm = async () => {
      await initWasm();
    };
    loadWasm();
  }, []);

  return (
    <div className="relative h-svh w-full">
      <Dashboard />
    </div>
  );
}

export default App;
