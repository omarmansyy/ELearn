import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification') private readonly notificationModel: Model<Notification>,
  ) {}

  async createNotification(message: string, userId: string, threadId?: string): Promise<Notification> {
    const notification = new this.notificationModel({
      message,
      user: userId,
      thread: threadId,
    });
    return notification.save();
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.notificationModel
      .find({ user: userId })
      .populate('thread', 'title') // Populate the thread title if available
      .sort({ createdAt: -1 }) // Latest notifications first
      .exec();
  }
}
