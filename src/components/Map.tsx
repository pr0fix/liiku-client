import {
  GeolocateControl,
  Map,
  NavigationControl,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { FC } from "react";
import { DEFAULT_LAT, DEFAULT_LON } from "../utils/constants";

const MapContainer: FC = () => {
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
    </Map>
  );
};

export default MapContainer;
