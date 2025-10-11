import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { CreateCustomerCategoryDto } from '../models/dto/create-customer-category.dto';
import { UpdateCustomerCategoryDto } from '../models/dto/update-customer-category.dto';
import { CustomerCategory } from './../models/classes/customer-category.entity';
import { CustomerCategoryService } from './../services/customer-category.service';

@Controller('customer/categories')
export class CustomerCategoryController {
  constructor(private readonly customerCategoryService: CustomerCategoryService) {}

  @Get('all')
  async findAll(): Promise<CustomerCategory[]> {
    return await this.customerCategoryService.findAll();
  }

  @Get('page/:pageNumber')
  async search(page: number, dto: PaginatedQueryDTO<CustomerCategory>): Promise<IPaginated<CustomerCategory>> {
    return await this.customerCategoryService.search(page, dto);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.customerCategoryService.findOne(id);
  }

  @Post()
  async create(dto: CreateCustomerCategoryDto): Promise<CustomerCategory> {
    return await this.customerCategoryService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, dto: UpdateCustomerCategoryDto): Promise<CustomerCategory> {
    return await this.customerCategoryService.update(id, dto);
  }

  @Patch('restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await this.customerCategoryService.restore(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.customerCategoryService.remove(id);
  }
}
