import { Customer } from '@customers-module/models/classes/customer.entity';
import { CreateCustomerDto } from '@customers-module/models/dto/create-customer.dto';
import { CustomerRepository } from '@customers-module/repositories/customer.repository';
import { Injectable, Logger } from '@nestjs/common';
import { NotFoundErrorException } from '@shared-module/exceptions/not-found.exception';
import { NotSavedErrorException } from '@shared-module/exceptions/not-saved.exception';
import { DeepPartial } from 'typeorm';
import { IPaginated } from '@shared-module/models/interfaces/paginated.interface';

@Injectable()
export class CustomerService {
  private logger: Logger = new Logger(CustomerService.name);

  constructor(private readonly customerRepository: CustomerRepository) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async search(pageNumber: number, resultSize: number, filters?: Partial<Customer>): Promise<IPaginated<Customer>> {
    return await this.customerRepository.search(pageNumber, resultSize, filters);
  }

  async findById(id: number): Promise<Customer> {
    try {
      this.logger.log(`Busncando Cliente por id: ${id}`);
      const customer = await this.customerRepository.findById(id);
      this.logger.log(`Cliente Encontrado: ${JSON.stringify(customer)}`);
      return customer;
    } catch (error) {
      throw new NotFoundErrorException(Customer.name, error);
    }
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    this.logger.log(`Creando Cliente: ${JSON.stringify(createCustomerDto)}`);
    return this.save(createCustomerDto);
  }

  async update(id: number, updateCustomerDto: DeepPartial<CreateCustomerDto>): Promise<Customer> {
    this.logger.log(`Actualizando Cliente: ${JSON.stringify(updateCustomerDto)}`);
    await this.findById(id);
    return this.save({ ...updateCustomerDto, id });
  }

  async delete(id: number): Promise<void> {
    try {
      this.logger.log(`Removiendo Cliente: ${id}`);
      await this.customerRepository.delete(id);
    } catch (error) {
      throw new NotSavedErrorException(Customer.name, error);
    }
  }

  private async save(customer: DeepPartial<Customer>): Promise<Customer> {
    try {
      this.logger.log(`Guardando Cliente: ${JSON.stringify(customer)}`);
      const savedCustomer = await this.customerRepository.save(customer);
      this.logger.log(`Cliente Guardado: ${JSON.stringify(savedCustomer)}`);
      return savedCustomer;
    } catch (error) {
      throw new NotSavedErrorException(Customer.name, error);
    }
  }
}
