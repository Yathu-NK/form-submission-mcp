#!/bin/bash

# Restaurant Feedback System Startup Script

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file from example..."
  cp .env.example .env
  echo "Done! Please customize your .env file as needed."
fi

# Create uploads directory if it doesn't exist
if [ ! -d "uploads" ]; then
  echo "Creating uploads directory..."
  mkdir -p uploads
fi

# Install dependencies
# echo "Installing dependencies..."
# npm install

# Build the project
echo "Building the project..."
npm run build
echo "Build completed successfully"
