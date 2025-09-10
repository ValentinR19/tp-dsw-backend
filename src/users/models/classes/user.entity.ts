import { Role } from '@main-module/roles/models/classes/role.entity';
import { AuditEntity } from '@shared-module/models/classes/audit.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ unique: true, type: 'varchar', length: 20, name: 'username', collation: 'utf8mb4_bin', nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, name: 'password' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 20, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 20, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 50, name: 'email' })
  email: string;

  @Column({ type: 'boolean', name: 'active', default: true })
  active: boolean;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
