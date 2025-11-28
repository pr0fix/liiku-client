const VEHICLE_COLORS: Record<string, string> = {
  bus: "#0000BF",
  tram: "#008741",
  trunk: "#FD4F00",
  metro: "#FD4F00",
  rail: "#8C4799",
  lightrail: "#007E79",
  ferry: "#9FC9EB",
};
export const getVehicleColor = (vehicleType: string): string =>
  VEHICLE_COLORS[vehicleType] || "#3B82F6";
