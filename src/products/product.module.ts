import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from '@product-module/models/classes/product-attribute.entity';
import { ProductVariantAttribute } from '@product-module/models/classes/product-variant-attribute.entity';
import { ProductVariant } from '@product-module/models/classes/product-variant.entity';
import { Product } from '@product-module/models/classes/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductVariant, ProductVariantAttribute, ProductAttribute])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ProductModule {}
