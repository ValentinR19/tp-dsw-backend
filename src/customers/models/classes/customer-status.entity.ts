import { Customer } from '@customers-module/models/classes/customer.entity';
import { AuditEntity } from '@shared-module/models/classes/audit.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer_status')
export class CustomerStatus extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 20, name: 'name', unique: true })
  name: string;

  @Column({ type: 'varchar', length: 20, name: 'color' })
  color: string;

  @OneToOne(() => Customer, (customer) => customer.status)
  customer: Customer;
}
