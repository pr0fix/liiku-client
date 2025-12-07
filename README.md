# liiku-client

A real-time public transit visualization application for Helsinki metropolitan area built with React, TypeScript and Maplibre GL JS.

## Overview

liiku-client provides an interactive map interface for tracking public transport vehicles in real-time. The application displays buses, trams, lightrails, metros, trains and ferries with live position updates, route visualization with polylines and detailed vehicle information popups.

## Features

- **Real-time vehicle tracking** — Live position updates with smooth animations
- **Clustered markers** — Viewport based grouping of nearby vehicles at lower zoom levels
- **Route visualization** — Display route lines when selecting a vehicle
- **Vehicle type indicators** — Color-coded markers by transport mode (bus, tram, lightrail, metro, train, ferry)
- **Direction indicators** — Vehicle bearing displayed on markers
- **Interactive popups** — Detailed vehicle and route information on selection
- **Custom map styling** — Clean, purpose-built map style for optimized transit data and readability

## Tech Stack

| Category   | Technology                             |
| ---------- | -------------------------------------- |
| Framework  | React                                  |
| Language   | TypeScript                             |
| Build Tool | Vite                                   |
| Mapping    | MapLibre GL JS, @vis.gl/react-maplibre |
| Clustering | Supercluster                           |
| Styling    | tailwindCSS                            |
| Data       | Digitransit GTFS-RT API                |

## Project Structure

```
src/
├── components/
│   ├── map/
│   │   ├── Map.tsx              # Map container
│   │   ├── MapContent.tsx       # Markers, popups, and layers
│   │   ├── VehicleMarker.tsx    # Individual vehicle marker
│   │   ├── ClusterMarker.tsx    # Clustered marker component
│   │   └── RouteLineLayer.tsx   # Route polyline layer
│   │   └── VehiclePopupContent.tsx   # Route polyline layer
├── hooks/
│   ├── useVehicles.ts           # Vehicle data fetching
│   ├── useVehicleAnimation.ts   # Smooth position interpolation
│   ├── useClustering.ts         # Marker clustering logic
│   └── useRouteShape.ts         # Route geometry fetching
├── utils/
│   ├── constants.ts             # Configuration constants
│   ├── types.ts                 # TypeScript type definitions
│   └── vehicleColors.ts         # Vehicle type color mapping
├── App.tsx                      # Root component
├── main.tsx                     # Application entry point
└── index.css                    # Global styles
public/
└── styles/
    └── map.json                 # Custom MapLibre style
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation

```sh
# Clone the repository
git clone https://github.com/your-username/liiku-client.git
cd liiku-client

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

### Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint                               |

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=your_api_url
```

### Map Configuration

- **Map style**: `public/styles/map.json` (editable with [Maputnik](https://maputnik.github.io/))
- **Default center**: Helsinki city center, configurable in `src/utils/constants.ts`

## Roadmap

### Planned Features

- [ ] Filter controls for route numbers, directions, and vehicle types
- [ ] Search functionality for routes and stops
- [ ] Dark mode with localStorage persistence
- [ ] User location tracking with nearest vehicle display
- [ ] Follow mode for auto-centering on selected vehicles
- [ ] Favorites system for bookmarking routes
- [x] Stops shown as markers on route lines
- [ ] 3D vehicle models at high zoom levels

### Performance Optimizations

- [ ] Route and stop data caching
- [ ] Service worker for offline support

## Acknowledgments

- [Digitransit](https://digitransit.fi/) for providing the public transit API
- [MapLibre](https://maplibre.org/) for the open-source mapping library
- [HSL](https://www.hsl.fi/) for Helsinki region transit data
