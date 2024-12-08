import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { CreateThreadDto } from './dto/create-thread.dto';

@Controller('threads')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Post()
  async createThread(@Body() createThreadDto: CreateThreadDto) {
    // Save the thread
    return this.threadService.create(createThreadDto);
  }

  @Get()
  async getThreads() {
    // Fetch all threads and include only the user's name
    const threads = await this.threadService.findAll();
    return threads.map((thread) => ({
      id: thread._id,
      title: thread.title,
      content: thread.content,
      createdBy: thread.createdBy['name'], // Only return the name
      createdAt: thread.createdAt,
      updatedAt: thread.updatedAt,
    }));
  }

  @Get(':id')
  async getThread(@Param('id') id: string) {
    // Fetch a specific thread and include only the user's name
    const thread = await this.threadService.findOne(id);
    return {
      id: thread._id,
      title: thread.title,
      content: thread.content,
      createdBy: thread.createdBy['name'], // Only return the name
      createdAt: thread.createdAt,
      updatedAt: thread.updatedAt,
    };
  }
}
