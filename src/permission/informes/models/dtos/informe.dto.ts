import { Informe } from '@main-module/permission/informes/models/classes/informe.entity';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class InformeDTO extends Informe {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => Number(value))
  id: number;
}
