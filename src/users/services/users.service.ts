import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { DeepPartial } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../models/entities/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }

  async CreateUser(user: CreateUserDto): Promise<User> {
    try {
      const existUser = await this.getByUsername(user.userName);
      if (existUser) {
        throw new BadRequestException('El usuario ya existe');
      }
      return await this.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUsers() {
    return await this.userRepository.findActiveUsers();
  }
  async getByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
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
      return await this.save({ id, ...user });
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

  private async save(dto: DeepPartial<User>): Promise<User> {
    try {
      if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
      const user = await this.userRepository.save(dto);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
