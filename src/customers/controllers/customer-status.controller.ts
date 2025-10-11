import { CustomerStatus } from '@customers-module/models/classes/customer-status.entity';
import { Controller, Get } from '@nestjs/common';
import { CustomerStatusService } from '../services/customer-status.service';

@Controller('customer-status')
export class CustomerStatusController {
  constructor(private readonly service: CustomerStatusService) {}

  @Get()
  async findAll(): Promise<CustomerStatus[]> {
    return this.service.findAll();
  }
}
