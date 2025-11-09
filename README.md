# Liiku Client

This is the client-side code for the Liiku map application, built with React, Vite, MapLibre, and Tailwind CSS.

## Features

- Interactive map using [MapLibre GL JS](https://maplibre.org/)
- Custom map style ([public/styles/map.json](public/styles/map.json)) made with and exported from [Maputnik](https://maputnik.github.io/)

## Project Structure

```
src/
  App.tsx            # Main app component
  main.tsx           # Entry point
  index.css          # Main stylesheet
  components/
    Map.tsx          # Map container using MapLibre
  utils/
    constants.ts     # Constant variables
public/
  styles/
    map.json         # Custom MapLibre-styles
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the development server:

   ```sh
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

### Lint the Code

```sh
npm run lint
```

## Configuration

- Map style is defined in [public/styles/map.json](public/styles/map.json).
- Default map center coordinates to Helsinki city centre are set in [`utils/constants.ts`](src/utils/constants.ts).

## Dependencies

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [MapLibre GL JS](https://maplibre.org/)
- [@vis.gl/react-maplibre](https://visgl.github.io/react-maplibre/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## TODO

### Map Features
- [ ] **Clustered markers** - Group nearby vehicles when zoomed out (consider supercluster or deck.gl)
- [ ] **Vehicle direction indicators** - Use bearing property to show direction
- [ ] **Route lines** - Draw actual routes using GTFS shapes data (show on vehicle selection)
- [ ] **3D vehicle models** - Switch markers to 3D models when zoomed in closely
- [ ] **Vehicle history trail** - Display path history for selected vehicles

### UI/UX
- [ ] **Vehicle popup** - Show detailed information (route, destination, vehicle ID)
- [ ] **Filter controls** - Filter by route number, direction, or vehicle type
- [ ] **Search functionality** - Find specific routes and center map on them
- [ ] **Dark mode** - Theme toggle with localStorage persistence
- [ ] **Loading states** - Add skeletons or progress bars for better UX
- [ ] **Route color coding** - Different colors per vehicle type (blue for buses, orange for metro, etc.)

### User Features
- [ ] **User location tracking** - Show nearest vehicles to current position
- [ ] **Follow mode** - Auto-center and follow selected vehicle along route
- [ ] **Favorites/Bookmarks** - Save and track specific routes
- [ ] **Arrival predictions** - Display estimated arrival times at upcoming stops

### Performance
- [ ] **Viewport rendering** - Only render vehicles visible in current viewport
- [ ] **Route/stop caching** - Cache data in localStorage to reduce API calls

### Backend/Security
- [ ] **Authentication** - Implement user registration with database
- [ ] **API rate limiting** - Add token or cookie system to prevent misuse