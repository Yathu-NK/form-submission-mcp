import dotenv from 'dotenv';

dotenv.config();

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  MCP_PORT: process.env.MCP_PORT || 3001,
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '5000000', 10), // 5MB default
};

export const MCP_CONFIG = {
  API_KEY: process.env.MCP_API_KEY || 'development_key',
}; 