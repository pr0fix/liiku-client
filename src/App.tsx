import { useCallback, useEffect, useState } from "react";
import MapContainer from "./components/Map";
import type { Vehicle } from "./utils/types";
import type { ConnectionStatus } from "./services/websocketService";
import { WebSocketService } from "./services/websocketService";

const App = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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

  return (
    <>
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
      <MapContainer vehicles={vehicles} loading={loading} />
    </>
  );
};

export default App;
