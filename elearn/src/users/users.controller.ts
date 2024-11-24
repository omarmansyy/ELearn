import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: User) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
