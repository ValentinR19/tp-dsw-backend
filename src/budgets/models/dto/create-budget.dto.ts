import { BudgetItemDto } from '@budgets-module/models/dto/budget-item.dto';
import { CreateBudgetBillingDto } from '@budgets-module/models/dto/create-budget-billing.dto';
import { CreateBudgetShippingDto } from '@budgets-module/models/dto/create-budget-shipping.dto';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @IsOptional()
  code: string;

  @IsString()
  @IsOptional()
  saleNumber: string;

  @IsNumber()
  @Min(0)
  subtotal: number;

  @IsNumber()
  @Min(0)
  totalDiscount: number;

  @IsNumber()
  @Min(0)
  totalTax: number;

  @IsNumber()
  @Min(0)
  total: number;

  @IsNumber()
  customerId: number;

  @IsNumber()
  @IsOptional()
  sellerId: number;

  @IsNumber()
  currencyId: number;

  @IsNumber()
  @IsOptional()
  statusId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BudgetItemDto)
  items?: BudgetItemDto[];

  @IsOptional()
  @ValidateNested({ message: 'Los datos de envío deben ser válidos.', each: true })
  @Type(() => CreateBudgetShippingDto)
  budgetShipping?: CreateBudgetShippingDto;

  @IsOptional()
  @ValidateNested({ message: 'Los datos de facturación deben ser válidos.', each: true })
  @Type(() => CreateBudgetBillingDto)
  budgetBilling?: CreateBudgetBillingDto;
}
