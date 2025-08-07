import { HttpStatus, Logger } from '@nestjs/common';
import { BaseException } from './base.exception';

export class NotFoundErrorException extends BaseException {
  constructor(entidad: string, stacktrace?: string) {
    Logger.error(`La entidad ${entidad} no ha podido ser encontrada en la base de datos.`, stacktrace, `${entidad}Module`);
    super(`La entidad ${entidad} no ha podido ser encontrada.`, HttpStatus.NOT_FOUND);
  }
}
