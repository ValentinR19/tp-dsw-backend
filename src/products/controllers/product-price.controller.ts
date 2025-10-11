import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ProductPriceService } from '@product-module/services/product-price.service';
import { ProductPrice } from '@product-module/models/classes/product-price.entity';
@Controller('products/prices')
export class ProductPriceController {
  constructor(private readonly productPriceService: ProductPriceService ) {}

  @Get('all')
  async findByProductId(@Query('productId', ParseIntPipe) productId: number): Promise<ProductPrice | null> {
    return await this.productPriceService.findByProductId(productId);
  }

}