import { Schema, Document } from 'mongoose';

export const ReplySchema = new Schema({
  content: { type: String, required: true },
  thread: { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface Reply extends Document {
  content: string;
  thread: string;
  createdBy: string;
  createdAt: Date;
}
