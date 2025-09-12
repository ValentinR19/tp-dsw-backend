import { AuditEntity } from '@shared-module/models/classes/audit.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer_category')
export class CustomerCategory extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 20, name: 'name' })
  name: string;

  @Column({ type: 'boolean', name: 'active' })
  active: boolean;
}
