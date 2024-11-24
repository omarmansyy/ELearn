import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './quizzes.schema';

@Controller('quizzes')
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @Get()
  getAllQuizzes() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  getQuiz(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }

  @Post()
  createQuiz(@Body() quiz: Quiz) {
    return this.quizzesService.create(quiz);
  }

  @Put(':id')
  updateQuiz(@Param('id') id: string, @Body() quiz: Quiz) {
    return this.quizzesService.update(id, quiz);
  }

  @Delete(':id')
  deleteQuiz(@Param('id') id: string) {
    return this.quizzesService.delete(id);
  }
}
