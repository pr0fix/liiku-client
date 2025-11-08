import {
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { FC } from "react";
import { DEFAULT_LAT, DEFAULT_LON } from "../utils/constants";
import type { Vehicle } from "../utils/types";

interface MapContainerProps {
  vehicles: Vehicle[];
  loading: boolean;
}

const MapContainer: FC<MapContainerProps> = ({ vehicles, loading }) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
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
        vehicles.map((vehicle) => (
          <Marker
          onClick={() => console.log(`You pressed ${vehicle.routeName} to ${vehicle.headsign}`)}
            key={vehicle.vehicleId}
            longitude={vehicle.longitude}
            latitude={vehicle.latitude}
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
              }}
              title={`Bus ${vehicle.vehicleId} (${vehicle.speed}) km/h`}
            />
          </Marker>
        ))}
    </Map>
  );
};

export default MapContainer;
