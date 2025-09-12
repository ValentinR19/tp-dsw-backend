import { IsString, IsEmail, MinLength, MaxLength, IsOptional, Length, IsBoolean } from 'class-validator';

export class UpdateCustomerCategoryDto {
@IsOptional()
@IsString({ message: 'El nombre debe ser un texto.' })
@Length(1, 20, { message: 'El nombre debe tener entre 1 y 20 caracteres.' })
name ?: string;

@IsOptional()
@IsBoolean({ message: 'El campo activo debe ser booleano.' })
active ?: boolean;
}