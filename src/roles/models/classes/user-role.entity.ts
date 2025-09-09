import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users_roles' })
export class UserRole {
  @PrimaryColumn({ name: 'user_id', type: 'int' })
  userId: number;

  @PrimaryColumn({ name: 'role_id', type: 'int' })
  roleId: number;
}
