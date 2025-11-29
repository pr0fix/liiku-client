import { useCallback, useEffect, useMemo, useState } from "react";
import MapContainer from "./components/map/Map";
import type { ConnectionStatus, Vehicle } from "./utils/types";
import { WebSocketService } from "./services/websocketService";
import { Search } from "./components/Search";
import { Filter } from "./components/Filter";

const App = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  const handleVehiclesUpdate = useCallback(
    (newVehicles: Vehicle[]) => {
      setVehicles(newVehicles);
      if (isInitialLoad) {
        setLoading(false);
        setIsInitialLoad(false);
      }
      setError(null);
    },
    [isInitialLoad]
  );

  const handleStatusChange = useCallback((status: ConnectionStatus) => {
    setConnectionStatus(status);
    console.log("Connection status:", status);
  }, []);

  const handleError = useCallback((errorMsg: string) => {
    setError(errorMsg);
    console.error("WebSocket error:", errorMsg);
  }, []);

  useEffect(() => {
    const wsService = new WebSocketService();

    wsService.onVehiclesUpdate = handleVehiclesUpdate;
    wsService.onStatusChange = handleStatusChange;
    wsService.onError = handleError;

    wsService.connect("ws://localhost:3000");

    return () => {
      wsService.disconnect();
    };
  }, [handleVehiclesUpdate, handleStatusChange, handleError]);

  // Handle tab changes with a websocet reconnect to prevent map markers from flying around :D
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setShouldAnimate(false);

        setTimeout(() => {
          setShouldAnimate(true);
        }, 100);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const filteredVehicles = useMemo(() => {
    let result = vehicles;
    if (searchQuery) {
      result = result.filter((v) => v.routeName.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedRoutes.length > 0) {
      result = result.filter((v) => selectedRoutes.includes(v.routeName));
    }
    return result;
  }, [vehicles, searchQuery, selectedRoutes]);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="fixed top-5 right-5 z-[1000]">
        <div
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            connectionStatus === "connected"
              ? "bg-green-500"
              : connectionStatus === "connecting"
              ? "bg-yellow-500"
              : connectionStatus === "error"
              ? "bg-red-500"
              : "bg-gray-500"
          }`}
        >
          {connectionStatus === "connected"
            ? "🟢 Connected"
            : connectionStatus === "connecting"
            ? "🟡 Connecting..."
            : connectionStatus === "error"
            ? "🔴 Error"
            : "⚫ Disconnected"}
        </div>
      </div>
      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg z-[1000] shadow-lg">
          {error}
        </div>
      )}

      <div className="fixed top-20 right-5 z-[1000] bg-blue-500 text-white px-4 py-2 rounded-lg">
        Vehicles: {vehicles.length}
      </div>
      <div className="fixed top-5 left-5 z-[1000] ">
        <Search query={searchQuery} onQueryChange={setSearchQuery} />
      </div>
      <div className="fixed top-5 left-64 z-[1000] ">
        <Filter
          vehicles={vehicles}
          selectedRoutes={selectedRoutes}
          onSelectRoutes={setSelectedRoutes}
        />
      </div>
      <MapContainer vehicles={filteredVehicles} loading={loading} shouldAnimate={shouldAnimate} />
    </div>
  );
};

export default App;
