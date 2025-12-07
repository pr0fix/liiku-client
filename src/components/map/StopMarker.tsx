import { Marker } from "@vis.gl/react-maplibre";
import type { FC } from "react";

interface StopMarkerProps {
  stopId: string;
  longitude: number;
  latitude: number;
  stopName: string;
  onClick: () => void;
  isSelected: boolean;
  routeLineColor: string;
}

export const StopMarker: FC<StopMarkerProps> = ({
  stopId,
  longitude,
  latitude,
  stopName,
  onClick,
  isSelected,
  routeLineColor,
}) => (
  <Marker
    key={stopId}
    longitude={longitude}
    latitude={latitude}
    anchor="center"
    onClick={(e) => {
      e.originalEvent.stopPropagation();
      onClick();
    }}
  >
    <div
      style={{
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        backgroundColor: isSelected ? "#ef4444" : "#ffffff",
        border: `2px solid ${isSelected ? "#dc2626" : `${routeLineColor}`}`,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        fontWeight: "bold",
        color: isSelected ? "white" : "#3B82F6",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
      title={stopName}
    />
  </Marker>
);
