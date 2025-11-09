import { GeolocateControl, Map, Marker, NavigationControl, Popup } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { memo, useState, type FC } from "react";
import { DEFAULT_LAT, DEFAULT_LON } from "../utils/constants";
import type { Vehicle } from "../utils/types";
import { useVehicleAnimation } from "../hooks/useVehicleAnimation";
import { VehiclePopupContent } from "./VehiclePopupContent";

interface MapContainerProps {
  vehicles: Vehicle[];
  loading: boolean;
}

const VEHICLE_COLORS: Record<string, string> = {
  bus: "#0000BF",
  tram: "#008741",
  metro: "#FD4F00",
  rail: "#8C4799",
  ferry: "#9FC9EB",
};

const getVehicleColor = (vehicleType: string): string => {
  return VEHICLE_COLORS[vehicleType] || "#3B82F6";
};

const MapContainer: FC<MapContainerProps> = memo(({ vehicles, loading }: MapContainerProps) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const animatedVehicles = useVehicleAnimation(vehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const selectedVehicle = selectedVehicleId
    ? vehicles.find((v) => v.vehicleId === selectedVehicleId)
    : null;

  return (
    <Map
      initialViewState={{
        latitude: DEFAULT_LAT,
        longitude: DEFAULT_LON,
        zoom: 14,
        pitch: 60,
      }}
      style={{ width: windowWidth, height: windowHeight }}
      mapStyle="/styles/map.json"
    >
      <GeolocateControl position="bottom-right" />
      <NavigationControl visualizePitch visualizeRoll position="bottom-right" />
      {!loading &&
        animatedVehicles.map((vehicle) => (
          <Marker
            key={vehicle.vehicleId}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedVehicleId(vehicle.vehicleId);
              console.log(vehicle.vehicleType)
            }}
            longitude={vehicle.animatedLongitude}
            latitude={vehicle.animatedLatitude}
            anchor="center"
            rotation={vehicle.bearing}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderBottom: `20px solid ${getVehicleColor(vehicle.vehicleType)}`,
                cursor: "pointer",
                filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))",
              }}
            />
          </Marker>
        ))}
      {selectedVehicle && (
        <Popup
          anchor="bottom"
          latitude={selectedVehicle.latitude}
          longitude={selectedVehicle.longitude}
          onClose={() => setSelectedVehicleId(null)}
        >
          <VehiclePopupContent vehicle={selectedVehicle} />
        </Popup>
      )}
    </Map>
  );
});

export default MapContainer;
