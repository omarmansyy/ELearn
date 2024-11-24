import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  difficultyLevel: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
