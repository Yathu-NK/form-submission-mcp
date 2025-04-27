/**
 * Example MCP Client for Restaurant Feedback System
 * 
 * This example shows how to submit feedback using the MCP server
 * from an external system.
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Configuration
const MCP_SERVER_URL = 'http://localhost:3001';
const MCP_API_KEY = 'your_mcp_api_key'; // Replace with your actual API key

/**
 * Function to convert image file to base64
 */
function fileToBase64(filePath: string): string {
  const fileData = fs.readFileSync(filePath);
  return `data:image/jpeg;base64,${fileData.toString('base64')}`;
}

/**
 * Function to submit feedback via MCP
 */
async function submitFeedbackViaMCP(
  customerName: string,
  email: string,
  rating: number,``
  comment: string,
  imagePaths: string[] = []
) {
  try {
    // Convert images to base64 if provided
    const images = imagePaths.map(imagePath => fileToBase64(imagePath));

    // Prepare request body
    const requestBody = {
      customerName,
      email,
      rating,
      comment,
      images
    };

    // Make API call to MCP server
    const response = await axios.post(
      `${MCP_SERVER_URL}/mcp/submitFeedback`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': MCP_API_KEY
        }
      }
    );

    console.log('Feedback submitted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback via MCP:', error);
    throw error;
  }
}

// Example usage
async function runExample() {
  try {
    await submitFeedbackViaMCP(
      'John Doe',
      'john.doe@example.com',
      5,
      'The food was excellent! Will definitely come back.',
      ['./examples/sample-food-image.jpg'] // Path to sample image file
    );
  } catch (error) {
    console.error('Example failed:', error);
  }
}

// Run the example
runExample(); 