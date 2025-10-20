import { Budget } from '@budgets-module/models/classes/budget.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('budget_billing')
export class BudgetBilling {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'budget_id' })
  budgetId: number;

  @Column({ type: 'varchar', length: 20, name: 'buyer_company' })
  buyerCompany: string;

  @Column({ type: 'varchar', length: 20, name: 'buyer_address' })
  buyerAddress: string;

  @Column({ type: 'varchar', name: 'consignee_address' })
  consigneeAddress: string;

  @Column({ type: 'int', name: 'buyer_tax_id' })
  buyerTaxId: number;

  @Column({ type: 'varchar', length: 30, name: 'shipping_country' })
  shippingCountry: string;

  @Column({ type: 'varchar', name: 'port_destination' })
  portDestination: string;

  @Column({ type: 'varchar', length: 50, name: 'payment_description' })
  paymentDescription: string;

  @OneToOne(() => Budget, (budget) => budget.budgetBilling, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'budget_id', referencedColumnName: 'id' })
  budget: Budget;
}
