import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ResponseDocument = Response & Document;

class Answer {
  @Prop({ required: true })
  questionId: Types.ObjectId;

  @Prop()
  answerText: string;
}

@Schema()
export class Response {
  
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Quiz' })
  quizId: Types.ObjectId;

  @Prop([Answer])
  answers: Answer[];

  @Prop()
  score: number;

  @Prop({ default: Date.now })
  submittedAt: Date;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
