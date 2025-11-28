import { useMemo } from "react";
import Supercluster from "supercluster";
import type { Vehicle, ViewportBounds } from "../utils/types";

type ClusterFeature = Supercluster.PointFeature<{
  cluster: true;
  cluster_id: number;
  point_count: number;
  point_count_abbreviated: string | number;
}>;

type VehicleFeature = Supercluster.PointFeature<{
  cluster?: false;
  vehicleId: string;
  routeName: string;
  vehicleType: string;
  bearing: number;
}>;

export type ClusterOrVehicle = ClusterFeature | VehicleFeature;

export const useClustering = (vehicles: Vehicle[], bounds: ViewportBounds | null, zoom: number) => {
  const points: VehicleFeature[] = useMemo(
    () =>
      vehicles.map((v) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [v.longitude, v.latitude],
        },
        properties: {
          cluster: false,
          vehicleId: v.vehicleId,
          routeName: v.routeName,
          vehicleType: v.vehicleType,
          bearing: v.bearing,
        },
      })),
    [vehicles]
  );

  const supercluster = useMemo(() => {
    const sc = new Supercluster({
      radius: 50,
      maxZoom: 15,
      minPoints: 2,
    });
    sc.load(points);
    return sc;
  }, [points]);

  const clusters = useMemo(() => {
    if (!bounds) return [] as ClusterOrVehicle[];
    return supercluster.getClusters(
      [bounds.west, bounds.south, bounds.east, bounds.north],
      Math.round(zoom)
    ) as ClusterOrVehicle[];
  }, [supercluster, bounds, zoom]);

  return { clusters, supercluster };
};
