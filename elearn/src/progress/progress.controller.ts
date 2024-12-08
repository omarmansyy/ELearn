// src/progress/progress.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  // Get the learning path for a user (the next courses to take)
  @Get(':userId/learning-path')
  async getLearningPath(@Param('userId') userId: string) {
    return this.progressService.getLearningPath(userId);
  }

  // Get the progress of a user in a specific course
  @Get(':userId/:courseId')
  async getStudentProgress(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.progressService.getStudentProgress(userId, courseId);
  }
}
