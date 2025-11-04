import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { DeepPartial, QueryRunner, Repository } from 'typeorm';
import { User } from '../models/classes/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async search(page: number, resultSize: number, global?: string, filters?: Partial<User>): Promise<IPaginated<User>> {
    const query = this.repository.createQueryBuilder('user');

    if (global) {
      query.andWhere('(user.firstName LIKE :global OR user.username LIKE :global OR user.lastName LIKE :global OR user.email LIKE :global )', {
        global: `%${global}%`,
      });
    } else {
      const username = filters?.username;
      const email = filters?.email;
      const firstName = filters?.firstName;
      const lastName = filters?.lastName;

      if (username) {
        query.andWhere('user.username like :username', { username: `%${username}%` });
      }
      if (email) {
        query.andWhere('user.email like :email', { email: `%${email}%` });
      }
      if (firstName) {
        query.andWhere('user.firstName like :firstName', { firstName: `%${firstName}%` });
      }
      if (lastName) {
        query.andWhere('user.lastName like :lastName', { lastName: `%${lastName}%` });
      }
    }
    const [data, count] = await query
      .skip(resultSize * (page - 1))
      .take(resultSize)
      .getManyAndCount();

    return { data, count };
  }

  async findActiveUsers(): Promise<User[]> {
    return await this.repository.find({ where: { active: true } });
  }

  async findById(id: number): Promise<User> {
    return this.repository.findOneOrFail({
      where: { id },
      relations: {
        roles: true,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({ where: { username: username } });
  }

  async save(user: DeepPartial<User>, queryRunner?: QueryRunner): Promise<User> {
    const repository = queryRunner ? queryRunner.manager.getRepository(User) : this.repository;
    return repository.save(user);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
