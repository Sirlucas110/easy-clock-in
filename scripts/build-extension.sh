#!/bin/bash
set -e

cd /dev-server

# Build the React popup
npx vite build --config vite.extension.config.ts

# Prepare extension folder
rm -rf extension-build
mkdir -p extension-build

# Copy built popup
cp extension-dist/extension-popup.html extension-build/popup.html
cp -r extension-dist/assets extension-build/assets

# Copy manifest and icon
cp extension/manifest.json extension-build/manifest.json
cp extension/icon.png extension-build/icon.png

# Update manifest to point to popup.html (already correct)
# Package as ZIP
rm -f public/ponto-eletronico-extension.zip
cd extension-build
nix run nixpkgs#zip -- -r /dev-server/public/ponto-eletronico-extension.zip .

echo "✅ Extension built and packaged!"
