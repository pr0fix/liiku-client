import "maplibre-gl/dist/maplibre-gl.css";
import { Map as MapGL, type MapRef } from "@vis.gl/react-maplibre";
import { memo, useEffect, useRef, type FC } from "react";
import { DEFAULT_LAT, DEFAULT_LON } from "../utils/constants";
import type { Vehicle } from "../utils/types";
import { MapContent } from "./map/MapContent";

interface MapContainerProps {
  vehicles: Vehicle[];
  loading: boolean;
  shouldAnimate: boolean;
}

const MapContainer: FC<MapContainerProps> = memo(({ vehicles, loading, shouldAnimate }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  useEffect(() => {
    if (!containerRef.current || !mapRef.current) return;

    const observer = new ResizeObserver(() => {
      mapRef.current?.resize();
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <MapGL
        ref={mapRef}
        initialViewState={{
          latitude: DEFAULT_LAT,
          longitude: DEFAULT_LON,
          zoom: 14,
          pitch: 60,
        }}
        style={{ width: windowWidth, height: windowHeight }}
        mapStyle="/styles/map.json"
      >
        <MapContent vehicles={vehicles} loading={loading} shouldAnimate={shouldAnimate} />
      </MapGL>
    </div>
  );
});

export default MapContainer;
