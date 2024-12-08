import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessage } from './chat-message.schema';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Endpoint to send a new message
  @Post()
  async sendMessage(@Body() body: { senderId: string; content: string }): Promise<ChatMessage> {
    const { senderId, content } = body;
    return this.chatService.createChatMessage(senderId, content);
  }

  // Endpoint to get all messages
  @Get()
  async getMessages(): Promise<ChatMessage[]> {
    return this.chatService.getAllMessages();
  }

  // Endpoint to get messages by sender
  @Get(':senderId')
  async getMessagesBySender(@Param('senderId') senderId: string): Promise<ChatMessage[]> {
    return this.chatService.getMessagesBySender(senderId);
  }
}
