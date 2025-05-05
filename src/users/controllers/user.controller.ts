import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { User } from '../models/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.CreateUser(newUser);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    console.log(id);
    console.log(typeof id);
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  pdateUser(@Param('id', ParseIntPipe) id: number,@Body updateUserDto: UpdateUserDto)
  User: UpdateUserDto {
    return this.usersService.UpdateUser(id,User)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
