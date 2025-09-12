import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe, DefaultValuePipe, ParseBoolPipe } from '@nestjs/common';
import { CustomerCategoryService } from '../services/customer-category.service';
import { CreateCustomerCategoryDto } from '../models/dto/create-customer-category.dto';
import { UpdateCustomerCategoryDto } from '../models/dto/update-customer-category.dto';
@Controller('customer-categories')
export class CustomerCategoryController {
  constructor(private readonly service: CustomerCategoryService) { }

  @Post()
  create(@Body() dto: CreateCustomerCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('active', new DefaultValuePipe(undefined), ParseBoolPipe) active?: boolean,
    @Query('includeDeleted', new DefaultValuePipe(false), ParseBoolPipe) includeDeleted?: boolean,
    @Query('orderBy', new DefaultValuePipe('createdAt')) orderBy?: 'id' | 'name' | 'createdAt' | 'updatedAt',
    @Query('order', new DefaultValuePipe('DESC')) order?: 'ASC' | 'DESC',
  ) {
    return this.service.findAll({ page, limit, search, active, includeDeleted, orderBy, order });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCustomerCategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}
