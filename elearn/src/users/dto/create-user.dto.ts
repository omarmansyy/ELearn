<<<<<<< HEAD
import { Course } from "src/courses/courses.schema";
export class CreateUserDto {
    email:string
    name: string;
    age: Number;
    role:string
    courses: Course[];
    password:string
  }
=======
import { IsString, IsEmail, IsNotEmpty ,IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
enum UserRole {
    Student = 'student',
    Instructor = 'instructor',
    Admin = 'admin',
  }

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ enum: UserRole, example: UserRole.Student })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole; 
}
>>>>>>> f7c45640766255b12145010e956b7f3c25885c0d
