import { CustomerCategoryService } from './../services/customer-category.service';
import { CustomerCategory } from './../models/classes/customer-category.entity';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';

@Controller('customer/categories')
export class CustomerCategoryController {
  constructor(private readonly customerCategoryService: CustomerCategoryService) {}

  @Get('all')
  async findAll(): Promise<CustomerCategory[]> {
    return await this.customerCategoryService.findAll();
  }
}
