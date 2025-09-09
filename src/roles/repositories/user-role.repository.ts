import { UserRole } from '@main-module/roles/models/classes/user-role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class UserRoleRepository {
  constructor(@InjectRepository(UserRole) private readonly repository: Repository<UserRole>) {}

  async save(body: Partial<UserRole>[], queryRunner?: QueryRunner): Promise<UserRole[]> {
    const repository = queryRunner ? queryRunner.manager.getRepository(UserRole) : this.repository;
    return repository.save(body);
  }

  async removedAllByUserId(userId: number, queryRunner?: QueryRunner): Promise<void> {
    const repository = queryRunner ? queryRunner.manager.getRepository(UserRole) : this.repository;
    await repository.delete({ userId });
  }
}
