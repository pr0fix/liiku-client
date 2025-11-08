import { useEffect, useState } from "react";
import MapContainer from "./components/Map";
import { fetchTransitData } from "./services/transitService";
import type { Vehicle } from "./utils/types";

const App = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isFirstLoad = true;

    const getData = async () => {
      if (isFirstLoad) setLoading(true);
      const result = await fetchTransitData();
      if (result.error) {
        setError(result.error);
        if (isFirstLoad) {
          setVehicles([]);
        }
      } else {
        setError(null);
        setVehicles(result.vehicles);
      }
      if (isFirstLoad) {
        setLoading(false);
        isFirstLoad = false;
      }
    };

    getData();

    const interval = setInterval(getData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg z-[1000] shadow-lg">
          {error}
        </div>
      )}
      <MapContainer vehicles={vehicles} loading={loading} />
    </>
  );
};

export default App;
