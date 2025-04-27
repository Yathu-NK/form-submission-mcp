#!/usr/bin/env node

import {
  McpServer,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { submitFeedbackHandler } from './handlers/FeedbackHandler';

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});

// Submit feedback tool
server.tool(
  "SubmitFeedback",
  "Submit a feedback",
  {
    customerName: z.string().describe("Customer name"),
    email: z.string().email().describe("Customer email"),
    rating: z.number().describe("Restaurant rating"),
    comment: z.string().describe("Restaurant comment"),
  },
  async (data) => {
    const result = await submitFeedbackHandler(data)
    return {
      content: [{ type: "text", text: `Feedback submitted successfully. Submission ID: ${result.feedbackId}` }],
    };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
