#!/bin/bash

# Restaurant Feedback System Verification Script

echo "Verifying Restaurant Feedback System..."

# Check if servers are running
echo -n "Checking Function server... "
if curl -s http://localhost:3000/health > /dev/null; then
  echo "RUNNING"
else
  echo "NOT RUNNING"
  echo "Please start the Function server with: npm run start:function"
fi

echo -n "Checking MCP server... "
if curl -s http://localhost:3001/health > /dev/null; then
  echo "RUNNING"
else
  echo "NOT RUNNING"
  echo "Please start the MCP server with: npm run start:mcp"
fi

# Verify MongoDB connection
echo -n "Checking MongoDB connection... "
if [[ "$(npm run -s start:function -- --check-db 2>&1)" == *"Connected to MongoDB successfully"* ]]; then
  echo "CONNECTED"
else
  echo "NOT CONNECTED"
  echo "Please ensure MongoDB is running and the connection string in .env is correct"
fi

# Test feedback submission via Function API
echo -n "Testing feedback submission via Function API... "
FEEDBACK_RESPONSE=$(curl -s -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test User","email":"test@example.com","rating":5,"comment":"This is a test submission"}')

if [[ "$FEEDBACK_RESPONSE" == *"success"*"true"* ]]; then
  echo "SUCCESS"
else
  echo "FAILED"
  echo "Response: $FEEDBACK_RESPONSE"
fi

# Test MCP Schema
echo -n "Testing MCP Schema endpoint... "
SCHEMA_RESPONSE=$(curl -s http://localhost:3001/mcp/schema)

if [[ "$SCHEMA_RESPONSE" == *"openapi"* ]]; then
  echo "SUCCESS"
else
  echo "FAILED"
  echo "Response: $SCHEMA_RESPONSE"
fi

# Test MCP Feedback submission
echo -n "Testing MCP feedback submission... "
MCP_RESPONSE=$(curl -s -X POST http://localhost:3001/mcp/submitFeedback \
  -H "Content-Type: application/json" \
  -H "X-API-Key: development_key" \
  -d '{"customerName":"MCP Test","email":"mcp@example.com","rating":4,"comment":"Test from MCP"}')

if [[ "$MCP_RESPONSE" == *"success"*"true"* ]]; then
  echo "SUCCESS"
else
  echo "FAILED"
  echo "Response: $MCP_RESPONSE"
fi

echo "Verification complete!" 