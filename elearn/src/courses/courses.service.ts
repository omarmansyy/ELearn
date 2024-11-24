import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './courses.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findOne(id: string): Promise<Course> {
    return this.courseModel.findById(id).exec();
  }

  async create(course: Course): Promise<Course> {
    const newCourse = new this.courseModel(course);
    return newCourse.save();
  }

  async update(id: string, course: Course): Promise<Course> {
    return this.courseModel.findByIdAndUpdate(id, course, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.courseModel.findByIdAndDelete(id).exec();
  }
}
