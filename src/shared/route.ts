import { CustomerModule } from '@customers-module/customers.module';
import { AuthModule } from '@main-module/auth/auth.module';
import { PermissionModule } from '@main-module/permission/permission.module';
import { RolesModule } from '@main-module/roles/roles.module';
import { UsersModule } from '@main-module/users/users.module';
import { Routes } from '@nestjs/core';

export const routes: Routes = [
  {
    path: 'users',
    module: UsersModule,
  },

  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'roles',
    module: RolesModule,
  },
  {
    path: 'permissions',
    module: PermissionModule,
  },
  {
    path: 'customers',
    module: CustomerModule,
  },
];
