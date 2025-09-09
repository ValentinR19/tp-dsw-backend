import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class PageParamDTO {
  @IsPositive({ message: 'El numero de pagina debe ser positivo' })
  @IsNumber({}, { message: 'El numero de pagina debe ser un numero' })
  @IsNotEmpty({ message: 'El numero de paginas no puede estar vacío' })
  @Transform(({ value }) => Number(value))
  pageNumber: number;
}
