import type { FC } from "react";
import type { Vehicle } from "../../utils/types";
import { useRouteEmission } from "../../hooks/useRouteEmission";

interface VehiclePopupContentProps {
  vehicle: Vehicle;
}

const getEmissionLevel = (co2PerPassengerKm: number): { label: string; color: string } => {
  if (co2PerPassengerKm < 50) return { label: "Low", color: "text-green-600" };
  if (co2PerPassengerKm < 100) return { label: "Medium", color: "text-yellow-600" };
  return { label: "High", color: "text-red-600" };
};

export const VehiclePopupContent: FC<VehiclePopupContentProps> = ({ vehicle }) => {
  const { emissions, loading, error } = useRouteEmission(vehicle?.routeId ?? null);
  const emissionLevel = emissions ? getEmissionLevel(emissions.co2PerPassengerKm) : null;

  return (
    <div className="p-3 min-w-48">
      <div className="flex items-center gap-3 mb-2">
        <p className="text-2xl font-bold">{vehicle.routeName}</p>
        <p className="text-lg text-gray-600">{vehicle.headsign}</p>
      </div>

      {vehicle.occupancyStatus && (
        <p className="text-sm text-gray-500 mb-1">{vehicle.occupancyStatus}</p>
      )}

      {vehicle.speed && <p className="text-sm text-gray-500 mb-3">{vehicle.speed}</p>}

      {loading && <p className="text-sm text-gray-400">Loading emissions...</p>}

      {error && <p className="text-sm text-red-500">Failed to load emissions</p>}

      {emissions && emissionLevel && (
        <div className="border-t pt-2 mt-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500 uppercase">Emissions</p>
            <span className={`text-xs font-medium ${emissionLevel.color}`}>
              {emissionLevel.label}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-xl font-bold ${emissionLevel.color}`}>
              {Math.round(emissions.co2PerPassengerKm)}
            </span>
            <span className="text-sm text-gray-500">g CO₂/passenger/km</span>
          </div>
        </div>
      )}
    </div>
  );
};
