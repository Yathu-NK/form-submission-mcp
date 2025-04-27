import { Request, Response } from 'express';
import Feedback from '../../shared/models/Feedback';
import { getFileUrls } from '../../shared/utils/fileUpload';

// Submit feedback
export const submitFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerName, email, rating, comment } = req.body;
    
    // Validate required fields
    if (!customerName || !email || !rating || !comment) {
      res.status(400).json({ success: false, error: 'Missing required fields' });
      return;
    }

    // Process uploaded files if any
    const files = req.files as Express.Multer.File[];
    const imageUrls = files && files.length > 0 ? getFileUrls(req, files) : [];

    // Create feedback document
    const feedback = new Feedback({
      customerName,
      email,
      rating: Number(rating),
      comment,
      imageUrls,
    });

    // Save to database
    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback,
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while submitting feedback',
    });
  }
}; 