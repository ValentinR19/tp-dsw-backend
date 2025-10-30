import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class BudgetItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  unitPrice: number;

  @IsNumber()
  @Min(0)
  discount: number;

  @IsNumber()
  @Min(0)
  tax: number;

  @IsNumber()
  @Min(0)
  totalLine: number;
}
