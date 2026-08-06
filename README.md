# Star Wars Character Explorer

A web application built with React, TypeScript, and Vite for exploring Star Wars characters using the public SWAPI REST API.

The application allows users to browse paginated character cards, search characters by name, and open a modal for detailed physical attributes and homeworld data.

The focus of this implementation is on core engineering fundamentals: resilient API caching, request cancellation, accessibility compliance, clean component architecture, and consistent design token usage without relying on third-party UI libraries.

## Screenshots

![Star Wars Character Explorer Directory View](src/assets/hero.png)

## Features

- Character grid displaying physical attributes, species tag, and portrait visuals.
- Name search with 300ms input debouncing and `/` key focus shortcut.
- Pagination navigation with disabled bounds and page indicator.
- Character detail modal displaying physical traits and asynchronous homeworld data.
- Accessible modal design including focus trapping, body scroll locking, and ESC key closure.
- Resilient API handling with in-memory TTL caching, fallback mirror endpoints, and request cancellation via AbortController.
- Skeleton card shimmer loading states and isolated error fallback UI.

## Tech Stack

- React 19
- TypeScript 6
- Vite 8
- CSS Modules with CSS variables
- Vitest and React Testing Library
- Oxlint

## Architecture

The codebase follows a modular, feature-oriented component structure:

- Custom hooks isolate data fetching (`usePeople`), species resolution (`useSpeciesColor`), and debouncing (`useDebounce`).
- The API layer (`swapi.ts`) wraps `fetch` with an in-memory `Map` cache (5-minute TTL), automatic mirror failover (`swapi.py4e.com` to `swapi.dev`), and `AbortController` cancellation to eliminate race conditions.
- Design tokens for spacing, typography, colors, and motion easing are centralized in `index.css` and consumed via scoped CSS Modules.

## Project Structure

```
src/
├── api/          # SWAPI fetcher, cache, and DTO interfaces
├── components/   # UI components with CSS Modules and tests
├── hooks/        # Data fetching, debouncing, and theme hooks
├── types/        # Domain type definitions
├── utils/        # Helper functions and constants
└── test/         # Testing utilities and setup
```

## Getting Started

### Prerequisites

Node.js 18+ and npm.

### Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start local development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Starts local development server.
- `npm run build`: Runs TypeScript type check and builds for production.
- `npm test`: Executes the Vitest test suite once.
- `npm run lint`: Runs Oxlint code analysis.

## Testing

The project includes unit and integration tests covering component rendering, user interactions, custom hooks, and utility functions.

Run tests:
```bash
npm test
```

## Acknowledgements

- SWAPI (The Star Wars API) for character, species, and planet data.
- Unsplash for curated visual assets.
