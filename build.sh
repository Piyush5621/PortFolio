#!/bin/bash
echo "🚀 Initializing Render Build Protocol..."
cd client
echo "📦 Installing Dependencies..."
npm install
echo "🏗️ Executing Vite Build..."
npm run build
echo "✅ Build Complete!"
