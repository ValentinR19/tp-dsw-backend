import { Role } from '@main-module/roles/models/classes/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { Repository } from 'typeorm';
@Injectable()
export class RoleRepository {
  constructor(@InjectRepository(Role) private readonly repository: Repository<Role>) {}

  async search(page: number, resultSize: number, global?: string, filters?: Partial<Role>): Promise<IPaginated<Role>> {
    const query = this.repository
      .createQueryBuilder('role')
      .select(['role.id', 'role.name'])
      .leftJoinAndSelect('role.permissions', 'permissions')
      .leftJoinAndSelect('role.users', 'users')
      .where('role.isPublic = true')
      .orderBy('role.name', 'ASC');

    if (global) {
      query.andWhere('(role.name LIKE :global)', { global: `%${global}%` });
    } else if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query.andWhere(`role.${key} LIKE :${key}`, { [key]: `%${value}%` });
      });
    }
    const [data, count] = await query
      .skip(resultSize * (page - 1))
      .take(resultSize)
      .getManyAndCount();

    return { data, count };
  }

  async findAll() {
    return this.repository.find({
      where: {
        isPublic: true,
      },
    });
  }

  async findById(id: number): Promise<Role> {
    return this.repository.findOneOrFail({
      where: {
        id,
      },
      relations: {
        //  permissions: true,
        informes: true,
      },
    });
  }

  async findRolesByUserID(userId: number): Promise<Role[]> {
    return this.repository.find({
      where: {
        users: {
          id: userId,
        },
      },
    });
  }

  async save(role: Partial<Role>): Promise<Role> {
    return this.repository.save(role);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
