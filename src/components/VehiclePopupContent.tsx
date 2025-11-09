import type { FC } from "react";
import type { Vehicle } from "../utils/types";

interface VehiclePopupContentProps {
  vehicle: Vehicle;
}

export const VehiclePopupContent: FC<VehiclePopupContentProps> = ({ vehicle }) => (
  <div className="p-2">
    <div className="flex text-center items-center gap-3">
      <p className="text-2xl font-bold">{vehicle.routeName}</p>
      <p className="text-lg">{vehicle.headsign}</p>
    </div>
    {vehicle.occupancyStatus && <p>{vehicle.occupancyStatus}</p>}
  </div>
);
