import {
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { FC } from "react";
import { DEFAULT_LAT, DEFAULT_LON } from "../utils/constants";
import type { BusPosition } from "../utils/types";

interface MapContainerProps {
  buses: BusPosition[];
  loading: boolean;
}

const MapContainer: FC<MapContainerProps> = ({ buses, loading }) => {
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
        buses.map((bus) => (
          <Marker
            key={bus.id}
            longitude={bus.longitude}
            latitude={bus.latitude}
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
              title={`Bus ${bus.id} (${bus.speed}) km/h`}
            />
          </Marker>
        ))}
    </Map>
  );
};

export default MapContainer;
