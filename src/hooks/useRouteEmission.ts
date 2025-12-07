import axios from "axios";
import { useEffect, useState } from "react";
import { VITE_API_URL } from "../utils/constants";

interface Emission {
  routeId: string;
  avgCO2: number;
  avgPassengers: string;
  co2PerPassengerKm: number;
  vehicleType: string;
}

export const useRouteEmission = (routeId: string | null) => {
  const [emissions, setEmissions] = useState<Emission>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (routeId === null) {
      setEmissions(undefined);
      return;
    }

    const fetchEmissions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Emission>(`${VITE_API_URL}/emission/${routeId}`);
        setEmissions(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch emissions");
        setEmissions(undefined);
      } finally {
        setLoading(false);
      }
    };
    fetchEmissions();
  }, [routeId]);
  return { emissions, loading, error };
};
