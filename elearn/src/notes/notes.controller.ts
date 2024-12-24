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
  @Get()
  async findAll(): Promise<any[]> {
      return await this.notesService.findAll();
  }
  // Get all notes for a specific user
  @Get('user/:userId')
  async getNotes(@Param('userId') userId: string) {
    return this.notesService.getNotes(userId);
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
