# Restaurant Feedback System

A system that allows users to submit textual feedback and upload images for restaurants.

## Project Structure

- `src/function/` - Contains the core function for form submission
- `src/mcp/` - Contains the Model Context Protocol (MCP) server implementation
- `src/shared/` - Shared code between function and MCP
- `src/config/` - Configuration files

## Features

- Text feedback submission
- Image upload capability
- MongoDB for data storage
- MCP integration for external system communication

## Prerequisites

- Node.js (v14 or later)
- MongoDB
- TypeScript

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your environment variables
   ```
   cp .env.example .env
   ```
4. Build the project:
   ```
   npm run build
   ```

## Running the Application

Start the function server:
```
npm run start:function
```

Start the MCP server:
```
npm run start:mcp
```

For development with auto-reloading:
```
npm run dev:function
npm run dev:mcp
```

## API Documentation

### Function Endpoints

- `POST /api/feedback` - Submit feedback with optional image attachments

### MCP APIs

The MCP server exposes specialized APIs for system integration using the Model Context Protocol.

## License

MIT 