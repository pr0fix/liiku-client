import { useMemo } from "react";
import type { AnimatedVehicle, ViewportBounds } from "../utils/types";

export const useViewportFiltering = (
  vehicles: AnimatedVehicle[],
  viewportBounds: ViewportBounds
) => {
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      return (
        vehicle.animatedLatitude <= viewportBounds.north &&
        vehicle.animatedLatitude >= viewportBounds.south &&
        vehicle.animatedLongitude <= viewportBounds.east &&
        vehicle.animatedLongitude >= viewportBounds.west
      );
    });
  }, [vehicles, viewportBounds]);

  return filteredVehicles;
};
