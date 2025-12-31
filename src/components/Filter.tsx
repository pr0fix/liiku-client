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

  const clearFilters = () => {
    onSelectRoutes([]);
  };

  const uniqueRoutes = [...new Set(vehicles.map((v) => v.routeName))].sort();

  return (
    <div className="relative">
      <button
        className="border border-border bg-surface text-text px-12 py-2 rounded-lg text-center w-full hover:bg-secondary transition-colors shadow-md font-medium flex items-center justify-center gap-2"
        onClick={() => setIsOpen((open) => !open)}
      >
        Filter
        {selectedRoutes.length > 0 && (
          <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {selectedRoutes.length}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-surface border border-border rounded-lg shadow-lg z-10 overflow-hidden">
          {selectedRoutes.length > 0 && uniqueRoutes.length > 0 && (
            <div className="px-4 py-2 bg-secondary border-b border-border flex justify-between items-center">
              <span className="text-sm text-text-muted font-medium">
                {selectedRoutes.length} selected
              </span>
              <button
                onClick={clearFilters}
                className="text-xs text-accent hover:text-primary font-medium transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
          {uniqueRoutes.length > 0 ? (
            <ul
              className="max-h-60 overflow-y-auto"
              style={{
                scrollbarColor: "var(--primary) var(--surface)",
                scrollbarWidth: "thin",
              }}
            >
              {uniqueRoutes.map((routeName) => (
                <li
                  key={routeName}
                  className={`px-4 py-2 cursor-pointer flex items-center hover:bg-secondary transition-colors ${
                    selectedRoutes.includes(routeName)
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-text"
                  }`}
                  onClick={() => {
                    toggleRoute(routeName);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedRoutes.includes(routeName)}
                    readOnly
                    className="mr-2 accent-primary"
                  />
                  {routeName}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-text-muted text-sm">
              No routes available. 
            </div>
          )}
        </div>
      )}
    </div>
  );
};
