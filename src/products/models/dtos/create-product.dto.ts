import { IsNumber, IsString, IsOptional, Length, Min, IsInt} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 120, { message: 'name debe tener entre 1 y 120 caracteres' })
  name!: string;

  @IsOptional()
  @IsString()
  @Length(0, 1000, { message: 'description no debe exceder 1000 caracteres' })
  description?: string;

  
  @IsInt({ message: 'productCategoryId debe ser un entero' })
  @Min(1, { message: 'productCategoryId debe ser >= 1' })
  productCategoryId!: number;

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 },
    { message: 'price debe ser un número con hasta 2 decimales' })
  
  @Min(0, { message: 'price no puede ser negativo' })
  price?: number;
}
