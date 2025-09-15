import { IsCurrency, IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  productCategoryId: number;

  @IsDecimal()
  price?: number;

  @IsCurrency()
  currency?: string;
}