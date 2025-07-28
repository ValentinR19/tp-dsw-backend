import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '@customers-module/models/entities/customer.entity';
import { CreateCustomerDto } from '@customers-module/models/dto/create-customer.dto';
//import { UpdateCustomerDto } from '@customers-module/dto/update-customer.dto'; No lo tengo hecho

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.findOne(id); // ensure it exists
    await this.customerRepository.update(id, updateCustomerDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Customer not found');
  }
}
