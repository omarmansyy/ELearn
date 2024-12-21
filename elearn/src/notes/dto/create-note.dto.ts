import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateNoteDto {
  @IsNotEmpty()
  userId: Types.ObjectId; // The user who owns the note

  @IsOptional()
  courseId?: Types.ObjectId; // Optional reference to a course

  @IsString()
  @IsNotEmpty()
  content: string; // The content of the note
}
