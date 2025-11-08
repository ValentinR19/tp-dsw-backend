import { Role } from '@main-module/roles/models/classes/role.entity';
import { CreateRoleDTO } from '@main-module/roles/models/dtos/create-role.dto';
import { UpdateRoleDTO } from '@main-module/roles/models/dtos/update-role.dto';
import { RoleRepository } from '@main-module/roles/repositories/role.repository';
import { Injectable, Logger } from '@nestjs/common';
import { NotFoundErrorException } from '@shared-module/exceptions/not-found.exception';
import { NotSavedErrorException } from '@shared-module/exceptions/not-saved.exception';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { User } from '@users-module/models/classes/user.entity';
import { QueryRunner } from 'typeorm';

@Injectable()
export class RoleService {
  private logger = new Logger(RoleService.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  async search(page: number, dto: PaginatedQueryDTO<Role>): Promise<IPaginated<Role>> {
    const { results, global, filters } = dto;
    //this.logger.log(`Searching roles. Page: ${page} - Size: ${results} - GlobalFilters: ${global} -  Filters: ${JSON.stringify(filters)}`);
    return this.roleRepository.search(page, results, global, filters);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  async findById(id: number): Promise<Role> {
    try {
      const role = await this.roleRepository.findById(id);
      return role;
    } catch (error) {
      throw new NotFoundErrorException(User.name, error);
    }
  }

  async findRolesByUserID(userID: number): Promise<Role[]> {
    try {
      const role = await this.roleRepository.findRolesByUserID(userID);
      return role;
    } catch (error) {
      throw new NotFoundErrorException(User.name, error);
    }
  }

  async save(role: Partial<Role>, queryRunner?: QueryRunner): Promise<Role> {
    try {
      //this.logger.log(`Saving role: ${JSON.stringify(role)}`);
      const savedRole = await this.roleRepository.save(role, queryRunner);
      //this.logger.log(`Role saved: ${JSON.stringify(savedRole)}`);
      return savedRole;
    } catch (error) {
      throw new NotSavedErrorException(User.name, error);
    }
  }

  async create(dto: CreateRoleDTO): Promise<Role> {
    //this.logger.log(`Creating role: ${JSON.stringify(dto)}`);
    return this.save(dto);
  }

  async softDelete(id: number): Promise<void> {
    try {
      //this.logger.log(`Soft deleting role by id: ${id}`);

      await this.roleRepository.softDelete(id);

      //this.logger.log(`Role soft deleted: ${id}`);
    } catch (error) {
      throw new NotSavedErrorException(User.name, error);
    }
  }

  async update(id: number, dto: UpdateRoleDTO): Promise<Role> {
    //this.logger.log(`Updating role: ${JSON.stringify(dto)}`);
    await this.findById(id);
    const updatedRole = await this.save({ id, ...dto });
    //this.logger.log(`Role updated: ${JSON.stringify(updatedRole)}`);
    return updatedRole;
  }
}
