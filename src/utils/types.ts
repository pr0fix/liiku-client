interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
}

interface Vehicle {
  vehicleId: string;
  timestamp: string;
  stopName: string;
  stopId: string;
  startTime: string;
  speed: number;
  routeDesc: string;
  routeName: string;
  routeLongName: string;
  routeId: string;
  occupancyStatus: string;
  longitude: number;
  latitude: number;
  headsign: string;
  directionId: number;
  currentStatus: number;
  bearing: number;
}
interface TransitDataResult {
  vehicles: Vehicle[];
  error?: string;
}

export type { ApiResponse, Vehicle, TransitDataResult };
