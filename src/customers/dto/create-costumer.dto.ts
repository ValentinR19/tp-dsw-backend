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