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

export type { Vehicle };
