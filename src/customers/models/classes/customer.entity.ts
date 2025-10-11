import { CustomerCategory } from '@customers-module/models/classes/customer-category.entity';
import { CustomerStatus } from '@customers-module/models/classes/customer-status.entity';
import { AuditEntity } from '@shared-module/models/classes/audit.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerShipping } from './customer-shipping.entity';
@Entity('customer')
export class Customer extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 20, name: 'first_name' })
  firstName: string;

  @Column({ type: 'int', name: 'category_id' })
  categoryId: number;

  @Column({ type: 'int', name: 'status_id' })
  statusId: number;

  @Column({ type: 'varchar', length: 20, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 20, name: 'company_name' })
  companyName: string;

  @Column({ type: 'varchar', length: 10, name: 'gender', nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 30, name: 'address' })
  address: string;

  @Column({ type: 'decimal', name: 'zip_code' })
  zipCode: string;

  @Column({ type: 'varchar', name: 'type_of_document' })
  typeOfDocument: string;

  @Column({ type: 'decimal', name: 'document' })
  document: string;

  @Column({ type: 'decimal', name: 'internal_code' })
  internalCode: string;

  @Column({ default: true, type: 'boolean', name: 'active' })
  active: boolean;

  @OneToMany(() => CustomerShipping, (customerShipping) => customerShipping.customer)
  customerShipping: CustomerShipping[];

  @OneToOne(() => CustomerCategory, (customerCategory) => customerCategory.customer)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  customerCategory: CustomerCategory;

  @OneToOne(() => CustomerStatus, (customerStatus) => customerStatus.customer)
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  status: CustomerStatus;
}
