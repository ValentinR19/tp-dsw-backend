import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class PaginatedQueryDTO<T> {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  results: number = 10;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => !o.filters)
  global?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => !o.global)
  filters?: Partial<T>;
}
