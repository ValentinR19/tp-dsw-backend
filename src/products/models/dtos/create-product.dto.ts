import { IsNumber, IsString, IsOptional, Length, Min, IsInt} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 120, { message: 'El nombre debe tener entre 1 y 120 caracteres' })
  name!: string;

  @IsOptional()
  @IsString()
  @Length(0, 1000, { message: 'La description no debe exceder 1000 caracteres' })
  description?: string;

  
  @IsInt({ message: 'El id de producto debe ser un entero' })
  @Min(1, { message: 'EL id de producto debe ser >= 1' })
  productCategoryId!: number;

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número con hasta 2 decimales' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  price?: number;
}
