import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reply } from './schemas/reply.schema';
import { CreateReplyDto } from './dto/create-reply.dto';
import { ThreadService } from './thread.service';

@Injectable()
export class ReplyService {
  constructor(
    @InjectModel('Reply') private readonly replyModel: Model<Reply>,
    private readonly threadService: ThreadService
  ) {}

  async create(threadId: string, createReplyDto: CreateReplyDto): Promise<Reply> {
    const thread = await this.threadService.findOne(threadId);
    const createdReply = new this.replyModel({
      ...createReplyDto,
      thread: thread._id,
    });
    return createdReply.save();
  }
}
