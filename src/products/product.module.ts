import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryController } from '@product-module/controllers/product-category.controller';
import { ProductController } from '@product-module/controllers/product.controller';
import { ProductCategory } from '@product-module/models/classes/product-category.entity';
import { ProductPriceHistory } from '@product-module/models/classes/product-price-history.entity';
import { ProductPrice } from '@product-module/models/classes/product-price.entity';
import { Product } from '@product-module/models/classes/product.entity';
import { ProductCategoryRepository } from '@product-module/repositories/product-category.repository';
import { ProductPriceHistoryRepository } from '@product-module/repositories/product-price-history.repository';
import { ProductPriceRepository } from '@product-module/repositories/product-price.repository';
import { ProductRepository } from '@product-module/repositories/product.repository';
import { ProductCategoryService } from '@product-module/services/product-category.service';
import { ProductPriceService } from '@product-module/services/product-price.service';
import { ProductService } from '@product-module/services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductPrice, ProductPriceHistory, ProductCategory])],
  controllers: [ProductController, ProductCategoryController],
  providers: [ProductPriceRepository, ProductPriceHistoryRepository, ProductRepository, ProductService, ProductPriceService, ProductCategoryRepository, ProductCategoryService],
})
export class ProductModule {}
