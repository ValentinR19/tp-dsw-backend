import { UserRole } from '@main-module/roles/models/classes/user-role.entity';
import { UserRoleRepository } from '@main-module/roles/repositories/user-role.repository';
import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

@Injectable()
export class UserRoleService {
  constructor(private readonly userRoleRepository: UserRoleRepository) {}

  async save(body: Partial<UserRole>[], queryRunner?): Promise<UserRole[]> {
    return this.userRoleRepository.save(body, queryRunner);
  }

  removedByUserId(userId: number, queryRunner?: QueryRunner): Promise<void> {
    return this.userRoleRepository.removedAllByUserId(userId, queryRunner);
  }
}
