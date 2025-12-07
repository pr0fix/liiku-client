import type { FC } from "react";
import type { StopWithDepartures } from "../../utils/types";

interface StopPopupContentProps {
  stop: StopWithDepartures;
  selectedRouteName?: string;
}

export const StopPopupContent: FC<StopPopupContentProps> = ({
  stop,
  selectedRouteName,
}) => {
  const upcomingDepartures = [...stop.departures]
    .filter((departure) => {
      // If a route is selected, only show departures for that route
      if (selectedRouteName) {
        return departure.route_name === selectedRouteName;
      }
      return true;
    })
    .sort((a, b) => {
      return a.departure_time.localeCompare(b.departure_time);
    });

  // Deduplicate by unique combination of time, route, and headsign
  const uniqueDepartures = upcomingDepartures.filter(
    (departure, index, self) => {
      return (
        index ===
        self.findIndex(
          (d) =>
            d.departure_time === departure.departure_time &&
            d.route_name === departure.route_name &&
            d.headsign === departure.headsign
        )
      );
    }
  );

  return (
    <div className="p-3 min-w-56">
      <h3 className="text-lg font-bold mb-3">{stop.name}</h3>

      {uniqueDepartures.length > 0 ? (
        <div className="space-y-2">
          {uniqueDepartures.slice(0, 5).map((departure, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div>
                <p className="font-bold text-sm">{departure.route_name}</p>
                <p className="text-xs text-gray-600">{departure.headsign}</p>
              </div>
              <p className="text-sm font-medium">
                {departure.departure_time.substring(0, 5)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No departures available</p>
      )}
    </div>
  );
};
