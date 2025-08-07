import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from '@product-module/controllers/product.controller';
import { ProductPriceHistory } from '@product-module/models/classes/product-price-history.entity';
import { ProductPrice } from '@product-module/models/classes/product-price.entity';
import { Product } from '@product-module/models/classes/product.entity';
import { ProductPriceHistoryRepository } from '@product-module/repositories/product-price-history.repository';
import { ProductPriceRepository } from '@product-module/repositories/product-price.repository';
import { ProductRepository } from '@product-module/repositories/product.repository';
import { ProductPriceService } from '@product-module/services/product-price.service';
import { ProductService } from '@product-module/services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductPrice, ProductPriceHistory])],
  controllers: [ProductController],
  providers: [ProductPriceRepository, ProductPriceHistoryRepository, ProductRepository, ProductService, ProductPriceService],
  exports: [],
})
export class ProductModule {}
