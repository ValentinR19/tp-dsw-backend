import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { CustomerShipping } from '../classes/customer-shipping.entity';

export class CustomerShippingDto extends CustomerShipping {
  @IsInt()
  customerId: number;

  @IsString()
  @MaxLength(100)
  recipientFirstName: string;

  @IsString()
  @MaxLength(100)
  recipientLastName: string;

  @IsString()
  @MaxLength(150)
  recipientEmail: string;

  @IsString()
  @MaxLength(10)
  phoneAreaCode: string;

  @IsString()
  @MaxLength(20)
  phoneNumber: string;

  @IsString()
  alias: string;

  @IsString()
  adress: string;

  @IsString()
  number: string;

  @IsString()
  complement: string;

  @IsString()
  postalCode: string;

  @IsOptional()
  @IsString()
  deliveryInstructions: string;
}
