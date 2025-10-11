import { CustomerController } from '@customers-module/controllers/customer.controller';
import { CustomerCategory } from '@customers-module/models/classes/customer-category.entity';
import { CustomerShipping } from '@customers-module/models/classes/customer-shipping.entity';
import { CustomerStatus } from '@customers-module/models/classes/customer-status.entity';
import { Customer } from '@customers-module/models/classes/customer.entity';
import { CustomerRepository } from '@customers-module/repositories/customer.repository';
import { CustomerService } from '@customers-module/services/customers.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerCategoryController } from './controllers/customer-category.controller';
import { CustomerCategoryService } from './services/customer-category.service';
import { CustomerCategoryRepository } from './repositories/customer-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerCategory, CustomerStatus, CustomerShipping])],
  controllers: [CustomerController, CustomerCategoryController],
  providers: [CustomerService, CustomerRepository, CustomerCategoryService, CustomerCategoryRepository],
})
export class CustomerModule {}
