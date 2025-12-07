import { useEffect, useState } from "react";
import type { Stop } from "../utils/types";
import axios from "axios";
import { VITE_API_URL } from "../utils/constants";

// Call get all stops to show them on the map all at once

// Call stops/:stopid when you want to get the stop departures on the marker press

// Call stops/route/:routeId/:directionId when you press a vehicle marker
// and then map them onto the polyline

// Get stops within specific viewport bounds -> /stops/bounds

export const useRouteStops = (
  routeId: string | null,
  directionId: number | null
) => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (routeId === null || directionId === null) {
      setStops([]);
      return;
    }

    const fetchStops = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Stop[]>(
          `${VITE_API_URL}/stops/route/${routeId}/${directionId}`
        );
        setStops(response.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : `Failed to fetch stops for routeId: ${routeId} with directionId: ${directionId}`
        );
        setStops([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStops();
  }, [routeId, directionId]);
  return { stops, loading, error };
};
