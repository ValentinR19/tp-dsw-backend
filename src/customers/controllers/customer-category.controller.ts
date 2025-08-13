import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe, DefaultValuePipe, ParseBoolPipe } from '@nestjs/common';
import { CustomerCategoryService } from '../services/customer-category.service';
@Controller('customer-categories')
export class CustomerCategoryController {
  constructor(private readonly service: CustomerCategoryService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
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
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.service.update(id, body);
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
