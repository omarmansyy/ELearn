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

  @Prop([String])  
  resources: string[];  // Array to store file paths/URLs

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: 1 })  
  version: number;

  @Prop([{ type: Object }])
  previousVersions: Partial<Module>[]; // Stores versions of the module

  @Prop({ type: Types.ObjectId, ref: 'Module', default: null })
  parentModuleId: Types.ObjectId | null; // For hierarchical structure, allows nested modules (e.g., lessons under units)
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
