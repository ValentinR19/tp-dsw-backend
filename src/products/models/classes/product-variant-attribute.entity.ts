import { ProductAttribute } from '@product-module/models/classes/product-attribute.entity';
import { ProductVariant } from '@product-module/models/classes/product-variant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_variant_attribute' })
export class ProductVariantAttribute {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => ProductVariant, (variant) => variant.attributes)
  variant: ProductVariant;

  @Column({ type: 'int', name: 'product_variant_id' })
  productVariantId: number;

  @ManyToOne(() => ProductAttribute, (attr) => attr.variantAttributes)
  attribute: ProductAttribute;

  @Column({ type: 'int', name: 'product_attribute_id' })
  productAttributeId: number;

  @Column({ type: 'varchar', name: 'value' })
  value: string;
}
