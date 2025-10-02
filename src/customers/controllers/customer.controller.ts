import { UseGuards, Put, Body, Controller, HttpCode, HttpStatus, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Customer } from '@customers-module/models/classes/customer.entity';
import { CreateCustomerDto } from '@customers-module/models/dto/create-customer.dto';
import { CustomerService } from '@customers-module/services/customers.service';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('page/:pageNumber')
  async findAll(@Param('pageNumber', ParseIntPipe) page: number, @Query('resultSize') resultSize: number = 15, @Query() filter?: Partial<Customer>): Promise<IPaginated<Customer>> {
    return await this.customerService.search(page, resultSize, filter);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Customer | null> {
    return await this.customerService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCustomerDto): Promise<Customer> {
    return await this.customerService.create(dto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCustomerDto): Promise<Customer> {
    return await this.customerService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.customerService.delete(id);
  }
}
