import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from '@product-module/models/dtos/create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
