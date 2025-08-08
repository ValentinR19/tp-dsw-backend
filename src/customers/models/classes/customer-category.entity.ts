import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('customer_category')
export class CustomerCategory {
  @PrimaryGeneratedColumn({ type: 'decimal', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 20, name: 'name' })
  name: string;

  @Column({ type: 'boolean', name: 'active' })
  active: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @Exclude()
  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    default: null,
    precision: 0,
    select: false,
  })
  deletedAt: Date | null;
}
