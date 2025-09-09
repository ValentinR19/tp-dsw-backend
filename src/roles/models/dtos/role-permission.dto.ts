import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class RolePermissionDTO {
  @IsPositive()
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => Number(value))
  id: number;
}
