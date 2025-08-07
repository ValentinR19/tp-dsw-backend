import { BudgetItem } from '@budgets-module/models/classes/budget-item.entity';
import { BudgetStatusHistory } from '@budgets-module/models/classes/budget-status-history.entity';
import { BudgetStatus } from '@budgets-module/models/classes/budget-status.entity';
import { Customer } from '@customers-module/models/classes/customer.entity';
import { Currency } from '@main-module/shared/models/classes/currency.entity';
import { User } from '@users-module/models/classes/user.entity';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'budget' })
export class Budget {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'code', unique: true })
  code: string;

  @Column({ type: 'varchar', name: 'sale_number', unique: true })
  saleNumber: string;

  @Column({ type: 'decimal', name: 'subtotal' })
  subtotal: number;

  @Column({ type: 'decimal', name: 'total_discount' })
  totalDiscount: number;

  @Column({ type: 'decimal', name: 'total_tax' })
  totalTax: number;

  @Column({ type: 'decimal', name: 'total' })
  total: number;

  @Column({ type: 'varchar', name: 'customer_id' })
  customerId: string;

  @Column({ type: 'varchar', name: 'seller_id' })
  sellerId: string;

  @Column({ type: 'varchar', name: 'currency_id' })
  currencyId: string;

  @Column({ type: 'varchar', name: 'status_id' })
  statusId: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @Exclude()
  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    default: null,
    select: false,
  })
  deletedAt: Date | null;

  @ManyToOne(() => BudgetStatus, (status) => status.budgets)
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  status: BudgetStatus;

  @OneToMany(() => BudgetItem, (item) => item.budget)
  items: BudgetItem[];

  @OneToMany(() => BudgetStatusHistory, (history) => history.budget)
  statusHistory: BudgetStatusHistory[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'seller_id', referencedColumnName: 'id' })
  seller: User;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

  @ManyToOne(() => Currency, (currency) => currency.budgets)
  @JoinColumn([{ name: 'currency_id', referencedColumnName: 'id' }])
  currency: Currency;
}
