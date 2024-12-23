import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './quizzes.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
  ) {}

  // Create a quiz with questions
  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const createdQuiz = new this.quizModel(createQuizDto);
    return createdQuiz.save();
  }

  // Retrieve quiz by ID
  async getQuiz(id: string): Promise<Quiz> {
    return this.quizModel.findById(id).exec();
  }

  // Submit quiz answers and provide real-time feedback
  async submitQuiz(id: string, answers: any): Promise<any> {
    const quiz = await this.quizModel.findById(id).exec();
    const feedback = [];
    let score = 0;
    let currentDifficulty = 'easy'; // Start with easy questions
    const questionSet = quiz.questions.filter(q => q.difficulty === currentDifficulty);

    // Loop through the questions and provide feedback
    questionSet.forEach((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      score += isCorrect ? 1 : 0;

      feedback.push({
        question: question.questionText,
        correctAnswer: question.correctAnswer,
        userAnswer,
        isCorrect,
      });

      // Dynamically adjust difficulty based on user performance
      if (score / questionSet.length >= 0.7) {
        currentDifficulty = 'hard'; // Move to harder questions if score is above 70%
      } else if (score / questionSet.length < 0.4) {
        currentDifficulty = 'easy'; // Stay at easy or go to easier questions if score is below 40%
      } else {
        currentDifficulty = 'medium'; // If score is in-between, move to medium difficulty
      }
    });

    return {
      score,
      feedback,
      difficultyLevel: currentDifficulty,
    };
  }
}
