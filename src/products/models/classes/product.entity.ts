import { BudgetItem } from '@budgets-module/models/classes/budget-item.entity';
import { ProductPrice } from '@product-module/models/classes/product-price.entity';
import { AuditEntity } from '@shared-module/models/classes/audit.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from './product-category.entity';

@Entity({ name: 'product' })
export class Product extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'product_category_id' })
  productCategoryId: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @ManyToOne(() => ProductCategory, (productCategory) => productCategory.products)
  @JoinColumn({ name: 'product_category_id', referencedColumnName: 'id' })
  productCategory: ProductCategory;

  @OneToOne(() => ProductPrice, (price) => price.product)
  price: ProductPrice;

  @OneToMany(() => BudgetItem, (budgetItem) => budgetItem.product)
  budgetItems: BudgetItem[];
}
