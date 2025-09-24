import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ProductCategoryService } from '@product-module/services/product-category.service';
import { ProductCategory } from '@product-module/models/classes/product-category.entity';
@Controller('products/categories')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService ) {}

  @Get('all')
  async findAll(): Promise<ProductCategory[]> {
    return await this.productCategoryService.findAll();
  }

}