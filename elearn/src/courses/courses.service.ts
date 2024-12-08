import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from './courses.schema';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  // Create a course with an instructor
  async createCourse(createCourseDto: CreateCourseDto, instructorId: string): Promise<Course> {
    const instructorObjectId = new Types.ObjectId(instructorId)
    const course = new this.courseModel({
      ...createCourseDto,
      createdBy: instructorObjectId, // Corrected to use createdBy instead of instructor
    });
    return course.save();
  }

  // Get all courses
  async getCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  // Update a course by ID
  async updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    return this.courseModel.findByIdAndUpdate(courseId, updateCourseDto, { new: true }).exec();
  }

  // Get courses by instructor
  async getCoursesByInstructor(instructorId: string): Promise<Course[]> {
    return this.courseModel.find({ createdBy: instructorId }).exec();
  }

  // Get course details by ID
  async getCourseById(courseId: string): Promise<Course> {
    return this.courseModel.findById(courseId).exec();
  }

  // Delete a course
  async deleteCourse(courseId: string): Promise<Course> {
    return this.courseModel.findByIdAndDelete(courseId).exec();
  }

  // Search courses by title or description
  async searchCourses(query: string): Promise<Course[]> {
    return this.courseModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // case-insensitive match
        { description: { $regex: query, $options: 'i' } }, // case-insensitive match
      ],
    }).exec();
  }
  
}
