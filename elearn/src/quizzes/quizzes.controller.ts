import { Controller, Post, Body, Param } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  // Endpoint to create a quiz
  @Post('create')
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.createQuiz(createQuizDto);
  }

  // Endpoint to get a quiz by ID
  @Post(':id/submit')
  async submitQuiz(
    @Param('id') id: string,
    @Body() answers: any,
  ) {
    return this.quizzesService.submitQuiz(id, answers);
  }
}
