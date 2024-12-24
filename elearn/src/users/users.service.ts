import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { StudentUpdateDto } from './dto/student-update.dto';
import { RegisterRequestDto } from 'src/auth/dto/RegisterRequestDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  

    constructor(
        @InjectModel(User.name) private userModel: mongoose.Model<User>
    ) { }

    async createUser(registerDto: RegisterRequestDto): Promise<User> {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
  
      const newUser = new this.userModel({
        ...registerDto,
        passwordHash: hashedPassword,
        createdAt: new Date(),
        isEmailVerified: false
        
      });
  
      return newUser.save();
    }
    async findByName(username: string):Promise<UserDocument> {
        return await this.userModel.findOne({username});  // Fetch a student by username
    }
    async findByEmail(email: string):Promise<UserDocument> {
        const user=await this.userModel.findOne({email})
        return user;  // Fetch a student by username
    }
    // Get all students
    async findAll(): Promise<UserDocument[]> {
        let students= await this.userModel.find();  // Fetch all students from the database
        console.log(students)
        return students
    }

    // Get a student by ID
    async findById(id: string): Promise<UserDocument> {
        console.log(id)
        const student=  await this.userModel.findById(id);  // Fetch a student by ID
        return student
    }

    // Update a student's details by ID
    async update(id: string, updateData: StudentUpdateDto): Promise<UserDocument> {
        return await this.userModel.findByIdAndUpdate(id, updateData, { new: true });  // Find and update the student
    }

    // Delete a student by ID
    async delete(id: string): Promise<UserDocument> {
        return await this.userModel.findByIdAndDelete(id);  // Find and delete the student
    }
}