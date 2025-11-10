interface Vehicle {
  vehicleId: string;
  routeId: string;
  routeName: string;
  routeLongName: string;
  directionId: number;
  headsign: string;
  latitude: number;
  longitude: number;
  bearing: number;
  speed: number;
  timestamp: string;
  stopId: string;
  stopName: string;
  currentStatus: number;
  occupancyStatus: string;
  startTime: string;
  vehicleType: string;
}

interface AnimatedVehicle extends Vehicle {
  animatedLatitude: number;
  animatedLongitude: number;
}

interface VehicleChanges {
  updated: Vehicle[];
  added: Vehicle[];
  removed: string[];
}

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

interface WebSocketMessage {
  type: "initial" | "update" | "error" | "pong";
  data?: Vehicle[] | VehicleChanges;
  message?: string;
  timestamp?: number;
}

export type { Vehicle, AnimatedVehicle, ConnectionStatus, VehicleChanges, WebSocketMessage };
