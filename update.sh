#!/bin/bash
echo "=== Updating The Empty Yards EPK Production ==="

# Navigate to the repo directory
cd "$(dirname "$0")"

# Pull latest changes from GitHub
echo "Pulling latest version from GitHub..."
git pull

# Rebuild and restart the container in background
echo "Rebuilding and starting Docker container..."
docker compose up --build -d

echo "=== Update Complete! Service is running on port 8080 ==="
