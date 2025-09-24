import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Product } from '@product-module/models/classes/product.entity';
import { CreateProductDto } from '@product-module/models/dtos/create-product.dto';
import { UpdateProductDto } from '@product-module/models/dtos/update-product.dto';
import { ProductService } from '@product-module/services/product.service';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('page/:pageNumber')
  async findAll(@Param('pageNumber', ParseIntPipe) page: number, @Query('resultSize') resultSize: number = 15, @Query() filter?: Partial<Product>): Promise<IPaginated<Product>> {
    return await this.productService.search(page, resultSize, filter);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Product | null> {
    return await this.productService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return await this.productService.create(dto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto): Promise<Product> {
    return await this.productService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.productService.delete(id);
  }
}
