import axios from "axios";
import { useEffect, useState } from "react";
import { VITE_SHAPE_API_URL } from "../utils/constants";

interface Coordinate {
  lat: number;
  lon: number;
}

interface ShapeResponse {
  routeId: string;
  directionId: number;
  coordinates: Coordinate[];
}

export const useRouteShape = (routeId: string | null, directionId: number | null) => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (routeId === null || directionId === null) {
      setCoordinates([]);
      return;
    }

    const fetchShape = async () => {
      console.log("Fetching shape for:", routeId, directionId);
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<ShapeResponse>(
          `${VITE_SHAPE_API_URL}/shape/${routeId}/${directionId}`
        );

        setCoordinates(response.data.coordinates);
        console.log(response.data.coordinates);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch shape");
        setCoordinates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShape();
  }, [routeId, directionId]);
  return { coordinates, loading, error };
};
