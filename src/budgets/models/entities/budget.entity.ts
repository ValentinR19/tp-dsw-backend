import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  uniqueID: string;

  @Column()
  code: string;

  @Column()
  sale_number: string;

  @Column('decimal')
  subtotal: number;

  @Column('decimal')
  total_discount: number;

  @Column('decimal')
  total_tax: number;

  @Column('decimal')
  total: number;

  @Column()
  customer_id: string;

  @Column()
  seller_id: string;

  @Column()
  currency_id: string;

  @Column()
  status_id: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}