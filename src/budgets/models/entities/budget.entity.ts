import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'budget' })
export class Budget {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

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
