#!/bin/bash

echo "🔍 Pre-deployment verification..."

# Check if all required files exist
echo "📁 Checking required files..."
required_files=(
    ".github/workflows/deploy.yml"
    "server/main.go"
    "server/go.mod"
    "package.json"
    "src/App.tsx"
    "public/api/projects-fallback.json"
    "build-static.sh"
)

missing_files=()
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -eq 0 ]; then
    echo "✅ All required files present"
else
    echo "❌ Missing files:"
    printf '   - %s\n' "${missing_files[@]}"
    exit 1
fi

# Test local build
echo "🔨 Testing local build..."
if ./build-static.sh; then
    echo "✅ Local build successful"
else
    echo "❌ Local build failed"
    exit 1
fi

# Check git status
echo "📋 Git status:"
git status --porcelain

echo ""
echo "🚀 Ready to deploy! Run:"
echo "   git add ."
echo "   git commit -m \"Fix GitHub Actions permissions and deployment\""
echo "   git push origin main"
echo ""
echo "⚠️  Remember to configure repository settings first:"
echo "   1. Go to repository Settings → Actions → General"
echo "   2. Set 'Read and write permissions'"
echo "   3. Go to Settings → Pages"
echo "   4. Set source to 'GitHub Actions'"
