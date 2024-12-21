import { Injectable , UnauthorizedException , NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email }).exec();
  }

  // Create user with pre-hashed password
  async create(name: string, email: string, passwordHash: string, role: string): Promise<any> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new Error('Email already exists.');
    }

    // Proceed with creating the user with the hashed password
    const newUser = new this.userModel({
      name,
      email,
      passwordHash, // We use the hashed password directly
      role
    });

    await newUser.save();
    return newUser;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  isValidRole(role: string): boolean {
    const validRoles = ['student', 'instructor', 'admin']; // as defined in your schema
    return validRoles.includes(role);
  }

  // Validate user credentials during login
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.findOne(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async verifyEmail(token: string): Promise<boolean> {
    const user = await this.userModel.findOne({ emailVerificationToken: token });
    if (!user) {
      return false;
    }

    user.isEmailVerified = true;
    await user.save();
    return true;
  }

  async updateStudentProfile(userId: string, updateDto: any): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user || user.role !== 'student') {
      throw new Error('User not found or not a student');
    }
    user.learningPreferences = updateDto.learningPreferences;
    user.subjectsOfInterest = updateDto.subjectsOfInterest;
    await user.save();
    return user;
  }

  async updateInstructorProfile(userId: string, updateDto: any): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user || user.role !== 'instructor') {
      throw new Error('User not found or not an instructor');
    }
    user.expertiseAreas = updateDto.expertiseAreas;
    user.teachingInterests = updateDto.teachingInterests;
    await user.save();
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async updateUser(userId: string, userUpdates: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(userId, userUpdates, { new: true });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
