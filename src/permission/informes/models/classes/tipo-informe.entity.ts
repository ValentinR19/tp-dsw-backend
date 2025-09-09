import { Informe } from '@main-module/permission/informes/models/classes/informe.entity';
import { AuditEntity } from '@shared-module/models/classes/audit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipos_informes')
export class TipoInforme extends AuditEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column('varchar', { name: 'description', length: 50 })
  description: string;

  @Column('varchar', { name: 'icon', length: 50 })
  icon: string;

  @Column('varchar', { name: 'url', length: 500, default: null })
  url: string;

  @Column('int', { name: 'order_number', default: () => "'99'" })
  order: number;

  @OneToMany(() => Informe, (informe) => informe.tipoInforme)
  informes: Informe[];
}
