import { CustomerShipping } from '@customers-module/models/classes/customer-shipping.entity';
import { IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateCustomerShippingDto extends CustomerShipping {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  recipientFirstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  recipientLastName: string;

  @IsString()
  @IsOptional()
  @Length(2, 100)
  recipientEmail: string;

  @IsString()
  @IsOptional()
  @Length(2, 10)
  phoneAreaCode: string;

  @IsString()
  @IsOptional()
  @Matches(/^[0-9+\- ]+$/, { message: 'El número de teléfono contiene caracteres inválidos' })
  @Length(6, 20)
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @Length(2, 100)
  alias: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  adress: string;

  @IsString()
  @IsOptional()
  @Length(1, 10)
  number: string;

  @IsString()
  @IsOptional()
  @Length(1, 20)
  complement: string;

  @IsString()
  @IsOptional()
  @Length(3, 10)
  postalCode: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  deliveryInstructions: string;
}
