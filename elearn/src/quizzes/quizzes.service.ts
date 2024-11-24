import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './quizzes.schema';

@Injectable()
export class QuizzesService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async findAll(): Promise<Quiz[]> {
    return this.quizModel.find().populate('moduleId').exec();
  }

  async findOne(id: string): Promise<Quiz> {
    return this.quizModel.findById(id).populate('moduleId').exec();
  }

  async create(quiz: Quiz): Promise<Quiz> {
    const newQuiz = new this.quizModel(quiz);
    return newQuiz.save();
  }

  async update(id: string, quiz: Quiz): Promise<Quiz> {
    return this.quizModel.findByIdAndUpdate(id, quiz, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.quizModel.findByIdAndDelete(id).exec();
  }
}
