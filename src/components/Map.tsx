import {
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
} from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { memo, type FC } from "react";
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
              onClick={() =>
                console.log(
                  `You pressed ${vehicle.routeName} to ${vehicle.headsign}`
                )
              }
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
                }}
              />
            </Marker>
          ))}
      </Map>
    );
  }
);

export default MapContainer;
