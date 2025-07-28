import { ProductVariantAttribute } from '@product-module/models/classes/product-variant-attribute.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_attribute' })
export class ProductAttribute {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'type' })
  type: string;

  @OneToMany(() => ProductVariantAttribute, (attr) => attr.attribute)
  variantAttributes: ProductVariantAttribute[];
}
