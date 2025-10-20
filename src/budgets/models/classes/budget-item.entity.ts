import { Budget } from '@budgets-module/models/classes/budget.entity';
import { Product } from '@product-module/models/classes/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'budget_item' })
export class BudgetItem {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'budget_id' })
  budgetId: number;

  @ManyToOne(() => Budget, (budget) => budget.items, { nullable: true })
  @JoinColumn({ name: 'budget_id', referencedColumnName: 'id' })
  budget: Budget;

  @Column({ type: 'int', name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (product) => product.budgetItems, { nullable: true })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @Column({ type: 'int', name: 'quantity' })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'unit_price' })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'discount' })
  discount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'tax' })
  tax: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'total_line' })
  totalLine: number;
}
