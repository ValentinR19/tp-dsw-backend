import { BudgetItem } from '@budgets-module/models/classes/budget-item.entity';
import { BudgetShipping } from '@budgets-module/models/classes/budget-shipping.entity';
import { BudgetStatusHistory } from '@budgets-module/models/classes/budget-status-history.entity';
import { BudgetStatus } from '@budgets-module/models/classes/budget-status.entity';
import { Customer } from '@customers-module/models/classes/customer.entity';
import { Currency } from '@main-module/shared/models/classes/currency.entity';
import { AuditEntity } from '@shared-module/models/classes/audit.entity';
import { User } from '@users-module/models/classes/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'budget' })
export class Budget extends AuditEntity {
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

  @Column({ type: 'int', name: 'customer_id' })
  customerId: number;

  @Column({ type: 'int', name: 'seller_id' })
  sellerId: number;

  @Column({ type: 'int', name: 'currency_id' })
  currencyId: number;

  @Column({ type: 'int', name: 'status_id', default: 1 })
  statusId: number;

  @ManyToOne(() => BudgetStatus, (status) => status.budgets, { nullable: true })
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  status: BudgetStatus;

  @OneToMany(() => BudgetItem, (item) => item.budget)
  items: BudgetItem[];

  @OneToMany(() => BudgetStatusHistory, (history) => history.budget)
  statusHistory: BudgetStatusHistory[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'seller_id', referencedColumnName: 'id' })
  seller: User;

  @ManyToOne(() => Customer, { nullable: true })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

  @ManyToOne(() => Currency, (currency) => currency.budgets, { nullable: true })
  @JoinColumn({ name: 'currency_id', referencedColumnName: 'id' })
  currency: Currency;

  @OneToOne(() => BudgetShipping, (budgetShipping) => budgetShipping.budget)
  budgetShipping: BudgetShipping;
}
