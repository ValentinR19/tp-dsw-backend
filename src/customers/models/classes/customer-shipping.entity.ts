import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('customer_shipping')
export class CustomerShipping {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'customer_id' })
  customerId: number;

  @Column({ type: 'varchar', name: 'recipient_first_name' })
  recipientFirstName: string;

  @Column({ type: 'varchar', name: 'recipient_last_name' })
  recipientLastName: string;

  @Column({ type: 'varchar', name: 'recipient_company_name' })
  recipientEmail: string;

  @Column({ type: 'varchar', name: 'phone_number' })
  phoneNumber: string;

  @Column({ type: 'varchar', name: 'phone_area_code' })
  phoneAreaCode: string;

  @Column({ type: 'varchar', name: 'alias' })
  alias: string;

  @Column({ type: 'varchar', name: 'adress' })
  adress: string;

  @Column({ type: 'int', name: 'number' })
  number: string;

  @Column({ type: 'int', name: 'complement' })
  complement: string;

  @Column({ type: 'int', name: 'postal_code' })
  postalCode: string;

  @Column({ type: 'varchar', name: 'delivery_instructions' })
  deliveryInstructions: string;

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

  @ManyToOne(() => Customer, (customer) => customer.customerShipping)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;
}
