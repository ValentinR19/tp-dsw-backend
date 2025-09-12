import { IsInt, IsOptional, IsString, IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateCustomerShippingDto {
  @IsInt()
  customerId: number;

  @IsString()
  @MaxLength(255)
  recipientFirstName: string;

  @IsString()
  @MaxLength(255)
  recipientLastName: string;

  // En tu entidad es "recipient_company_name"
  @IsString()
  @MaxLength(255)
  recipientEmail: string;

  @IsString()
  @MaxLength(50)
  phoneNumber: string;

  @IsString()
  @MaxLength(10)
  phoneAreaCode: string;

  @IsString()
  @MaxLength(255)
  alias: string;

  @IsString()
  @MaxLength(255)
  adress: string;

  @IsInt()
  number: number;

  @IsOptional()
  @IsInt()
  complement?: number;

  @IsInt()
  postalCode: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  deliveryInstructions?: string;
}
