#!/usr/bin/env bash
set -e

echo "--- Step 1: Install backend dependencies ---"
npm install --omit=optional

echo "--- Step 2: Install frontend dependencies ---"
npm --prefix frontend/client install

echo "--- Step 3: Build React frontend ---"
export CI=false
export NODE_OPTIONS="--max_old_space_size=512"
npm --prefix frontend/client run build

echo "--- Step 4: Verify build output ---"
if [ -d "frontend/client/build" ]; then
  echo "Build folder exists ✓"
  ls frontend/client/build
else
  echo "ERROR: Build folder not found!"
  exit 1
fi
