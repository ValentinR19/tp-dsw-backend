import { BudgetBilling } from '@budgets-module/models/classes/budget-billing.entity';
import { IsOptional, IsString, Max } from 'class-validator';

export class CreateBudgetBillingDto extends BudgetBilling {
  @IsString()
  @IsOptional()
  buyerCompany: string;

  @IsString()
  @IsOptional()
  buyerAddress: string;

  @IsString()
  @IsOptional()
  consigneeAddress: string;

  @IsString()
  @IsOptional()
  consigneeCompany: string;

  @IsString()
  @Max(30)
  @IsOptional()
  shippingCountry: string;

  @IsString()
  @IsOptional()
  buyerTaxId: number;

  @IsString()
  @IsOptional()
  portDestination: string;

  @IsString()
  @IsOptional()
  paymentDescription: string;
}
