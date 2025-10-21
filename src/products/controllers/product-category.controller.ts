import { Controller, Get } from '@nestjs/common';
import { ProductCategory } from '@product-module/models/classes/product-category.entity';
import { ProductCategoryService } from '@product-module/services/product-category.service';

@Controller('categories')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Get('all')
  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoryService.findAll();
  }
}
