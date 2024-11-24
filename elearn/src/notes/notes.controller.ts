import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './notes.schema';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  getAllNotes() {
    return this.notesService.findAll();
  }

  @Get(':id')
  getNote(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Post()
  createNote(@Body() note: Note) {
    return this.notesService.create(note);
  }

  @Put(':id')
  updateNote(@Param('id') id: string, @Body() note: Note) {
    return this.notesService.update(id, note);
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    return this.notesService.delete(id);
  }
}
