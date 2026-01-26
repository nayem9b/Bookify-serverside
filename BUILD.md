# Bookify Build Guide

This document explains how to build the Bookify project (both client and server).

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Make (optional, for using Makefile)

## Build Methods

### Method 1: Using the Build Script (Recommended)

```bash
# From project root
./build.sh
```

This will:
1. Build the server (runs linting)
2. Build the client (creates production build)
3. Output build artifacts

### Method 2: Using npm Scripts

```bash
# From project root

# Install dependencies for all projects
npm run install:all

# Build both client and server
npm run build

# Build only client
npm run build:client

# Build only server
npm run build:server
```

### Method 3: Using Makefile

```bash
# From project root

# Show all available commands
make help

# Install dependencies
make install

# Build everything
make build

# Build only client
make build-client

# Build only server
make build-server

# Clean and rebuild
make rebuild
```

### Method 4: Manual Build

#### Server Build
```bash
cd server
npm install
npm run build
```

#### Client Build
```bash
cd client
npm install
npm run build
```

## Build Outputs

### Server
- The server build validates code through ESLint
- No build artifacts are created (Node.js runs source directly)
- Production ready after successful lint

### Client
- Build artifacts are created in `client/build/`
- This folder contains the optimized production build
- Can be deployed to any static hosting service

## Development Mode

### Run both client and server in development:
```bash
npm run dev
# or
make dev
```

### Run individually:
```bash
# Client only
npm run dev:client
# or
make dev-client

# Server only
npm run dev:server
# or
make dev-server
```

## Deployment

### Server Deployment
```bash
cd server
npm start
```

### Client Deployment
The `client/build` folder can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

Or serve locally:
```bash
npm install -g serve
cd client/build
serve -s .
```

## Troubleshooting

### Build fails with linting errors
```bash
cd server
npm run lint:fix
```

### Clean build (remove all dependencies and build artifacts)
```bash
make clean
# or
npm run clean
```

### Reinstall dependencies
```bash
make install
# or
npm run install:all
```

## CI/CD Integration

The build script can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Build Project
  run: ./build.sh

# Or using make
- name: Build Project
  run: make build
```

## Environment Variables

Make sure to set required environment variables before building:

### Server (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Performance Tips

1. Use `npm ci` instead of `npm install` in CI/CD for faster, deterministic builds
2. Cache `node_modules` in CI/CD pipelines
3. Use build caching for Docker builds
4. Consider using `npm run build:client` only if server code hasn't changed

## Support

For issues or questions, please check:
- Project README.md
- Server README.md
- Client README.md
