import { BudgetItem } from '@budgets-module/models/classes/budget-item.entity';
import { Product } from '@product-module/models/classes/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariantAttribute } from './product-variant-attribute.entity';

@Entity({ name: 'product_variant' })
export class ProductVariant {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'sku' })
  sku: string;

  @Column({ type: 'int', name: 'product_id' })
  productId: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @OneToMany(() => BudgetItem, (item) => item.productVariant)
  budgetItems: BudgetItem[];

  @OneToMany(() => ProductVariantAttribute, (attr) => attr.variant)
  attributes: ProductVariantAttribute[];
}
