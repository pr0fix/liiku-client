import {
  GeolocateControl,
  Map as MapGL,
  Marker,
  NavigationControl,
  Popup,
  useMap,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Supercluster from "supercluster";
import { memo, useCallback, useEffect, useMemo, useState, type FC } from "react";
import { DEFAULT_LAT, DEFAULT_LON } from "../utils/constants";
import type { Vehicle, ViewportBounds } from "../utils/types";
import { useVehicleAnimation } from "../hooks/useVehicleAnimation";
import { VehiclePopupContent } from "./VehiclePopupContent";
import { useViewportFiltering } from "../hooks/useViewportFiltering";

interface MapContainerProps {
  vehicles: Vehicle[];
  loading: boolean;
  shouldAnimate: boolean;
}

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

const VEHICLE_COLORS: Record<string, string> = {
  bus: "#0000BF",
  tram: "#008741",
  trunk: "#FD4F00",
  metro: "#FD4F00",
  rail: "#8C4799",
  lightrail: "#007E79",
  ferry: "#9FC9EB",
};

const getVehicleColor = (vehicleType: string): string => VEHICLE_COLORS[vehicleType] || "#3B82F6";

const MapContent: FC<{ vehicles: Vehicle[]; loading: boolean; shouldAnimate: boolean }> = memo(
  ({ vehicles, loading, shouldAnimate }) => {
    const animatedVehicles = useVehicleAnimation(vehicles, shouldAnimate);

    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
    const [zoom, setZoom] = useState<number>(14);
    const [bounds, setBounds] = useState<ViewportBounds | null>(null);
    const { current: map } = useMap();

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

    if (!map) return null;

    const mapBounds = map.getBounds();
    const viewportBounds: ViewportBounds = {
      north: mapBounds.getNorth(),
      south: mapBounds.getSouth(),
      east: mapBounds.getEast(),
      west: mapBounds.getWest(),
    };

    const animatedVehiclesInViewport = useViewportFiltering(animatedVehicles, viewportBounds);

    const animatedById = useMemo(() => {
      const m = new Map<string, (typeof animatedVehiclesInViewport)[number]>();
      for (const v of animatedVehiclesInViewport) {
        m.set(v.vehicleId, v);
      }
      return m;
    }, [animatedVehiclesInViewport]);

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
        minPoints: 4,
      });
      sc.load(points);
      return sc;
    }, [points]);

    const clusters = useMemo(() => {
      if (!bounds) return [] as (ClusterFeature | VehicleFeature)[];
      return supercluster.getClusters(
        [bounds.west, bounds.south, bounds.east, bounds.north],
        Math.round(zoom)
      ) as (ClusterFeature | VehicleFeature)[];
    }, [supercluster, bounds, zoom]);

    const onClusterClick = useCallback(
      (cluster: ClusterFeature) => {
        if (!map) return;
        const expansionZoom = supercluster.getClusterExpansionZoom(cluster.properties.cluster_id);
        const [lng, lat] = cluster.geometry.coordinates as [number, number];
        map.easeTo({ center: [lng, lat], zoom: expansionZoom });
      },
      [map, supercluster]
    );

    const selectedVehicle = useMemo(
      () =>
        selectedVehicleId ? animatedVehicles.find((v) => v.vehicleId === selectedVehicleId) : null,
      [selectedVehicleId, animatedVehicles]
    );

    return (
      <>
        <GeolocateControl position="bottom-right" />
        <NavigationControl visualizePitch visualizeRoll position="bottom-right" />

        {!loading &&
          clusters.map((feature) => {
            if (feature.properties.cluster) {
              const [lng, lat] = feature.geometry.coordinates as [number, number];
              const count = feature.properties.point_count;
              return (
                <Marker
                  key={`cluster-${feature.properties.cluster_id}`}
                  longitude={lng}
                  latitude={lat}
                  anchor="center"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    onClusterClick(feature as ClusterFeature);
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: "#2563EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      boxShadow: "0 0 6px rgba(0,0,0,0.4)",
                      cursor: "pointer",
                    }}
                  >
                    {count}
                  </div>
                </Marker>
              );
            }

            const { vehicleId, routeName, vehicleType, bearing } =
              feature.properties as VehicleFeature["properties"];

            const animated = animatedById.get(vehicleId);
            if (!animated) return null;

            const lng = animated.animatedLongitude;
            const lat = animated.animatedLatitude;

            return (
              <Marker
                key={vehicleId}
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedVehicleId(vehicleId);
                }}
                longitude={lng}
                latitude={lat}
                anchor="center"
                rotation={bearing}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderRadius: "100%",
                    border: `12px solid white`,
                    cursor: "pointer",
                    filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))",
                    boxShadow: `0 0 0 3px ${getVehicleColor(vehicleType)}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: `${routeName.length > 3 ? "9px" : "12px"}`,
                    fontWeight: "bold",
                    color: "black",
                    position: "relative",
                  }}
                >
                  {routeName}
                  <div
                    style={{
                      position: "absolute",
                      top: "-18px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderBottom: `6px solid ${getVehicleColor(vehicleType)}`,
                    }}
                  />
                </div>
              </Marker>
            );
          })}

        {selectedVehicle && (
          <Popup
            anchor="bottom"
            latitude={selectedVehicle.animatedLatitude}
            longitude={selectedVehicle.animatedLongitude}
            onClose={() => setSelectedVehicleId(null)}
            offset={15}
          >
            <VehiclePopupContent vehicle={selectedVehicle} />
          </Popup>
        )}
      </>
    );
  }
);

const MapContainer: FC<MapContainerProps> = memo(({ vehicles, loading, shouldAnimate }) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  return (
    <MapGL
      initialViewState={{
        latitude: DEFAULT_LAT,
        longitude: DEFAULT_LON,
        zoom: 14,
        pitch: 60,
      }}
      style={{ width: windowWidth, height: windowHeight }}
      mapStyle="/styles/map.json"
    >
      <MapContent vehicles={vehicles} loading={loading} shouldAnimate={shouldAnimate} />
    </MapGL>
  );
});

export default MapContainer;
