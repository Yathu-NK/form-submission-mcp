import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  customerName: string;
  email: string;
  rating: number;
  comment: string;
  imageUrls: string[];
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrls: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema); 