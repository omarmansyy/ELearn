import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from './chat-message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatMessage.name) private chatModel: Model<ChatMessageDocument>,
  ) {}

  // Create a new chat message
  async createChatMessage(senderId: string, content: string): Promise<ChatMessage> {
    const chatMessage = new this.chatModel({ senderId, content });
    return chatMessage.save();
  }

  // Get all chat messages
  async getAllMessages(): Promise<ChatMessage[]> {
    return this.chatModel.find().exec();
  }

  // Get chat messages by sender
  async getMessagesBySender(senderId: string): Promise<ChatMessage[]> {
    return this.chatModel.find({ senderId }).exec();
  }
}
