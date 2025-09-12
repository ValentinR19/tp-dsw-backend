import { IsOptional, IsBoolean, IsInt, Min, Max, IsIn, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerCategoryQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  includeDeleted?: boolean;

  @IsOptional()
  @IsIn(['id', 'name', 'createdAt', 'updatedAt'])
  orderBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: string;
}