import { TipoInforme } from '@main-module/permission/informes/models/classes/tipo-informe.entity';
import { Role } from '@main-module/roles/models/classes/role.entity';
import { AuditEntity } from '@shared-module/models/classes/audit.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('informes', { schema: 'crm_v3' })
export class Informe extends AuditEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column('varchar', { name: 'description', length: 100 })
  description: string;

  @Column('varchar', { name: 'icon', length: 45 })
  icon: string;

  @Column('varchar', { name: 'url', length: 200 })
  url: string;

  @Column('int', { name: 'id_tipo_informe' })
  idTipoInforme: number;

  @ManyToOne(() => TipoInforme, (tipoInforme) => tipoInforme.informes)
  @JoinColumn([{ name: 'id_tipo_informe', referencedColumnName: 'id' }])
  tipoInforme: TipoInforme;

  @ManyToMany(() => Role, (role) => role.informes)
  @JoinTable({
    name: 'roles_informes',
    joinColumn: { name: 'informe_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
