import { AuthModule } from '@main-module/auth/auth.module';
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
];
