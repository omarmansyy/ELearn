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
