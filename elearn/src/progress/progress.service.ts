import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Progress, ProgressDocument } from './progress.schema';
import { Course, CourseDocument } from 'src/courses/courses.schema'; 

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>, 
  ) {}

  // Get the progress of a user in a specific course
  async getStudentProgress(userId: string, courseId: string): Promise<Progress> {
    return this.progressModel.findOne({ userId: new Types.ObjectId(userId), courseId: new Types.ObjectId(courseId) }).exec();
  }

  // Update module completion for a user in a course
  async updateModuleCompletion(userId: string, courseId: string): Promise<Progress> {
    return this.progressModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId), courseId: new Types.ObjectId(courseId) },
      { $set: { completionPercentage: 100 } },  // Update to 100% completion
      { new: true, upsert: true },
    );
  }

  // Update quiz score for a user in a course
  async updateQuizScore(userId: string, quizId: string, score: number): Promise<Progress> {
    return this.progressModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId), 'quizzes.quizId': new Types.ObjectId(quizId) },
      { $set: { 'quizzes.$.score': score } },
      { new: true, upsert: true },
    );
  }

  // Get the learning path for a user: courses they haven't completed
  async getLearningPath(userId: string): Promise<Course[]> {
    const progress = await this.progressModel.find({ userId: new Types.ObjectId(userId) }).exec();
    const completedCourses = progress.filter(p => p.completionPercentage === 100).map(p => p.courseId);
    return this.courseModel.find({ _id: { $nin: completedCourses } }).exec();
  }
}
