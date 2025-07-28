import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { JoinColumn } from 'typeorm';

@Entity('customer_shipping')
export class CustomerShipping {
  @PrimaryGeneratedColumn({type:'int',name:'id'})
  id: number;

 @Column({type:'int',name:'customer_id'})
  customerId: number;

  @Column({type:'varchar',name:'recipient_first_name'})
  recipientFirstName: string;

  @Column({type:'varchar',name:'recipient_last_name'})
  recipientLastName: string;

  @Column({type:'varchar',name:'recipient_company_name'})
  recipientEmail: string;

  @Column({ type:'varchar', name:'phone_number' })
  phoneNumber: string;

  @Column({type:'varchar', name:'phone_area_code' })
  phoneAreaCode: string;

  @Column({type:'varchar', name:'alias'})
  alias: string;

  @Column({type:'varchar', name:'adress'})
  adress: string;

  @Column({type:'int',name:'number'})
  number: string;

  @Column({type:'int', name:'complement'})
  complement: string;

  @Column({type:'int',name:'postal_code'})
  postalCode: string;

  @Column({ type: 'varchar', name:'delivery_instructions' })
  deliveryInstructions: string;

  @Column({type:'varchar',name:'created_at'})
  createdAt: string;

  @Column({type:'varchar',name:'updated_at'})
  updatedAt: string;

  @Column({type:'varchar',name:'deleted_at'})
  deletedAt: string;
@ManyToOne(() => Customer, customer => customer.customerShipping)
@JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer
}
