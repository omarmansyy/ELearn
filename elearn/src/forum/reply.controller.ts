import { Controller, Post, Body, Param } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('replies')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post(':threadId')
  async createReply(@Param('threadId') threadId: string, @Body() createReplyDto: CreateReplyDto) {
    return this.replyService.create(threadId, createReplyDto);
  }
}
