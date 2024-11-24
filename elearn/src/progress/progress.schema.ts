import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProgressDocument = Progress & Document;

@Schema()
export class Progress {

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Course' })
  courseId: Types.ObjectId;

  @Prop({ required: true })
  completionPercentage: number;

  @Prop({ default: Date.now })
  lastAccessed: Date;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
