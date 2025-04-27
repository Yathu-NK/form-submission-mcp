import { Router } from 'express';
import { submitFeedback } from '../controllers/feedbackController';
import { upload } from '../../shared/utils/fileUpload';

const router = Router();

// POST /api/feedback - Submit feedback with optional image uploads
router.post('/feedback', upload.array('images', 5), submitFeedback);

export default router; 