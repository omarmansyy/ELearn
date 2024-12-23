import { UsersService } from './users.service';
import { User } from './users.schema';
import { Controller, Post, Body, Request, UseGuards, Get, Put , Param , Query} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { StudentUpdateDto } from './dto/student-update.dto';
import { InstructorUpdateDto } from './dto/instructor-update.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Put('update-student/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
   async updateStudentProfile(@Param('id') id: string, @Body() updateDto: StudentUpdateDto) {
        return this.updateStudentProfile(id, updateDto);
    }

  
    @Put('update-instructor/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('instructor')
    async updateInstructorProfile(@Param('id') id: string, @Body() updateDto: InstructorUpdateDto) {
        return this.updateInstructorProfile(id, updateDto);
    }
}
