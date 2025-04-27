/**
 * MCP (Model Context Protocol) Definition for Restaurant Feedback System
 * 
 * This file defines the MCP function for submitting restaurant feedback.
 */

export const MCPFunctions = {
  SendFeedback: {
    name: "SendFeedback",
    description: "Send feedback for a restaurant experience",
    parameters: {
      type: "object",
      properties: {
        customerName: {
          type: "string",
          description: "Customer's full name"
        },
        email: {
          type: "string",
          format: "email",
          description: "Customer's email address"
        },
        rating: {
          type: "number",
          minimum: 1,
          maximum: 5,
          description: "Rating between 1-5 stars"
        },
        comment: {
          type: "string",
          description: "Detailed feedback from the customer"
        },
        images: {
          type: "array",
          items: {
            type: "string",
            format: "binary",
            description: "Base64 encoded image"
          },
          description: "Optional images of the food or restaurant experience"
        }
      },
      required: ["customerName", "email", "rating", "comment"]
    }
  }
};

// This is the schema that would be exposed to MCP clients
export const MCPSchema = {
  openapi: "3.0.0",
  info: {
    title: "Restaurant Feedback API",
    description: "API for submitting restaurant feedback with images",
    version: "1.0.0"
  },
  paths: {
    "/mcp/submitFeedback": {
      post: {
        operationId: "submitFeedback",
        summary: "Submit restaurant feedback",
        description: "Submit detailed feedback about a restaurant experience with optional images",
        security: [
          {
            apiKey: []
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/FeedbackRequest"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Feedback successfully submitted",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/FeedbackResponse"
                }
              }
            }
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      FeedbackRequest: {
        type: "object",
        properties: {
          customerName: {
            type: "string"
          },
          email: {
            type: "string",
            format: "email"
          },
          rating: {
            type: "number",
            minimum: 1,
            maximum: 5
          },
          comment: {
            type: "string"
          },
          images: {
            type: "array",
            items: {
              type: "string",
              format: "binary"
            }
          }
        },
        required: ["customerName", "email", "rating", "comment"]
      },
      FeedbackResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean"
          },
          message: {
            type: "string"
          },
          feedbackId: {
            type: "string"
          }
        }
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean"
          },
          error: {
            type: "string"
          }
        }
      }
    },
    securitySchemes: {
      apiKey: {
        type: "apiKey",
        in: "header",
        name: "X-API-Key"
      }
    }
  }
}; 