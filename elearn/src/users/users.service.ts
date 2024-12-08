import { Injectable , UnauthorizedException , NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async create(userData: { email: string; password: string; role: string }): Promise<User | undefined> {
    if (!this.isValidRole(userData.role)) {
        throw new Error('Invalid role provided.');
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user object with hashed password
    const newUser = new this.userModel({
        email: userData.email,
        password: hashedPassword,
        role: userData.role
    });

    // Save the new user to the database
    await newUser.save();

    // Return the newly created user
    return newUser;
}
  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }
  isValidRole(role: string): boolean {
    const validRoles = ['student', 'instructor', 'admin']; // as defined in your schema
    return validRoles.includes(role);
}

  

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
    // Find the user by the verification token
    const user = await this.userModel.findOne({ emailVerificationToken: token });
    
    if (!user) {
        return false; // Return false if no user is found with the given token
    }

    // Verify the email if the token matches
    user.isEmailVerified = true;
    await user.save();

    return true; // Return true as the email has been successfully verified
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




