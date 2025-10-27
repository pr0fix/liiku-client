import { useEffect, useState } from "react";
import MapContainer from "./components/Map";
import { fetchTransitData } from "./services/transitService";
import type { BusPosition } from "./utils/types";

const App = () => {
  const [buses, setBuses] = useState<BusPosition[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isFirstLoad = true;

    const getData = async () => {
      if (isFirstLoad) setLoading(true);
      const data = await fetchTransitData();
      setBuses(data);
      if (isFirstLoad) {
        setLoading(false);
        isFirstLoad = false;
      }
    };
    getData();

    const interval = setInterval(getData, 1000);
    return () => clearInterval(interval);
  }, []);

  return <MapContainer buses={buses} loading={loading} />;
};

export default App;
