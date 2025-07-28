import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CustomerShipping } from './customer-shipping.entity';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  companyName: string;

  @Column({ nullable: true })
  gender: string;

  @Column()
  address: string;

  @Column()
  zipCode: string;

  @Column()
  typeOfDocument: string;

  @Column()
  document: string;

  @Column()
  internalCode: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @OneToMany(() => CustomerShipping, customerShipping => customerShipping.customer)
  customerShipping: CustomerShipping[];

}
