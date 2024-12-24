import { Controller, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { User } from './users.schema';

@Controller('admin')
export class AdminController {
    constructor(private usersService: UsersService) {}

    @Get('users')
    async getAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

   /* @Put('users/:id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: Partial<User>): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }*/

    @Delete('users/:id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        return this.usersService.delete(id);
    }
}
