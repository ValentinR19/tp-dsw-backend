import { AuditEntity } from '@shared-module/models/classes/audit.entity';
import { User } from '@users-module/models/classes/user.entity';
import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
@Index(['name'], { unique: true })
export class Role extends AuditEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 250, unique: true })
  name: string;

  @Column({ name: 'is_public', type: 'boolean', default: true })
  isPublic: boolean;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  // @ManyToMany(() => Permission, (rolePermission) => rolePermission.roles)
  // @JoinTable({
  //   name: 'roles_permissions',
  //   joinColumn: { name: 'role_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  // })
  // permissions: Permission[];

  // @ManyToMany(() => Informe, (informe) => informe.roles)
  // informes: Informe[];
}
