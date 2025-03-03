# Hello World React App

A simple React application created with Vite and TypeScript.

## Features

- React 19 with TypeScript
- Vite for fast development and building
- Configured to run on port 8087
- Simple and clean UI

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone this repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm run dev
```

This will:

- Start the development server on port 8087
- Automatically open your default browser to http://localhost:8087

### Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `src/` - Source code
  - `App.tsx` - Main application component
  - `App.css` - Styles for the main component
  - `main.tsx` - Application entry point
- `public/` - Static assets
- `vite.config.ts` - Vite configuration (including port settings)

## License

MIT
