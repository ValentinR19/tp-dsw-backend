import { Customer } from '@customers-module/models/classes/customer.entity';
import { CreateCustomerShippingDto } from '@customers-module/models/dto/customer-shipping.dto';
import { IsDateString, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';
export class CreateCustomerDto extends Customer {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  companyName: string;

  @IsOptional()
  @IsIn(['Hombre', 'Mujer', 'Otro'])
  gender: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['DNI', 'CUIT'])
  typeOfDocument: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9-]{5,20}$/, { message: 'El dni debe tneer entre 5 y 20 caracteres' })
  document: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  internalCode: string;

  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @IsOptional()
  customerShipping: CreateCustomerShippingDto;
}
