import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model , Types } from 'mongoose';
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

    // Retrieve all progress records for a specific user
    async findProgressByUserId(userId: Types.ObjectId): Promise<Progress[]> {
        return this.progressModel.find({ userId }).populate('courseId');
    }

    // Calculate overall completion rate for a specific user
    async calculateCompletionRate(userId: Types.ObjectId): Promise<number> {
        const progressRecords = await this.findProgressByUserId(userId);
        const total = progressRecords.reduce((acc, curr) => acc + curr.completionPercentage, 0);
        return total / progressRecords.length;
    }

    // Retrieve progress details for all students in a specific course (for instructors)
    async getCourseProgress(courseId: Types.ObjectId): Promise<Progress[]> {
        return this.progressModel.find({ courseId }).populate('userId');
    }

    async getCourseAnalytics(courseId: Types.ObjectId): Promise<any[]> {
        const progressData = await this.progressModel.find({ courseId }).populate({
            path: 'userId',  // Assuming you have a reference to a User schema
            select: 'name email'  // Only fetch the name and email of the user, adjust according to your user schema
        }).exec();

        // Transform the data if needed, or return as is
        return progressData.map(item => ({
            studentId: item.userId._id,
            completionPercentage: item.completionPercentage,
            lastAccessed: item.lastAccessed
        }));
    }

    
    // More detailed analytics functions can be added here
}
