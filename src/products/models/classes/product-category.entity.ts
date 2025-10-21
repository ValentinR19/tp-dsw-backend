import { Product } from '@product-module/models/classes/product.entity';
import { AuditEntity } from '@shared-module/models/classes/audit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_categories')
export class ProductCategory extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'name', unique: true })
  name: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @OneToMany(() => Product, (product) => product.productCategory)
  products: Product[];
}
