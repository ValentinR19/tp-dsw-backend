import { AuthModule } from '@main-module/auth/auth.module';
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
];
