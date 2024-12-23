import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuizDocument = Quiz & Document;

class Question {
  @Prop({ required: true })
  questionText: string;

  @Prop({ required: true })
  options: string[];

  @Prop()
  correctAnswer: string;
}

@Schema()
export class Quiz {

  @Prop({ required: true, type: Types.ObjectId, ref: 'Module' })
  moduleId: Types.ObjectId;

  @Prop([Question])
  questions: Question[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
