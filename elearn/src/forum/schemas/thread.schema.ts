import { Schema, Document } from 'mongoose';

export const ThreadSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // reference to User ObjectId
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface Thread extends Document {
  title: string;
  content: string;
  createdBy: Schema.Types.ObjectId; // Use ObjectId here instead of string
  createdAt: Date;
  updatedAt: Date;
}
