import express from 'express';
import cors from 'cors';
import path from 'path';
import { SERVER_CONFIG } from '../config/server';
import { connectToDatabase } from '../config/database';
import feedbackRoutes from './routes/feedbackRoutes';

// Initialize express app
const app = express();
const PORT = SERVER_CONFIG.PORT;

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from upload directory
app.use(`/${SERVER_CONFIG.UPLOAD_DIR}`, express.static(path.join(__dirname, '../../', SERVER_CONFIG.UPLOAD_DIR)));

// Routes
app.use('/api', feedbackRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', message: 'Function server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Function server running on port ${PORT}`);
}); 