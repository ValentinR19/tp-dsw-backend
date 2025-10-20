import { CustomerCategory } from '@customers-module/models/classes/customer-category.entity';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CustomerCategoryService } from '../services/customer-category.service';
@Controller('categories')
export class CustomerCategoryController {
  constructor(private readonly service: CustomerCategoryService) {}

  @Get('all')
  findAll(): Promise<CustomerCategory[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
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
