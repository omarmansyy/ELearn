import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  toObject(): { [x: string]: any; passwordHash: any; } {
    throw new Error('Method not implemented.');
  }
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, enum: ['student', 'instructor', 'admin'] })
  role: string;

  @Prop()
  profilePictureUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  learningPreferences: string[];

  @Prop()
  subjectsOfInterest: string[];

    // Instructor-specific fields
  @Prop()
  expertiseAreas: string[];

  @Prop()
  teachingInterests: string[];
    
}

export const UserSchema = SchemaFactory.createForClass(User);
