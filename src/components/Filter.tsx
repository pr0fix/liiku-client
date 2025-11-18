import { useState, type FC } from "react";
import type { Vehicle } from "../utils/types";

interface FilterProps {
  vehicles: Vehicle[];
  onSelectRoutes: (routeName: string[]) => void;
  selectedRoutes: string[];
}

export const Filter: FC<FilterProps> = ({
  vehicles,
  onSelectRoutes,
  selectedRoutes,
}: FilterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleRoute = (routeName: string) => {
    if (selectedRoutes.includes(routeName)) {
      onSelectRoutes(selectedRoutes.filter((r) => r !== routeName));
    } else {
      onSelectRoutes([...selectedRoutes, routeName]);
    }
  };

  return (
    <div className="relative">
      <button
        className="border border-black bg-white px-12 py-2 rounded-lg text-center w-full"
        onClick={() => setIsOpen((open) => !open)}
      >
        Filter
      </button>
      {isOpen && (
        <ul
        className="absolute left-0 mt-2 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-10"
        style={{
          scrollbarColor: "#3B82F6 #FFFFFF", // thumb and track colors
          scrollbarWidth: "thin",
        }}
        >
          {[...new Set(vehicles.map((v) => v.routeName))].sort().map((routeName) => (
            <li
              key={routeName}
              className={`px-4 py-2 cursor-pointer flex items-center hover:bg-blue-100 ${
                selectedRoutes.includes(routeName) ? "bg-blue-200 font-bold" : ""
              }`}
              onClick={() => {
                toggleRoute(routeName);
              }}
            >
              <input
                type="checkbox"
                checked={selectedRoutes.includes(routeName)}
                readOnly
                className="mr-2"
              />
              {routeName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
