import Feedback from '../../shared/models/Feedback';
import path from 'path';
import fs from 'fs';
import { SERVER_CONFIG } from '../../config/server';
import { connectToDatabase } from '../../config/database';

// Interface for feedback submission through MCP
export interface FeedbackSubmissionInput {
  customerName: string;
  email: string;
  rating: number;
  comment: string;
  images?: string[]; // Base64 encoded image strings
}

// Ensure upload directory exists
const uploadDir = SERVER_CONFIG.UPLOAD_DIR;
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Save base64 image to disk
const saveImage = (base64Image: string, index: number): string => {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `mcp-image-${index}-${uniqueSuffix}.jpg`;
  const filepath = path.join(uploadDir, filename);
  
  // Extract base64 data
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  
  // Write file
  fs.writeFileSync(filepath, buffer);
  
  return filename;
};

// Handler for MCP feedback submission
export const submitFeedbackHandler = async (input: FeedbackSubmissionInput) => {
  try {
    await connectToDatabase()
    const { customerName, email, rating, comment, images } = input;
    
    // Validate required fields
    if (!customerName || !email || !rating || !comment) {
      throw new Error('Missing required fields');
    }
    
    // Process images if provided
    const imageUrls: string[] = [];
    if (images && images.length > 0) {
      images.forEach((base64Image, index) => {
        try {
          const filename = saveImage(base64Image, index);
          imageUrls.push(`/${uploadDir}/${filename}`);
        } catch (error) {
          console.error(`Error saving image ${index}:`, error);
        }
      });
    }
    
    // Create and save feedback
    const feedback = new Feedback({
      customerName,
      email,
      rating: Number(rating),
      comment,
      imageUrls,
    });
    
    await feedback.save();
    
    return {
      success: true,
      message: 'Feedback submitted successfully via MCP',
      feedbackId: feedback._id,
    };
  } catch (error) {
    console.error('Error in MCP feedback submission:', error);
    throw error;
  }
}; 