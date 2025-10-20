import { CustomerCategoryController } from '@customers-module/controllers/customer-category.controller';
import { CustomerController } from '@customers-module/controllers/customer.controller';
import { CustomerCategory } from '@customers-module/models/classes/customer-category.entity';
import { CustomerShipping } from '@customers-module/models/classes/customer-shipping.entity';
import { CustomerStatus } from '@customers-module/models/classes/customer-status.entity';
import { Customer } from '@customers-module/models/classes/customer.entity';
import { CustomerCategoryRepository } from '@customers-module/repositories/customer-category.repository';
import { CustomerShippingRepository } from '@customers-module/repositories/customer-shipping.repository';
import { CustomerStatusRepository } from '@customers-module/repositories/customer-status.repository';
import { CustomerRepository } from '@customers-module/repositories/customer.repository';
import { CustomerCategoryService } from '@customers-module/services/customer-category.service';
import { CustomerShippingService } from '@customers-module/services/customer-shipping.service';
import { CustomerStatusService } from '@customers-module/services/customer-status.service';
import { CustomerService } from '@customers-module/services/customers.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerCategory, CustomerStatus, CustomerShipping])],
  controllers: [CustomerController, CustomerCategoryController],
  providers: [
    CustomerService,
    CustomerRepository,
    CustomerCategoryService,
    CustomerCategoryRepository,
    CustomerStatusService,
    CustomerStatusRepository,
    CustomerShippingService,
    CustomerShippingRepository,
  ],
})
export class CustomerModule {}
