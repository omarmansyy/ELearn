import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { Progress } from './progress.schema';

@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get()
  getAllProgressRecords() {
    return this.progressService.findAll();
  }

  @Get(':id')
  getProgress(@Param('id') id: string) {
    return this.progressService.findOne(id);
  }

  @Post()
  createProgress(@Body() progress: Progress) {
    return this.progressService.create(progress);
  }

  @Put(':id')
  updateProgress(@Param('id') id: string, @Body() progress: Progress) {
    return this.progressService.update(id, progress);
  }

  @Delete(':id')
  deleteProgress(@Param('id') id: string) {
    return this.progressService.delete(id);
  }
}
