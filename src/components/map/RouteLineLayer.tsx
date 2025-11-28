import { Layer, Source } from "@vis.gl/react-maplibre";
import type { FC } from "react";

interface Coordinate {
  lat: number;
  lon: number;
}

interface RouteLineLayerProps {
  coordinates: Coordinate[];
  color: string;
}

export const RouteLineLayer: FC<RouteLineLayerProps> = ({ coordinates, color }) => {
  if (coordinates.length === 0) return null;

  return (
    <Source
      id="route-line"
      type="geojson"
      data={{
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates.map((coord) => [coord.lon, coord.lat]),
        },
      }}
    >
      <Layer
        id="route-line-layer"
        type="line"
        paint={{
          "line-color": color,
          "line-width": 6,
          "line-opacity": 1,
        }}
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
      />
    </Source>
  );
};
