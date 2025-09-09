import { Informe } from '@main-module/permission/informes/models/classes/informe.entity';
import { AuditEntity } from '@shared-module/models/classes/audit.entity';
import { User } from '@users-module/models/classes/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role extends AuditEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 250, unique: true })
  name: string;

  @Column({ name: 'is_public', type: 'boolean', default: true })
  isPublic: boolean;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Informe, (informe) => informe.roles)
  informes: Informe[];
}
