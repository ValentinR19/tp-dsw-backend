import { BudgetShipping } from '@budgets-module/models/classes/budget-shipping.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBudgetShippingDto extends BudgetShipping {
  @IsOptional()
  @IsNumber({}, { message: 'El ID de la ciudad debe ser un número.' })
  cityId: number;

  @IsOptional()
  @IsNumber({}, { message: 'El ID del estado debe ser un número.' })
  stateId: number;

  @IsOptional()
  @IsNumber({}, { message: 'El ID del país debe ser un número.' })
  countryId: number;

  @IsString({ message: 'La dirección debe ser un texto.' })
  @IsOptional()
  address: string;
}
