import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from './courses.schema';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { User, UserDocument } from 'src/users/users.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  @InjectModel(User.name) private userModel: Model<UserDocument>) {}

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
  
  
  async searchCourses(category?: string, instructorName?: string): Promise<Course[]> {
    let filter = {};
    let query = this.courseModel.find(filter);

    if (category) {
      filter['category'] = category;
    }

    if (instructorName) {
      const instructors = await this.userModel.find({ name: instructorName, role: 'instructor' }).select('_id');
      const instructorIds = instructors.map(doc => doc._id);
      filter['createdBy'] = { $in: instructorIds };
    }

    return query.populate('createdBy').exec();
  }
}
