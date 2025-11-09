import {
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  Popup,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { memo, useState, type FC } from "react";
import { DEFAULT_LAT, DEFAULT_LON } from "../utils/constants";
import type { Vehicle } from "../utils/types";
import { useVehicleAnimation } from "../hooks/useVehicleAnimation";

interface MapContainerProps {
  vehicles: Vehicle[];
  loading: boolean;
}

const MapContainer: FC<MapContainerProps> = memo(
  ({ vehicles, loading }: MapContainerProps) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const animatedVehicles = useVehicleAnimation(vehicles);
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
      null
    );

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
        <NavigationControl
          visualizePitch
          visualizeRoll
          position="bottom-right"
        />
        {!loading &&
          animatedVehicles.map((vehicle) => (
            <Marker
              onClick={(e) => {
                console.log(
                  `You pressed ${vehicle.routeName} to ${vehicle.headsign}`
                );
                e.originalEvent.stopPropagation();
                setSelectedVehicleId(vehicle.vehicleId);
              }}
              key={vehicle.vehicleId}
              longitude={vehicle.animatedLongitude}
              latitude={vehicle.animatedLatitude}
              anchor="center"
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  background: "blue",
                  borderRadius: "50%",
                  border: "2px solid white",
                  boxShadow: "0 0 4px #0008",
                  cursor: "pointer",
                }}
              />
            </Marker>
          ))}
        {selectedVehicle && (
          <Popup
            anchor="top"
            latitude={selectedVehicle.latitude}
            longitude={selectedVehicle.longitude}
            onClose={() => setSelectedVehicleId(null)}
          >
            <div style={{ padding: "8px" }}>
              <strong>{selectedVehicle.routeName}</strong>
              <div>{selectedVehicle.headsign}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                Vehicle: {selectedVehicle.vehicleId}
              </div>
            </div>
          </Popup>
        )}
      </Map>
    );
  }
);

export default MapContainer;
