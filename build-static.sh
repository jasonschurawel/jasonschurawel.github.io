#!/bin/bash

# Build script that fetches GitHub data at build time
echo "🔨 Building static website with GitHub data..."

# Start the Go server temporarily
cd server
echo "📡 Starting temporary Go server..."
go run main.go &
GO_PID=$!
cd ..

# Wait for server to start
sleep 3

# Check if server is running
if ! curl -s http://localhost:8080/api/health > /dev/null; then
    echo "❌ Failed to start Go server"
    exit 1
fi

echo "✅ Go server running, fetching data..."

# Fetch the GitHub data and save it as a static JSON file
mkdir -p public/api
curl -s http://localhost:8080/api/projects > public/api/projects.json

if [ $? -eq 0 ]; then
    echo "✅ GitHub data fetched successfully"
else
    echo "❌ Failed to fetch GitHub data"
    kill $GO_PID 2>/dev/null
    exit 1
fi

# Stop the Go server
kill $GO_PID 2>/dev/null
echo "🛑 Stopped temporary Go server"

# Update React to use static data instead of API call
echo "🔄 Building React app..."
npm run build

echo "🎉 Build complete! Ready for GitHub Pages deployment."
echo "📁 Static files in: dist/"
echo "📊 GitHub data cached in: public/api/projects.json"
