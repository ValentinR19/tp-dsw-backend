import { IsCurrency, IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
  @IsDecimal()
  price?: number;
  @IsCurrency()
  currency?: string;
}
