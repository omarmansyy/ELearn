import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './notes.schema';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
  ) {}

  // Create a new personal note for a user (with optional courseId)
  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  // Get all notes for a specific user (with or without course association)
  async getNotes(userId: string): Promise<Note[]> {
    return this.noteModel.find({ userId }).exec();
  }

  // Update a note by ID for a specific user
  async updateNote(id: string, content: string): Promise<Note> {
    return this.noteModel.findByIdAndUpdate(id, { content, lastUpdated: new Date() }, { new: true }).exec();
  }

  // Delete a note by ID for a specific user
  async deleteNote(id: string): Promise<any> {
    return this.noteModel.findByIdAndDelete(id).exec();
  }
}
