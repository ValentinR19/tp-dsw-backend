import { RoleController } from '@main-module/roles/controllers/role.controller';
import { Role } from '@main-module/roles/models/classes/role.entity';
import { UserRole } from '@main-module/roles/models/classes/user-role.entity';
import { RoleRepository } from '@main-module/roles/repositories/role.repository';
import { UserRoleRepository } from '@main-module/roles/repositories/user-role.repository';
import { RoleService } from '@main-module/roles/services/role.service';
import { UserRoleService } from '@main-module/roles/services/user-role.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role, UserRole])],
  controllers: [RoleController],
  providers: [RoleRepository, UserRoleRepository, RoleService, UserRoleService],
  exports: [],
})
export class RolesModule {}
