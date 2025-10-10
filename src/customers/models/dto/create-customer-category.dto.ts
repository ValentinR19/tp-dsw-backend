import { CustomerCategory } from '@customers-module/models/classes/customer-category.entity';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCustomerCategoryDto extends CustomerCategory {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @Length(1, 20, { message: 'El nombre debe tener entre 1 y 20 caracteres.' })
  name!: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser booleano.' })
  active: boolean;
}
