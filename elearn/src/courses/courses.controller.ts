import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './courses.schema';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  getAllCourses() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  getCourse(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  createCourse(@Body() course: Course) {
    return this.coursesService.create(course);
  }

  @Put(':id')
  updateCourse(@Param('id') id: string, @Body() course: Course) {
    return this.coursesService.update(id, course);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.coursesService.delete(id);
  }
}
