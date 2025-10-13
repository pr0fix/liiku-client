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
