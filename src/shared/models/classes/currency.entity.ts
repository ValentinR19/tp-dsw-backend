import { AuditEntity } from '@shared-module/models/classes/audit.entity';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('currencies')
export class Currency extends AuditEntity {
  constructor(nombre: string, cotizazcion: number, conversion: number, codigo: string) {
    super();
    this.name = nombre;
    this.quotation = cotizazcion;
    this.conversion = conversion;
    this.code = codigo;
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('decimal', {
    name: 'quotation',
    nullable: true,
    precision: 10,
    scale: 8,
  })
  quotation: number | null;

  @Column('decimal', {
    name: 'conversion',
    nullable: true,
    precision: 10,
    scale: 8,
    default: () => "'1.00000000'",
  })
  conversion: number | null;

  @Column('varchar', { name: 'code', length: 10 })
  code: string;
}
