import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { Response } from './responses.schema';

@Controller('responses')

export class ResponsesController {
  constructor(private responsesService: ResponsesService) {}

  @Get()
  getAllResponses() {
    return this.responsesService.findAll();
  }
  @Get(':id')
  getResponse(@Param('id') id: string) {
    return this.responsesService.findOne(id);
  }

  @Post()
  createResponse(@Body() response: Response) {
    return this.responsesService.create(response);
  }

  @Put(':id')
  updateResponse(@Param('id') id: string, @Body() response: Response) {
    return this.responsesService.update(id, response);
  }

  @Delete(':id')
  deleteResponse(@Param('id') id: string) {
    return this.responsesService.delete(id);
  }
}
