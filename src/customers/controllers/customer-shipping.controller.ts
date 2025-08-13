import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe, DefaultValuePipe, ParseBoolPipe } from '@nestjs/common';
import { CustomerShippingService } from '../services/customer-shipping.service';

@Controller('customer-shipping')
export class CustomerShippingController {
  constructor(private readonly service: CustomerShippingService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('customerId') customerIdRaw?: string,
    @Query('includeDeleted', new DefaultValuePipe(false), ParseBoolPipe) includeDeleted?: boolean,
    @Query('orderBy', new DefaultValuePipe('createdAt')) orderBy?: 'id' | 'customerId' | 'alias' | 'recipientFirstName' | 'recipientLastName' | 'createdAt' | 'updatedAt',
    @Query('order', new DefaultValuePipe('DESC')) order?: 'ASC' | 'DESC',
  ) {
    const customerId = customerIdRaw !== undefined ? parseInt(customerIdRaw, 10) : undefined;
    return this.service.findAll({ page, limit, search, customerId, includeDeleted, orderBy, order });
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
