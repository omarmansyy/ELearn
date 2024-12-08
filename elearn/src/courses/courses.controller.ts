import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ModulesService } from './modules/modules.service';
import { CreateModuleDto } from './modules/dto/create-module.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private modulesService: ModulesService
  ) {}

  // Create a new course
  @Post()
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Query('instructorId') instructorId: string // Changed to query param
  ) {
    return this.coursesService.createCourse(createCourseDto, instructorId);
  }

  // Get all courses
  @Get()
  async getAllCourses() {
    return this.coursesService.getCourses();
  }

  // Get courses by instructor
  @Get('instructor/:id')
  async getCoursesByInstructor(@Param('id') instructorId: string) {
    return this.coursesService.getCoursesByInstructor(instructorId);
  }

  // Create a new module for a specific course
  @Post(':courseId/modules')
  async createModule(
    @Param('courseId') courseId: string,
    @Body() createModuleDto: CreateModuleDto
  ) {
    return this.modulesService.createModule(courseId, createModuleDto);
  }

  // Get all modules for a specific course
  @Get(':courseId/modules')
  async getModulesByCourse(@Param('courseId') courseId: string) {
    return this.modulesService.getModulesByCourse(courseId);
  }

  // Update a course by ID
  @Put(':id')
  async updateCourse(@Param('id') courseId: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.updateCourse(courseId, updateCourseDto);
  }

  // Get course details by ID
  @Get(':id')
  async getCourseById(@Param('id') courseId: string) {
    return this.coursesService.getCourseById(courseId);
  }

  // Delete a course
  @Delete(':id')
  async deleteCourse(@Param('id') courseId: string) {
    return this.coursesService.deleteCourse(courseId);
  }

  // Search courses
  @Get('search')
async searchCourses(@Query('query') query: string) {
  if (!query) {
    throw new Error('Query parameter is required');
  }
  try {
    return await this.coursesService.searchCourses(query);
  } catch (error) {
    throw new Error('Error searching for courses: ' + error.message);
  }
}
  

}
