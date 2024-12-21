import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // Create a new personal note for a user (with optional courseId)
  @Post('create')
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }

  // Get all notes for a specific user
  @Get('user/:userId')
  async getNotes(@Param('userId') userId: string) {
    return this.notesService.getNotes(userId);
  }

  // Update a personal note by ID
  @Put(':id')
  async updateNote(@Param('id') id: string, @Body('content') content: string) {
    return this.notesService.updateNote(id, content);
  }

  // Delete a personal note by ID
  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    return this.notesService.deleteNote(id);
  }
}
