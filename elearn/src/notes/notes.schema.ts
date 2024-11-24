import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course' })
  courseId: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  lastUpdated: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
