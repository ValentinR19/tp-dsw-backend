import { Product } from '@product-module/models/classes/product.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_price' })
export class ProductPrice {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'product_id' })
  productId: number;

  @Column({ type: 'decimal', name: 'price', precision: 18, scale: 2 })
  price: number;

  @Column({ type: 'varchar', name: 'currency', length: 3, default: 'ARS' })
  currency: string;

  @OneToOne(() => Product, (product) => product.price, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;
}
