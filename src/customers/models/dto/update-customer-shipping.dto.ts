import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerShippingDto } from './create-customer-shipping.dto';

export class UpdateCustomerShippingDto extends PartialType(CreateCustomerShippingDto) {}
