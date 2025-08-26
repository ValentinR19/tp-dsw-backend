export class CreateCustomerDto {
  firstName: string;
  lastName: string;
  companyName?: string;
  gender?: string;
  address: string;
  zipCode: string;
  typeOfDocument: string;
  document: string;
  internalCode: string;
  birthdate?: Date;
}

import { 
  IsString, 
  IsOptional, 
  IsNotEmpty, 
  IsDateString, 
  Length, 
  IsIn, 
  Matches 
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastName: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  companyName?: string;

  @IsOptional()
  @IsIn(['male', 'female', 'other'])
  gender?: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  address: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{4,10}$/, { message: 'zipCode must be between 4 and 10 digits' })
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['DNI', 'Passport', 'CUIT'])
  typeOfDocument: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9-]{5,20}$/, { message: 'document must be 5-20 alphanumeric characters' })
  document: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  internalCode: string;

  @IsOptional()
  @IsDateString()
  birthdate?: Date;
}
