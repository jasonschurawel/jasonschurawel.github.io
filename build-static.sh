#!/bin/bash

# Build script that fetches GitHub data at build time
echo "🔨 Building static website with GitHub data..."

# Kill any existing servers on port 8080
echo "🧹 Cleaning up any existing servers..."
pkill -f "go run main.go" || true
sleep 2

# Start the Go server temporarily
cd server
echo "📡 Starting temporary Go server..."
go run main.go &
GO_PID=$!
cd ..

# Wait for server to start
echo "⏳ Waiting for Go server to start..."
sleep 5

# Check if server is running with retries
RETRIES=5
while [ $RETRIES -gt 0 ]; do
    if curl -s http://localhost:8080/api/health > /dev/null; then
        echo "✅ Go server is running"
        break
    fi
    echo "⏳ Retrying... ($RETRIES attempts left)"
    sleep 2
    RETRIES=$((RETRIES-1))
done

if [ $RETRIES -eq 0 ]; then
    echo "❌ Failed to start Go server after multiple attempts"
    kill $GO_PID 2>/dev/null || true
    exit 1
fi

echo "📊 Fetching GitHub data..."

# Fetch the GitHub data and save it as a static JSON file
mkdir -p public/api
if curl -s http://localhost:8080/api/projects > public/api/projects.json; then
    echo "✅ GitHub data fetched successfully"
    # Verify the JSON is valid
    if [ -s public/api/projects.json ] && python3 -m json.tool public/api/projects.json > /dev/null 2>&1; then
        echo "✅ JSON data is valid"
    else
        echo "❌ Invalid JSON data received"
        kill $GO_PID 2>/dev/null || true
        exit 1
    fi
else
    echo "❌ Failed to fetch GitHub data"
    kill $GO_PID 2>/dev/null || true
    exit 1
fi

# Stop the Go server
kill $GO_PID 2>/dev/null || true
echo "🛑 Stopped temporary Go server"

# Build React app
echo "🔄 Building React app..."
npm run build

# Copy the GitHub data to the build output
echo "📋 Copying GitHub data to build output..."
mkdir -p dist/api
cp public/api/projects.json dist/api/

echo "🎉 Build complete! Ready for GitHub Pages deployment."
echo "📁 Static files in: dist/"
echo "📊 GitHub data cached in: dist/api/projects.json"
