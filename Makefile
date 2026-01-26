.PHONY: help install build clean dev start test lint

# Default target
help:
	@echo "Bookify - Available commands:"
	@echo "  make install     - Install dependencies for all projects"
	@echo "  make build       - Build both client and server"
	@echo "  make build-client - Build only the client"
	@echo "  make build-server - Build only the server"
	@echo "  make dev         - Run both client and server in development mode"
	@echo "  make dev-client  - Run only the client in development mode"
	@echo "  make dev-server  - Run only the server in development mode"
	@echo "  make start       - Start production servers"
	@echo "  make clean       - Remove all node_modules and build artifacts"
	@echo "  make lint        - Run linters on both projects"
	@echo "  make test        - Run tests for both projects"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	npm install
	cd client && npm install
	cd server && npm install
	@echo "✅ Dependencies installed successfully!"

# Build all
build: build-server build-client
	@echo "🎉 Build completed successfully!"

# Build client
build-client:
	@echo "🔨 Building client..."
	cd client && npm run build
	@echo "✅ Client build completed!"

# Build server
build-server:
	@echo "🔨 Building server..."
	cd server && npm run build
	@echo "✅ Server build completed!"

# Development mode
dev:
	@echo "🚀 Starting development servers..."
	npm run dev

dev-client:
	@echo "🚀 Starting client development server..."
	cd client && npm start

dev-server:
	@echo "🚀 Starting server development server..."
	cd server && npm run dev

# Production start
start:
	@echo "🚀 Starting production servers..."
	@echo "Note: Start client and server in separate terminals"
	@echo "Client: cd client && serve -s build"
	@echo "Server: cd server && npm start"

# Clean
clean:
	@echo "🧹 Cleaning build artifacts and dependencies..."
	rm -rf node_modules package-lock.json
	cd client && rm -rf node_modules build package-lock.json
	cd server && rm -rf node_modules package-lock.json
	@echo "✅ Clean completed!"

# Lint
lint:
	@echo "🔍 Running linters..."
	cd server && npm run lint
	@echo "✅ Linting completed!"

# Test
test:
	@echo "🧪 Running tests..."
	cd client && npm test -- --watchAll=false
	cd server && npm test
	@echo "✅ Tests completed!"

# Quick rebuild (clean + install + build)
rebuild: clean install build
	@echo "🎉 Rebuild completed successfully!"
