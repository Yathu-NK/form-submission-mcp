import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { SERVER_CONFIG } from '../../config/server';

// Create upload directory if it doesn't exist
const uploadDir = SERVER_CONFIG.UPLOAD_DIR;
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage settings
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExt = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
  },
});

// Define file filter
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'));
  }
  cb(null, true);
};

// Create multer upload instance
export const upload = multer({
  storage,
  limits: {
    fileSize: SERVER_CONFIG.MAX_FILE_SIZE, // Default: 5MB
  },
  fileFilter,
});

// Helper to get file URLs
export const getFileUrls = (req: any, files: Express.Multer.File[]): string[] => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return files.map(file => `${baseUrl}/${uploadDir}/${file.filename}`);
}; 