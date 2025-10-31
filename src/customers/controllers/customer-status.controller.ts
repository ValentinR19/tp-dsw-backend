import { CustomerStatus } from '@customers-module/models/classes/customer-status.entity';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared-module/guards/jwt.guard';
import { CustomerStatusService } from '../services/customer-status.service';

@Controller('customer-status')
@UseGuards(JwtAuthGuard)
export class CustomerStatusController {
  constructor(private readonly service: CustomerStatusService) {}

  @Get()
  async findAll(): Promise<CustomerStatus[]> {
    return this.service.findAll();
  }
}
