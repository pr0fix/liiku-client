import { Marker } from "@vis.gl/react-maplibre";
import type { FC } from "react";

interface ClusterMarkerProps {
  longitude: number;
  latitude: number;
  count: number;
  onClick: () => void;
}

export const ClusterMarker: FC<ClusterMarkerProps> = ({ longitude, latitude, count, onClick }) => (
  <Marker
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
