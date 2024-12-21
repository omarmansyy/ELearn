// src/quizzes/dto/create-quiz.dto.ts
import { IsArray, IsNotEmpty, IsString, IsObject } from 'class-validator';

class QuestionDto {
  @IsString()
  @IsNotEmpty()
  questionText: string;

  @IsArray()
  options: string[];

  @IsString()
  @IsNotEmpty()
  correctAnswer: string;
}

export class CreateQuizDto {
  @IsNotEmpty()
  moduleId: string; // Module ID to associate quiz with

  @IsArray()
  @IsNotEmpty()
  questions: QuestionDto[];
}
