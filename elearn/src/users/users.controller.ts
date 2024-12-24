import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { StudentUpdateDto } from './dto/student-update.dto';
import { AuthGuard } from 'src/auth/guards/authentication.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { authorizationGaurd } from 'src/auth/guards/authorization.gaurd';

// @UseGuards(AuthGuard) //class level
@Controller('students') // it means anything starts with /student
export class UsersController {
    constructor(private studentService: UsersService) { }
    @Public()
    @Get() 
    // Get all students
    async getAllStudents(): Promise<User[]> {
        return await this.studentService.findAll();
    }
    @UseGuards(AuthGuard)// handler level

    @Get('currentUser')
    async getCurrentUser(@Req() {user}): Promise<User> {
        const student = await this.studentService.findById(user.userid);
        console.log(student)
        return student;
    }


    @Roles(Role.User)
    @UseGuards(authorizationGaurd)
    @Get(':id')// /student/:id
    // Get a single student by ID
    async getStudentById(@Param('id') id: string):Promise<User> {// Get the student ID from the route parameters
        const student = await this.studentService.findById(id);
        return student;
    }
    // Create a new student
   
    // Update a student's details
    @Put(':id')
    async updateStudent(@Param('id') id:string,@Body()studentData: StudentUpdateDto) {
        const updatedStudent = await this.studentService.update(id, studentData);
        return updatedStudent;       
    }
    // Delete a student by ID
    @Delete(':id')
    async deleteStudent(@Param('id')id:string) {
        const deletedStudent = await this.studentService.delete(id);
       return deletedStudent;
    }
}