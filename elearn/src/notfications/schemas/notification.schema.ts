import { Schema, Document } from 'mongoose';

export const NotificationSchema = new Schema({
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The user receiving the notification
  thread: { type: Schema.Types.ObjectId, ref: 'Thread', required: false }, // Optional: Thread reference for replies
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

export interface Notification extends Document {
  message: string;
  user: Schema.Types.ObjectId;
  thread?: Schema.Types.ObjectId;
  createdAt: Date;
  read: boolean;
}
