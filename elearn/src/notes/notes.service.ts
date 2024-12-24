import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './notes.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

 
  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
}

  // Get all notes for a specific user (with or without course association)
  async getNotes(userId: string): Promise<Note[]> {
    return this.noteModel.find({ userId }).exec();
  }

  async create(note: Note): Promise<Note> {
    const newNote = new this.noteModel(note);
    return newNote.save();
  }

  async update(id: string, note: Note): Promise<Note> {
    return this.noteModel.findByIdAndUpdate(id, note, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.noteModel.findByIdAndDelete(id).exec();
  }
}
