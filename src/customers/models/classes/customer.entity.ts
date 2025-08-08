import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CustomerShipping } from './customer-shipping.entity';
@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn({ type: 'decimal', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 20, name: 'first_name' })
  firstName: string;

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

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

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

  @OneToMany(() => CustomerShipping, (customerShipping) => customerShipping.customer)
  customerShipping: CustomerShipping[];
}
