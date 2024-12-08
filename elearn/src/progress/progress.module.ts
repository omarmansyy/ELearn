import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { Progress, ProgressSchema } from './progress.schema';
import { Course } from 'src/courses/courses.schema';
import { CourseSchema } from 'src/courses/courses.schema';
import { CoursesModule } from 'src/courses/courses.module'; // Import CoursesModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Progress.name, schema: ProgressSchema }]),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    CoursesModule, // Add this if you need services from CoursesModule
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
