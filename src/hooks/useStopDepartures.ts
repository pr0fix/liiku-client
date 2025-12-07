import { useEffect, useState } from "react";
import type { StopWithDepartures } from "../utils/types";
import axios from "axios";
import { VITE_API_URL } from "../utils/constants";

export const useStopDepartures = (stopId: string | null) => {
  const [stop, setStop] = useState<StopWithDepartures | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (stopId === null) {
      setStop(null);
      return;
    }

    const fetchStop = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<StopWithDepartures>(
          `${VITE_API_URL}/stops/${stopId}`
        );
        setStop(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : `Failed to fetch stop ${stopId}`
        );
        setStop(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStop();
  }, [stopId]);

  return { stop, loading, error };
};
