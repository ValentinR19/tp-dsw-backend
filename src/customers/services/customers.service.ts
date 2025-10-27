import { Customer } from '@customers-module/models/classes/customer.entity';
import { CreateCustomerDto } from '@customers-module/models/dto/create-customer.dto';
import { CustomerRepository } from '@customers-module/repositories/customer.repository';
import { Injectable, Logger } from '@nestjs/common';
import { NotFoundErrorException } from '@shared-module/exceptions/not-found.exception';
import { NotSavedErrorException } from '@shared-module/exceptions/not-saved.exception';
import { PaginatedQueryDTO } from '@shared-module/models/dtos/paginated-query.dto';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';
import { DeepPartial } from 'typeorm';

@Injectable()
export class CustomerService {
  private logger: Logger = new Logger(CustomerService.name);

  constructor(private readonly customerRepository: CustomerRepository) {}

  async search(page: number, dto: PaginatedQueryDTO<Customer>): Promise<IPaginated<Customer>> {
    const { results, filters, global } = dto;
    return await this.customerRepository.search(page, results, filters, global);
  }

  async findById(id: number): Promise<Customer> {
    try {
      this.logger.log(`Finding customer by id: ${id}`);
      const customer = await this.customerRepository.findById(id);
      this.logger.log(`Customer found: ${JSON.stringify(customer)}`);
      return customer;
    } catch (error) {
      throw new NotFoundErrorException(Customer.name, error);
    }
  }

  async findAll(): Promise<Customer[]> {
    this.logger.log(`Finding all customers`);
    const customers = await this.customerRepository.findAll();
    this.logger.log(`Customers found: ${JSON.stringify(customers)}`);
    return customers;
  }

  async create(dto: CreateCustomerDto): Promise<Customer> {
    this.logger.log(`Creating customer: ${JSON.stringify(dto)}`);
    if (!dto.statusId) {
      dto.statusId = 1;
    }
    return this.save(dto);
  }

  async update(id: number, updateCustomerDto: DeepPartial<CreateCustomerDto>): Promise<Customer> {
    this.logger.log(`Updating customer: ${JSON.stringify(updateCustomerDto)}`);
    await this.findById(id);
    return this.save({ ...updateCustomerDto, id });
  }

  async softDelete(id: number): Promise<void> {
    try {
      this.logger.log(`Removing customer: ${id}`);
      await this.customerRepository.softDelete(id);
    } catch (error) {
      throw new NotSavedErrorException(Customer.name, error);
    }
  }

  private async save(customer: DeepPartial<Customer>): Promise<Customer> {
    try {
      this.logger.log(`Saving customer: ${JSON.stringify(customer)}`);
      const savedCustomer = await this.customerRepository.save(customer);
      this.logger.log(`Customer saved: ${JSON.stringify(savedCustomer)}`);
      return savedCustomer;
    } catch (error) {
      throw new NotSavedErrorException(Customer.name, error);
    }
  }
}
