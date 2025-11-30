import { GeolocateControl, NavigationControl, Popup, useMap } from "@vis.gl/react-maplibre";
import { memo, useCallback, useEffect, useMemo, useState, type FC } from "react";
import { useVehicleAnimation } from "../../hooks/useVehicleAnimation";
import { useRouteShape } from "../../hooks/useRouteShape";
import { useClustering } from "../../hooks/useClustering";
import type { Vehicle, ViewportBounds } from "../../utils/types";
import { VehiclePopupContent } from "./VehiclePopupContent";
import { ClusterMarker } from "./ClusterMarker";
import { VehicleMarker } from "./VehicleMarker";
import { RouteLineLayer } from "./RouteLineLayer";
import { getVehicleColor } from "../../utils/vehicleColors";

interface MapContentProps {
  vehicles: Vehicle[];
  loading: boolean;
  shouldAnimate: boolean;
}

export const MapContent: FC<MapContentProps> = memo(({ vehicles, loading, shouldAnimate }) => {
  const animatedVehicles = useVehicleAnimation(vehicles, shouldAnimate);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(14);
  const [bounds, setBounds] = useState<ViewportBounds | null>(null);
  const { current: map } = useMap();

  const vehicleMaps = useMemo(() => {
    const animatedById = new Map<string, (typeof animatedVehicles)[number]>();
    const vehiclesById = new Map<string, Vehicle>();

    for (const v of animatedVehicles) {
      animatedById.set(v.vehicleId, v);
    }
    for (const v of vehicles) {
      vehiclesById.set(v.vehicleId, v);
    }

    return { animatedById, vehiclesById };
  }, [animatedVehicles, vehicles]);

  const selectedVehicle = useMemo(
    () => (selectedVehicleId ? vehicleMaps.animatedById.get(selectedVehicleId) ?? null : null),
    [selectedVehicleId, vehicleMaps.animatedById]
  );

  const selectedRoute = useMemo(
    () =>
      selectedVehicle
        ? { routeId: selectedVehicle.routeId, directionId: selectedVehicle.directionId }
        : null,
    [selectedVehicle]
  );

  const { coordinates: routeShape } = useRouteShape(
    selectedRoute?.routeId ?? null,
    selectedRoute?.directionId ?? null
  );

  useEffect(() => {
    if (!map) return;

    const updateView = () => {
      const b = map.getBounds();
      setZoom(map.getZoom());
      setBounds({
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest(),
      });
    };

    updateView();
    map.on("moveend", updateView);
    return () => {
      map.off("moveend", updateView);
    };
  }, [map]);

  const { clusters, supercluster } = useClustering(vehicles, bounds, zoom);

  const handleVehicleSelect = useCallback((vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
  }, []);

  const handlePopupClose = useCallback(() => {
    setSelectedVehicleId(null);
  }, []);

  const handleClusterClick = useCallback(
    (clusterId: number, coordinates: [number, number]) => {
      if (!map || !supercluster) return;
      const expansionZoom = supercluster.getClusterExpansionZoom(clusterId);
      map.easeTo({ center: coordinates, zoom: expansionZoom });
    },
    [map, supercluster]
  );

  const routeLineColor = useMemo(
    () => (selectedVehicle ? getVehicleColor(selectedVehicle.vehicleType) : "#3B82F6"),
    [selectedVehicle]
  );

  if (!map) return null;

  const showOnlySelected = selectedVehicleId !== null;

  return (
    <>
      <GeolocateControl position="bottom-right" />
      <NavigationControl visualizePitch visualizeRoll position="bottom-right" />

      {!loading &&
        !showOnlySelected &&
        clusters.map((feature) => {
          if (feature.properties.cluster) {
            const [lng, lat] = feature.geometry.coordinates as [number, number];
            const clusterId = feature.properties.cluster_id as number;
            const pointCount = feature.properties.point_count as number;
            return (
              <ClusterMarker
                key={`cluster-${clusterId}`}
                longitude={lng}
                latitude={lat}
                count={pointCount}
                onClick={() => handleClusterClick(clusterId, [lng, lat])}
              />
            );
          }

          const { vehicleId, routeName, vehicleType, bearing } = feature.properties;
          const animated = vehicleMaps.animatedById.get(vehicleId);
          if (!animated) return null;

          return (
            <VehicleMarker
              key={vehicleId}
              vehicleId={vehicleId}
              longitude={animated.animatedLongitude}
              latitude={animated.animatedLatitude}
              bearing={bearing}
              routeName={routeName}
              vehicleType={vehicleType}
              onClick={() => handleVehicleSelect(vehicleId)}
            />
          );
        })}

      {selectedVehicle && (
        <>
          <VehicleMarker
            key={`selected-${selectedVehicle.vehicleId}`}
            vehicleId={selectedVehicle.vehicleId}
            longitude={selectedVehicle.animatedLongitude}
            latitude={selectedVehicle.animatedLatitude}
            bearing={selectedVehicle.bearing}
            routeName={selectedVehicle.routeName}
            vehicleType={selectedVehicle.vehicleType}
            onClick={() => {}}
          />
          <Popup
            anchor="bottom"
            latitude={selectedVehicle.animatedLatitude}
            longitude={selectedVehicle.animatedLongitude}
            onClose={handlePopupClose}
            offset={15}
          >
            <VehiclePopupContent vehicle={selectedVehicle} />
          </Popup>
        </>
      )}

      <RouteLineLayer coordinates={routeShape} color={routeLineColor} />
    </>
  );
});
