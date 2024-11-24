import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ModuleDocument = Module & Document;

@Schema()
export class Module {

    @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
    courseId: Types.ObjectId;  // Reference to a course

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop([String])  // Array of strings
  resources: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
