import { Budget } from '@budgets-module/models/classes/budget.entity';
import { ProductVariant } from '@main-module/products/models/classes/product-variant.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'budget_item' })
export class BudgetItem {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Budget, (budget) => budget.items)
  budget: Budget;

  @Column({ type: 'int', name: 'budget_id' })
  budgetId: number;

  @Column({ type: 'int', name: 'product_variant_id' })
  productVariantId: number;

  @Column({ type: 'int', name: 'quantity' })
  quantity: number;

  @Column({ type: 'decimal', name: 'unit_price' })
  unitPrice: number;

  @Column({ type: 'decimal', name: 'discount' })
  discount: number;

  @Column({ type: 'decimal', name: 'tax' })
  tax: number;

  @Column({ type: 'decimal', name: 'total_line' })
  totalLine: number;

  @ManyToOne(() => ProductVariant, (variant) => variant.budgetItems)
  @JoinColumn({ name: 'product_variant_id', referencedColumnName: 'id' })
  productVariant: ProductVariant;
}
