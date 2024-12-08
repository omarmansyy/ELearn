import { Controller, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { User } from './users.schema';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
    constructor(private usersService: UsersService) {}

    @Get('users')
    async getAllUsers(): Promise<User[]> {
        return this.usersService.findAllUsers();
    }

    @Put('users/:id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: Partial<User>): Promise<User> {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete('users/:id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        return this.usersService.deleteUser(id);
    }
}
