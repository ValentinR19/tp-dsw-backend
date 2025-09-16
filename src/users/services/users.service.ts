import { UserRole } from '@main-module/roles/models/classes/user-role.entity';
import { UserRoleService } from '@main-module/roles/services/user-role.service';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import * as bcrypt from 'bcrypt';
import { DataSource, DeepPartial, QueryRunner } from 'typeorm';
import { User } from '../models/classes/user.entity';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { UpdateUserDto } from '../models/dto/update-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleService: UserRoleService,
    private readonly dataSource: DataSource,
  ) {}

  async search(page: number, dto: PaginatedQueryDTO<User>): Promise<IPaginated<User>> {
    const { results, global, filters } = dto;
    return await this.userRepository.search(page, results, global, filters);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { roles, ...user } = dto;
      const existUser = await this.getByUsername(user.username);

      if (existUser) throw new BadRequestException('El usuario ya existe');

      const savedUser = await this.save(user, queryRunner);
      const payloadRoles = roles.map((role) => ({ roleId: role.id, userId: savedUser.id }));

      await this.userRoleService.save(payloadRoles, queryRunner);
      await queryRunner.commitTransaction();
      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getUsers() {
    return await this.userRepository.findActiveUsers();
  }

  async getByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async findById(id: number): Promise<User> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw new NotFoundException(User.name, error);
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.findById(id);

      const { roles, ...user } = dto;
      const updatedUser = await this.save({ id, ...user }, queryRunner);

      if (roles) {
        await this.userRoleService.removedByUserId(id, queryRunner);
        const payloadRoles = roles.map((role) => ({ userId: updatedUser.id, roleId: role.id }) as Partial<UserRole>);
        await this.userRoleService.save(payloadRoles, queryRunner);
      }

      await queryRunner.commitTransaction();
      return updatedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.userRepository.softDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async save(dto: DeepPartial<User>, queryRunner?: QueryRunner): Promise<User> {
    try {
      if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
      const user = await this.userRepository.save(dto, queryRunner);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
