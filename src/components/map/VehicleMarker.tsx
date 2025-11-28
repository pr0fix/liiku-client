import { Marker } from "@vis.gl/react-maplibre";
import type { FC } from "react";
import { getVehicleColor } from "../../utils/vehicleColors";

interface VehicleMarkerProps {
  vehicleId: string;
  longitude: number;
  latitude: number;
  bearing: number;
  routeName: string;
  vehicleType: string;
  onClick: () => void;
}

export const VehicleMarker: FC<VehicleMarkerProps> = ({
  vehicleId,
  longitude,
  latitude,
  bearing,
  routeName,
  vehicleType,
  onClick,
}) => (
  <Marker
    key={vehicleId}
    longitude={longitude}
    latitude={latitude}
    anchor="center"
    rotation={bearing}
    onClick={(e) => {
      e.originalEvent.stopPropagation();
      onClick();
    }}
  >
    <div
      style={{
        width: 0,
        height: 0,
        borderRadius: "100%",
        border: "12px solid white",
        cursor: "pointer",
        filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))",
        boxShadow: `0 0 0 3px ${getVehicleColor(vehicleType)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: routeName.length > 3 ? "9px" : "12px",
        fontWeight: "bold",
        color: "black",
        position: "relative",
      }}
    >
      <span style={{ transform: `rotate(${-bearing}deg)`, display: "inline-block" }}>
        {routeName}
      </span>
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
