import { Budget } from '@budgets-module/models/classes/budget.entity';

import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('currencies')
export class Currency {
  constructor(nombre: string, cotizazcion: number, conversion: number, codigo: string) {
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

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @Exclude()
  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    default: null,
    select: false,
  })
  deletedAt: Date | null;

  @OneToMany(() => Budget, (budget) => budget.currency)
  budgets: Budget[];
}
