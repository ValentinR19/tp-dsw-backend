import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';
import { PageParamDTO } from '@shared-module/models/dtos/page-param.dto';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { UsersService } from 'src/users/services/users.service';
import { User } from '../models/classes/user.entity';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { UpdateUserDto } from '../models/dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('page/:pageNumber')
  async search(@Param() { pageNumber }: PageParamDTO, @Query() dto: PaginatedQueryDTO<User>): Promise<IPaginated<User>> {
    return this.usersService.search(pageNumber, dto);
  }

 
  @Post()
  async createUser(@Body() newUser: CreateUserDto): Promise<User> {
    return this.usersService.CreateUser(newUser);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
