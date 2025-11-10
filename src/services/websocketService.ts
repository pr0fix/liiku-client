import type { ConnectionStatus, Vehicle, VehicleChanges, WebSocketMessage } from "../utils/types";


export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private heartbeatInterval: number | null = null;
  private vehicles: Map<string, Vehicle> = new Map();

  onVehiclesUpdate?: (vehicles: Vehicle[]) => void;
  onStatusChange?: (status: ConnectionStatus) => void;
  onError?: (error: string) => void;

  connect(url: string) {
    this.ws = new WebSocket(url);
    this.onStatusChange?.("connecting");

    this.ws.onopen = () => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
      this.onStatusChange?.("connected");
      this.startHeartbeat();
    };

    this.ws.onmessage = (event) => {
      this.handleMessage(JSON.parse(event.data));
    };

    this.ws.onclose = () => {
      console.log("WebSocket disconnected");
      this.onStatusChange?.("disconnected");
      this.stopHeartbeat();
      this.attemptReconnect(url);
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.onStatusChange?.("error");
      this.onError?.("Connection error");
    };
  }

  private handleMessage(message: WebSocketMessage) {
    switch (message.type) {
      case "initial": {
        this.vehicles.clear();
        const initialData = message.data as Vehicle[];
        initialData.forEach((vehicle: Vehicle) => {
          this.vehicles.set(vehicle.vehicleId, vehicle);
        });
        this.onVehiclesUpdate?.([...this.vehicles.values()]);
        break;
      }

      case "update": {
        const changes = message.data as VehicleChanges;

        changes.added.forEach((vehicle) => {
          this.vehicles.set(vehicle.vehicleId, vehicle);
        });

        changes.updated.forEach((vehicle) => {
          this.vehicles.set(vehicle.vehicleId, vehicle);
        });

        changes.removed.forEach((id) => {
          this.vehicles.delete(id);
        });

        this.onVehiclesUpdate?.([...this.vehicles.values()]);
        break;
      }

      case "error":
        console.error("Server error:", message.message);
        this.onError?.(message.message || "Unknown server error");
        break;

      case "pong":
        break;

      default:
        console.warn("Unknown message type:", message.type);
        break;
    }
  }

  private attemptReconnect(url: string) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Maximum amount of reconnection attempts reached");
      this.onError?.("Failed to reconnect to server");
      return;
    }
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts);
    this.reconnectAttempts++;

    console.log(`Reconnecting in ${delay}ms... (attempt ${this.reconnectAttempts})`);

    setTimeout(() => {
      this.connect(url);
    }, delay);
  }

  private startHeartbeat() {
    this.heartbeatInterval = window.setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: "ping" }));
      }
    }, 30000);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  disconnect() {
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.vehicles.clear();
  }
}
