import { CreateCustomerCategoryDto } from '@customers-module/models/dto/create-customer-category.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCustomerCategoryDto extends PartialType(CreateCustomerCategoryDto) {}
