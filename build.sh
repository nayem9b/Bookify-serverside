#!/bin/bash

# Build script for Bookify project
# This script builds both the client and server applications

set -e  # Exit on error

echo "🚀 Starting Bookify build process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -d "client" ] || [ ! -d "server" ]; then
    print_error "Error: client or server directory not found!"
    print_info "Please run this script from the project root directory."
    exit 1
fi

# Build server
print_info "Building server..."
cd server
if npm run build; then
    print_success "Server build completed!"
else
    print_error "Server build failed!"
    exit 1
fi
cd ..

# Build client
print_info "Building client..."
cd client
if npm run build; then
    print_success "Client build completed!"
else
    print_error "Client build failed!"
    exit 1
fi
cd ..

print_success "🎉 Build completed successfully!"
print_info "Client build output: ./client/build"
print_info "Server is ready to run with: cd server && npm start"

echo ""
echo "Next steps:"
echo "  - To start the server: cd server && npm start"
echo "  - To serve the client build: Use a static server or deploy ./client/build"
