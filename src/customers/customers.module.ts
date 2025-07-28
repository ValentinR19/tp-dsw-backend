import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@customers-module/models/entities/customer.entity';
import { CustomerService } from '@customers-module/services/customers.service';
import { CustomerController } from '@customers-module/controllers/customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule { }
