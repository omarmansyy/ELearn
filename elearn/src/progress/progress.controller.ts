// src/progress/progress.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param  , UseGuards , UnauthorizedException, Req , Res} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { Progress } from './progress.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {  Types } from 'mongoose';
import { parse } from 'json2csv';
import { Response } from 'express';





@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  // Get the learning path for a user (the next courses to take)
  @Get(':userId/learning-path')
  async getLearningPath(@Param('userId') userId: string) {
    return this.progressService.getLearningPath(userId);
  }

  // Get the progress of a user in a specific course


  
    @UseGuards(JwtAuthGuard) // Ensures that the user is logged in
    @Get('dashboard/:userId')
    async getStudentProgress(@Param('userId') userId: Types.ObjectId, @Req() req: Request) {
        const userProgress = await this.progressService.findProgressByUserId(userId);
        const completionRate = await this.progressService.calculateCompletionRate(userId);
        return { progress: userProgress, completionRate };
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('instructor') // Ensures that only instructors can access this endpoint
    @Get('dashboard/:courseId')
    async getCourseAnalytics(@Param('courseId') courseId: Types.ObjectId) {
        const courseProgress = await this.progressService.getCourseProgress(courseId);
        return { courseProgress };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('instructor')
    @Get('download-dashboard/:courseId')
    async downloadCourseAnalytics(@Param('courseId') courseId: string, @Res() response: Response) {
        try {
            const courseProgress = await this.progressService.getCourseAnalytics(new Types.ObjectId(courseId));
            const csv = parse(courseProgress, {
                fields: ['studentId', 'studentName', 'completionPercentage', 'lastAccessed'], // Adjust fields based on actual data structure
            });
            response.header('Content-Type', 'text/csv');
            response.attachment(`analytics-${courseId}.csv`);
            response.send(csv);
        } catch (err) {
            console.error('Failed to generate CSV', err);
            response.status(500).send('Failed to generate CSV');
        }
    }
}
