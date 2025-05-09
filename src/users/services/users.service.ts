import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../models/entities/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersService {
  //Inyeccion del userRepository
  constructor(private readonly userRepository: UserRepository) {}

  async CreateUser(user: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUsers() {
    return await this.userRepository.findActiveUsers();
  }

  async getUser(id: number): Promise<User> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    try {
      return await this.userRepository.save({ id, ...user });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.userRepository.softDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
